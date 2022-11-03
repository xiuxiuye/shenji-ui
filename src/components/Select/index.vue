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
        >
          <template v-if="isFunction(labelRender)">
            {{ renderLabel(item) }}
          </template>
          <span v-else>
            {{ item?.label }}
            <span
              v-if="multiple"
              :class="`${classNamePrefix}-content-tag-close`"
              @click.stop="removeSelectedOption(item.value)"
              ><Icon type="close"
            /></span>
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
        v-if="filterVisible"
        :class="filterClasses"
        v-model="filterText"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>
    <Icon
      v-if="isClearBtnVisible"
      :class="`${classNamePrefix}-clear`"
      @click="handleClear"
      type="close-circle-fill"
    />
    <Icon
      v-if="loadingVisible"
      :class="`${classNamePrefix}-loading`"
      type="loading-a"
    />
    <div :class="arrowClasses" @click="handleClick">
      <slot name="arrow">
        <Icon :type="arrow" />
      </slot>
    </div>
    <transition :name="transitionName">
      <div
        v-if="popupVisible"
        ref="sjSelectPopupRef"
        :class="`${classNamePrefix}-popup`"
        :style="popupStyles"
      >
        <template v-if="filterOptions?.length">
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
          <slot name="empty">{{ empty }}</slot>
        </div>
        <!-- <slot /> -->
      </div>
    </transition>
    <!-- popup shadow -->
    <div
      ref="sjSelectPopupShadowRef"
      :class="`${classNamePrefix}-popup-shadow`"
      :style="popupStyles"
    >
      <template v-if="filterOptions?.length">
        <SelectOption
          v-for="option in filterOptions"
          :key="option[valueField]"
          :value="option[valueField]"
          :label="option[labelField]"
        />
      </template>
      <div v-else :class="`${classNamePrefix}-empty`">
        <slot name="empty">{{ empty }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  computed,
  watch,
  onMounted,
  onUnmounted,
  nextTick,
  render
} from 'vue'
import Icon from '../Icon'
import SelectOption from '../Option'
import {
  useClasses,
  useArrowClasses,
  useSelectedTagClasses,
  useFilterClasses
} from './hooks/useClasses'
import usePopupStyles from './hooks/usePopupStyles'
import {
  transitionName,
  initPopupPosition,
  setPopupClean,
  setPopupShadowClean,
  cleanPopup,
  cleanPopupShadow
} from './hooks/usePopup'
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
  LabelRender
} from './types'
import type {
  CommonSize,
  CommonFormStatus,
  CommonFormBorderType
} from 'src/types/global'
import type { ReferenceElement, FloatingElement } from '@floating-ui/dom'
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
  round?: boolean;
  filterable?: boolean;
  filter?: (filterText: string, option: Record<string, any>) => boolean;
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
  remote?: boolean;
  remoteMethod?: (filterText: string) => Promise<Options>;
  status?: CommonFormStatus;
  container?: string | HTMLElement;
  virtual?: boolean;
  arrow?: string;
  borderType?: CommonFormBorderType;
  popupMaxHeight?: number;
  search?: boolean;
  visible?: boolean;
  popupWithSelectWidth?: boolean | number | string;
  empty?: string;
  optionRender?: OptionRender;
  labelRender?: LabelRender;
};

const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
  disabled: false,
  autofocus: false,
  clearable: false,
  round: false,
  filterable: false,
  labelField: 'label',
  valueField: 'value',
  multiple: false,
  options: () => [],
  remote: false,
  container: 'body',
  virtual: false,
  arrow: 'down',
  borderType: 'block',
  popupMaxHeight: 256,
  search: false,
  visible: undefined,
  popupWithSelectWidth: true,
  placement: 'bottom-start',
  empty: '暂无数据'
})

/**
 * styles
 */
const popupStyles = usePopupStyles(props)

/**
 * emit
 */
type Emit = {
  (e: 'update:modelValue', value: SingleModelValue | SingleModelValue[]): void;
};
const emit = defineEmits<Emit>()

/**
 * handle popup mounted
 */
const popupVisible = ref<boolean>(false)
const sjSelectRef = ref<ReferenceElement>()
const sjSelectPopupRef = ref<FloatingElement>()
const sjSelectPopupShadowRef = ref<FloatingElement>()

/**
 * popup的显示是受控的
 */
watch(
  () => props?.visible,
  (newValue) => {
    if (isBoolean(newValue)) {
      popupVisible.value = newValue
    }
  },
  { immediate: true }
)

watch(
  popupVisible,
  async (newValue) => {
    if (newValue) {
      await nextTick()
      const select = sjSelectRef.value
      const selectPopup = sjSelectPopupRef.value
      if (select && selectPopup) {
        const clean = initPopupPosition(select, selectPopup, {
          placement: props?.placement
        })
        setPopupClean(clean)
      }
    } else {
      cleanPopup()
    }
  },
  { immediate: true }
)

onMounted(() => {
  const select = sjSelectRef.value
  const selectPopupShadow = sjSelectPopupShadowRef?.value
  if (select && selectPopupShadow) {
    const clean = initPopupPosition(select, selectPopupShadow, {
      placement: props?.placement
    })
    setPopupShadowClean(clean)
  }
})

onUnmounted(() => {
  cleanPopup()
  cleanPopupShadow()
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
const selectedOptions = ref<SelectedOption[]>([])

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

const removeSelectedOption = (value: SingleModelValue) => {
  const index = selectedOptions.value?.findIndex(
    (option) => option?.value === value
  )
  selectedOptions.value?.splice(index, 1)
}

watch(
  () => props?.modelValue,
  () => {
    if (props?.multiple) {
      if (isArray(props?.modelValue)) {
        selectedOptions.value = filterSelectedOptions(
          props?.modelValue as SingleModelValue[]
        )
      } else {
        consoleError('神机：Select在多选模式下model-value的类型应为数组')
      }
    } else {
      if (
        isString(props?.modelValue) ||
        isNumber(props?.modelValue) ||
        props?.modelValue === undefined
      ) {
        selectedOptions.value = filterSelectedOptions([
          props?.modelValue
        ] as SingleModelValue[])
      } else {
        consoleError(
          '神机：Select在单选模式下model-value的类型应为string | number'
        )
      }
    }
  },
  { immediate: true }
)
const selectedValues = computed<SingleModelValue[]>(() =>
  selectedOptions.value?.map((option) => option.value)
)

watch(selectedValues, () => {
  emit(
    'update:modelValue',
    props?.multiple ? selectedValues.value : selectedValues.value[0]
  )
})

/**
 * custom render label
 */
const sjSelectLabelRef = ref<HTMLElement[] | null>(null)
const renderLabel = (option: SelectedOption) => {
  if (props?.labelRender && sjSelectLabelRef.value) {
    sjSelectLabelRef.value?.forEach((selectedItemWrapper) => {
      const labelVNode = (props?.labelRender as LabelRender)(option)
      if (labelVNode) {
        render(labelVNode, selectedItemWrapper)
      }
    })
  }
}

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

/**
 * loading
 */
const loadingVisible = ref<boolean>(false)

/**
 * filter
 */
const filterVisible = computed<boolean>(() => {
  return props?.filterable || props?.remote
})
const filterText = ref<string>('')
const filterOptions = ref<Options>([])
watch(
  filterText,
  async () => {
    if (props?.remote) {
      if (props?.remoteMethod && isFunction(props?.remoteMethod)) {
        try {
          loadingVisible.value = true
          filterOptions.value = await props?.remoteMethod(filterText.value)
        } catch (error) {
          consoleError(error as string)
        } finally {
          loadingVisible.value = false
        }
      }
    } else if (!props?.filterable || !filterText.value) {
      filterOptions.value = props?.options
    } else {
      const regExp = new RegExp(filterText.value)
      filterOptions.value = props?.options?.filter((el) => {
        if (props?.filter && isFunction(props?.filter)) {
          return props?.filter(filterText.value, el)
        }
        return regExp?.test(el[props?.labelField])
      })
    }
  },
  { immediate: true }
)

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
  popupVisible.value = true
}

const handleClear = () => {
  selectedOptions.value = []
}

const handleFocus = () => {
  //
  console.log(1111)
}

const handleBlur = () => {
  if (isBoolean(props?.visible) || props?.disabled) return
  popupVisible.value = false
}

/**
 * provide
 */
const handleOptionClicked = (option: SelectedOption) => {
  if (props?.disabled) return
  const index = selectedOptions.value?.findIndex(
    (selectedOption) => selectedOption.value === option?.value
  )
  // multiple
  if (props?.multiple) {
    if (index >= 0) {
      selectedOptions.value?.splice(index, 1)
    } else {
      selectedOptions.value?.push(option)
    }
  } else {
    if (index === -1) {
      selectedOptions.value = [option]
    }
  }
}

const provider = computed<Provider>(() => {
  return {
    selectedValues: props?.multiple
      ? [...selectedValues.value]
      : [selectedValues.value[0]],
    disabled: props?.disabled,
    handleOptionClicked
  }
})
useProvide<Provider>(componentName, provider)
</script>
