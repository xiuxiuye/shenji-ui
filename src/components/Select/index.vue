<template>
  <div
    ref="sjSelectRef"
    :class="classes"
    :tabindex="0"
    :autofocus="autofocus"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <div :class="`${classNamePrefix}-disabled-mask`" v-if="disabled"></div>
    <div :class="`${classNamePrefix}-content`" @click="handleClick">
      <div v-if="placeholderVisible" :class="`${classNamePrefix}-placeholder`">
        {{ placeholder }}
      </div>
      <template v-else>
        <div
          ref="sjSelectLabelRef"
          v-for="item in selectedOptions?.slice(0, realMaxCount)"
          :class="selectedTagClasses"
          :key="item?.value"
          :data-value="item?.value"
          :data-value-type="typeof item?.value"
        >
          <span v-if="!isCustomRenderLabel">
            {{ item?.label }}
            <span
              v-if="multiple"
              :class="`${classNamePrefix}-content-tag-close`"
              @click.stop="removeSelectedOption(item.value)"
            >
              <Icon type="close" />
            </span>
          </span>
        </div>
        <div
          v-if="selectedOptions?.length > realMaxCount"
          :class="selectedTagClasses"
        >
          <span><Icon type="plus" /></span>
          <span>{{ selectedOptions?.length - realMaxCount }}</span>
        </div>
      </template>
      <input
        v-if="filterable"
        :class="filterClasses"
        v-model="filterText"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>
    <span
      v-if="isClearBtnVisible"
      :class="`${classNamePrefix}-clear`"
      @click="handleClear"
    >
      <Icon :type="clearIcon" />
    </span>
    <span
      v-if="loadingIconVisible && loading"
      :class="`${classNamePrefix}-loading-icon`"
    >
      <Icon :type="loadingIcon" />
    </span>
    <div :class="arrowClasses" @click="handleClick">
      <slot name="arrow">
        <Icon :type="arrow" />
      </slot>
    </div>
    <!-- Popup -->
    <Popup
      :visible="popupVisible"
      :reference-ref="sjSelectRef"
      :placement="placement"
      flipable
    >
      <div :class="`${classNamePrefix}-popup`" :style="popupStyles">
        <div v-if="loading" :class="`${classNamePrefix}-loading`">
          <slot name="loading">{{ loadingText }}</slot>
        </div>
        <template v-else-if="filterOptions?.length">
          <SelectOption
            v-for="option in filterOptions"
            :key="option[valueField]"
            :value="option[valueField]"
            :label="option[labelField]"
            :disabled="option?.disabled"
            :custom="
              optionRender &&
              optionRender(option, selectedValues?.includes(option[valueField]))
            "
          />
        </template>
        <div v-else :class="`${classNamePrefix}-empty`">
          <slot name="empty">{{ emptyText }}</slot>
        </div>
      </div>
    </Popup>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch, nextTick, render, onMounted, onUnmounted } from 'vue'
import Icon from '../Icon'
import Popup from '../Popup'
import SelectOption from '../Option'
import {
  useClasses,
  useArrowClasses,
  useSelectedTagClasses,
  useFilterClasses
} from './hooks/useClasses'
import usePopupStyles from './hooks/usePopupStyles'
import isArray from 'src/utils/isArray'
import isString from 'src/utils/isString'
import isNumber from 'src/utils/isNumber'
import isFunction from 'src/utils/isFunction'
import isVaildNumber from 'src/utils/isVaildNumber'
import consoleError from 'src/utils/console/error'
import useProvide from 'src/utils/hooks/useProvide'
import type {
  Provider,
  SelectedOption,
  SingleModelValue,
  Options,
  OptionRender,
  LabelRender,
  SelectRefExpose
} from './types'
import type {
  CommonSize,
  CommonFormStatus,
  CommonFormBorderType
} from 'src/types/global'
import isBoolean from 'src/utils/isBoolean'

export const componentName = 'sj-select'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
type Props = {
  size?: CommonSize;
  disabled?: boolean;
  autofocus?: boolean;
  modelValue?: string | number | Array<string | number>;
  clearable?: boolean;
  clearIcon?: string;
  round?: boolean;
  loading?: boolean;
  loadingIcon?: string;
  loadingIconVisible?: boolean;
  loadingText?: string;
  filterable?: boolean;
  filter?: (filterText: string, option: Record<string, any>) => boolean;
  asyncFilter?: (filterText: string) => void;
  labelField?: string;
  valueField?: string;
  maxCount?: number | string;
  multiple?: boolean;
  options?: Options;
  placeholder?: string;
  placement?:
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'right-start'
    | 'right'
    | 'right-end'
    | 'bottom-start'
    | 'bottom'
    | 'bottom-end'
    | 'left-start'
    | 'left'
    | 'left-end';
  status?: CommonFormStatus;
  container?: string | HTMLElement;
  virtual?: boolean;
  arrow?: string;
  borderType?: CommonFormBorderType;
  popupMaxHeight?: number;
  search?: boolean;
  visible?: boolean;
  popupWithSelectWidth?: boolean | number | string;
  emptyText?: string;
  optionRender?: OptionRender;
  labelRender?: LabelRender;
};

const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
  disabled: false,
  autofocus: false,
  clearable: false,
  clearIcon: 'close-circle-fill',
  round: false,
  loading: false,
  loadingIcon: 'loading-a',
  loadingIconVisible: true,
  loadingText: '加载中',
  filterable: false,
  labelField: 'label',
  valueField: 'value',
  multiple: false,
  options: () => [],
  container: 'body',
  virtual: false,
  arrow: 'down',
  borderType: 'block',
  popupMaxHeight: 256,
  search: false,
  visible: undefined,
  popupWithSelectWidth: true,
  placement: 'bottom-start',
  emptyText: '暂无数据'
})

/**
 * handle popup mounted
 */
const popupVisible = ref<boolean>(false)
const sjSelectRef = ref<HTMLElement | null>()
/**
 * popup的显示是受控的
 */
watch(
  () => props?.visible,
  (newValue) => {
    if (isBoolean(newValue)) {
      popupVisible.value = newValue as boolean
    }
  },
  { immediate: true }
)
watch(popupVisible, (newValue: boolean) => {
  emit('visible-change', newValue)
})

/**
 * select width
 */
const selectWidth = ref<number>(0)
const resizeObserver = ref<ResizeObserver>()
onMounted(() => {
  const selectRef = sjSelectRef.value
  if (selectRef) {
    /**
     * 监听select的宽度变化
     */
    resizeObserver.value = new ResizeObserver(function (entries) {
      selectWidth.value = (selectRef as HTMLElement)?.offsetWidth
    })
    resizeObserver.value.observe(selectRef)
  }
})
onUnmounted(() => {
  if (resizeObserver.value) {
    resizeObserver.value.disconnect()
  }
})

/**
 * styles
 */
const popupStyles = usePopupStyles(props, selectWidth)

/**
 * emit
 */
type Emit = {
  (e: 'clear'): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'visible-change', value: boolean): void;
  (e: 'change', value?: SingleModelValue | SingleModelValue[]): void;
  (e: 'update:modelValue', value?: SingleModelValue | SingleModelValue[]): void;
};
const emit = defineEmits<Emit>()

/**
 * filter
 */
const filterText = ref<string>('')
const filterOptions = computed<Options>(() => {
  if (props?.asyncFilter && isFunction(props?.asyncFilter)) {
    return props?.options
  }
  if (!filterText.value) return props?.options
  const regExp = new RegExp(filterText.value)
  return props?.options?.filter((el) => {
    if (props?.filter && isFunction(props?.filter)) {
      return props?.filter(filterText.value, el)
    }
    return regExp?.test(el[props?.labelField])
  })
})
watch(filterText, async () => {
  if (props?.asyncFilter && isFunction(props?.asyncFilter)) {
    props?.asyncFilter(filterText.value)
  }
})

/**
 * max-count
 */
const realMaxCount = computed<number>(() => {
  if (!props?.multiple || !isVaildNumber(props?.maxCount)) return Infinity
  return +(props?.maxCount as SingleModelValue)
})

/**
 * model-value
 */
const selectedValues = ref<SingleModelValue[]>([])
const removeSelectedOption = (value: SingleModelValue) => {
  const index = selectedValues.value?.findIndex(
    (selectedValue) => selectedValue === value
  )
  selectedValues.value?.splice(index, 1)
}
const isSelectedValuesChanged = (
  newValues: SingleModelValue[],
  preValues: SingleModelValue[]
): boolean => {
  if (newValues?.length !== preValues?.length) return true
  for (let i = 0; i < newValues?.length; i++) {
    if (newValues[i] !== preValues[i]) return true
  }
  return false
}
watch(
  () => props?.modelValue,
  () => {
    if (props?.multiple) {
      if (isArray(props?.modelValue)) {
        if (
          isSelectedValuesChanged(
            props?.modelValue as SingleModelValue[],
            selectedValues.value
          )
        ) {
          selectedValues.value = props?.modelValue as SingleModelValue[]
        }
      } else {
        consoleError('神机：Select在多选模式下model-value的类型应为数组')
      }
    } else {
      if (
        isString(props?.modelValue) ||
        isNumber(props?.modelValue) ||
        props?.modelValue === undefined
      ) {
        if (selectedValues.value[0] !== props?.modelValue) {
          selectedValues.value = [props?.modelValue as SingleModelValue]
        }
      } else {
        consoleError(
          '神机：Select在单选模式下model-value的类型应为string | number'
        )
      }
    }
  },
  { immediate: true }
)
const filterSelectedOptions = (
  values: SingleModelValue[]
): SelectedOption[] => {
  const options = props?.options
  const tempOptions: SelectedOption[] = []
  values?.forEach((value) => {
    const selectedItem = options?.find(
      (option) => option[props?.valueField] === value
    )
    if (selectedItem) {
      tempOptions.push({
        label: selectedItem[props?.labelField],
        value: selectedItem[props?.valueField],
        meta: {
          originOption: selectedItem
        }
      })
    }
  })
  return tempOptions
}
const selectedOptions = computed<SelectedOption[]>(() => {
  return filterSelectedOptions(selectedValues.value)
})
watch(selectedValues, () => {
  emit(
    'change',
    props?.multiple ? [...selectedValues.value] : selectedValues.value[0]
  )
  emit(
    'update:modelValue',
    props?.multiple ? [...selectedValues.value] : selectedValues.value[0]
  )
})

/**
 * custom render label
 */
const isCustomRenderLabel = computed<boolean>(
  () => !!props?.labelRender && isFunction(props?.labelRender)
)
const sjSelectLabelRef = ref<HTMLElement[] | null>(null)
const renderLabel = async (option: SelectedOption) => {
  await nextTick()
  if (isCustomRenderLabel.value && sjSelectLabelRef.value) {
    sjSelectLabelRef.value?.forEach((selectedItemWrapper) => {
      const dataValueAttr = selectedItemWrapper?.getAttribute('data-value')
      const dataValueTypeAttr =
        selectedItemWrapper?.getAttribute('data-value-type')
      if (dataValueAttr && dataValueTypeAttr) {
        const dataValue =
          dataValueTypeAttr === 'number' ? +dataValueAttr : dataValueAttr
        if (dataValue === option?.value) {
          const labelVNode = (props?.labelRender as LabelRender)(
            option,
            props?.multiple ? removeSelectedOption : undefined
          )
          if (labelVNode) {
            render(labelVNode, selectedItemWrapper)
          }
        }
      }
    })
  }
}
watch(
  selectedOptions,
  (newValue) => {
    newValue?.forEach((item) => renderLabel(item))
  },
  { immediate: true }
)

/**
 * placeholder
 */
const placeholderVisible = computed<boolean>(() => {
  return !!props?.placeholder && !selectedOptions.value?.length
})

/**
 * clearable
 */
const isClearBtnVisible = computed<boolean>(
  () => props?.clearable && !!selectedOptions.value?.length
)
const handleClear = () => {
  selectedValues.value = []
  emit('clear')
}

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)
const arrowClasses = useArrowClasses(classNamePrefix, popupVisible)
const selectedTagClasses = useSelectedTagClasses(classNamePrefix, props)
const filterClasses = useFilterClasses(classNamePrefix, props, filterText)

/**
 * event handler
 */
const handleClick = () => {
  if (isBoolean(props?.visible) || props?.disabled) return
  popupVisible.value = !popupVisible.value
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  if (isBoolean(props?.visible) || props?.disabled) return
  popupVisible.value = false
  emit('blur', event)
}

/**
 * provide
 */
const handleOptionClicked = (option: SelectedOption) => {
  if (props?.disabled) return
  const indexFinded = selectedValues.value?.findIndex(
    (value) => value === option?.value
  )
  // multiple
  if (props?.multiple) {
    if (indexFinded >= 0) {
      selectedValues.value = selectedValues.value?.filter(
        (_, index) => index !== indexFinded
      )
    } else {
      selectedValues.value = [...selectedValues.value, option?.value]
    }
  } else {
    if (filterText.value) {
      filterText.value = ''
    }
    if (indexFinded === -1) {
      selectedValues.value = [option?.value]
    }
    handleClick()
  }
}

const provider = computed<Provider>(() => {
  return {
    selectedValues: props?.multiple
      ? [...selectedValues.value]
      : [selectedValues.value[0]],
    disabled: props?.disabled,
    size: props?.size,
    handleOptionClicked
  }
})
useProvide<Provider>(componentName, provider)

/**
 * methods
 */
const focus = () => {
  if (props.disabled) return
  if (sjSelectRef.value) {
    (sjSelectRef.value as HTMLElement)?.focus()
  }
}

const blur = () => {
  if (props.disabled) return
  if (sjSelectRef.value) {
    (sjSelectRef.value as HTMLElement)?.blur()
  }
}
const exposeVars: SelectRefExpose = {
  focus,
  blur
}
defineExpose(exposeVars)
</script>
