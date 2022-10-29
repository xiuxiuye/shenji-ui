<template>
  <div
    ref="sjSelectRef"
    :class="classes"
    :tabindex="0"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <div :class="`${classNamePrefix}-content`">
      <div
        :class="selectedTagClasses"
        v-for="item in selectedOptions"
        :key="item?.value"
      >
        {{ item?.label }}
        <span
          :class="`${classNamePrefix}-content-tag-close`"
          @click.stop="removeSelectedOption(item.value)"
          ><Icon type="close"
        /></span>
      </div>
    </div>
    <div :class="arrowClasses">
      <Icon type="down" />
    </div>
    <transition :name="transitionName">
      <div
        v-if="popupVisible"
        ref="sjSelectPopupRef"
        :class="`${classNamePrefix}-popup`"
        :style="popupStyles"
      >
        <Option
          v-for="option in options"
          :key="option[valueField]"
          :value="option[valueField]"
          :label="option[labelField]"
          :disabled="option?.disabled"
        ></Option>
        <!-- <slot /> -->
      </div>
    </transition>
    <!-- popup shadow -->
    <div
      ref="sjSelectPopupShadowRef"
      :class="`${classNamePrefix}-popup-shadow`"
      :style="popupStyles"
    ></div>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import Icon from '../Icon'
import Option from '../Option'
import useClasses from './hooks/useClasses'
import useArrowClasses from './hooks/useArrowClasses'
import useSelectedTagClasses from './hooks/useSelectedTagClasses'
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
import consoleError from 'src/utils/console/error'
import useProvide from 'src/utils/hooks/useProvide'
import type { Provider, SelectedOption } from './types'
import type {
  CommonSize,
  CommonFormStatus,
  CommonFormBorderType
} from 'src/types/global'
import type { ReferenceElement, FloatingElement } from '@floating-ui/dom'

export const componentName = 'sj-select'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
type SingleModelValue = string | number;
type Props = {
  size?: CommonSize;
  disabled?: boolean;
  autofocus?: boolean;
  modelValue?: SingleModelValue | SingleModelValue[];
  clearable?: boolean;
  loading?: boolean;
  round?: boolean;
  filterable?: boolean;
  filter?: (pattern: string, option: Record<string, any>) => boolean;
  labelField?: string;
  valueField?: string;
  maxCount?: number;
  multiple?: boolean;
  options?: Array<Record<string, any>>;
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
  remoteMethod?: () => Promise<Array<Record<string, unknown>>>;
  status?: CommonFormStatus;
  container?: string | HTMLElement;
  virtual?: boolean;
  arrow?: string;
  borderType?: CommonFormBorderType;
  popupMaxHeight?: number;
  search?: boolean;
  visible?: boolean;
  popupWithSelectWidth?: boolean | number | string;
};

const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
  disabled: false,
  autofocus: false,
  clearable: false,
  loading: false,
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
  visible: false,
  popupWithSelectWidth: true,
  placement: 'bottom-start'
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

watch(popupVisible, async (newValue, preValue) => {
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
})

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
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)
const arrowClasses = useArrowClasses(classNamePrefix, popupVisible)
const selectedTagClasses = useSelectedTagClasses(classNamePrefix, props)

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
        value: selectedItem[props?.valueField]
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
      if (isString(props?.modelValue) || isNumber(props?.modelValue)) {
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
  emit('update:modelValue', props?.multiple ? selectedValues.value : selectedValues.value[0])
})

/**
 * event handler
 */
const handleClick = () => {
  popupVisible.value = true
}

const handleFocus = () => {
  //
}
const handleBlur = () => {
  popupVisible.value = false
}

/**
 * provide
 */
const handleOptionClicked = (option: SelectedOption) => {
  console.log(option)
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
