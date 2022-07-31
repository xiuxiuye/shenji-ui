<template>
  <div :class="conatinerClasses" @keypress.enter="handleSearch">
    <slot name="prepend" v-if="slots?.prepend"></slot>
    <div :class="classes">
      <div :class="`${classNamePrefix}-prefix`" v-if="slots?.prefix || prefix">
        <slot name="prefix">
          <Icon v-if="!!prefix" :type="prefix" />
        </slot>
      </div>
      <input ref="sjInputRef" :type="inputType" v-model="realValue" :maxlength="realMaxLength || Infinity"
        :autofocus="isAutofocusAllowed" :placeholder="placeholder" @focus="handleFocus" @blur="handleBlur"
        @change="handleChange" @input="handleInput" />
      <span :class="`${classNamePrefix}-length`" v-if="showLength">
        {{ realValue?.length }}
        <template v-if="realMaxLength">
          / {{ realMaxLength }}
        </template>
      </span>
      <div :class="`${classNamePrefix}-suffix`" v-if="slots?.suffix || suffix">
        <slot name="suffix">
          <Icon v-if="!!suffix" :type="suffix" />
        </slot>
      </div>
      <Icon v-if="password" :class="`${classNamePrefix}-password`" :type="passwordIcon" @click="handlePassword" />
      <Icon v-if="isClearBtnVisible" :class="`${classNamePrefix}-clear`" type="close-circle-fill"
        @click="handleClear" />
      <Icon v-if="isSearchIconExist" :class="`${classNamePrefix}-search-icon`" :type="searchIcon"
        @click="handleSearch" />
    </div>
    <slot name="search-button" v-if="isSearchBtnExist">
      <Button type="primary" :loading="loading" :size="size" @click="handleSearch">
        <template v-if="searchButtonText">{{ searchButtonText }}</template>
        <Icon v-else-if="!loading" type="search" />
      </Button>
    </slot>
    <slot name="append" v-if="slots?.append"></slot>
  </div>
</template>

<script lang="ts">
import { ref, computed, useSlots } from 'vue'
import Icon from 'src/components/Icon'
import Button from 'src/components/Button'
import useClasses from './hooks/useClasses'
import useConatinerClasses from './hooks/useContainerClasses'
import isVaildNumber from 'src/utils/isVaildNumber'
const componentName = 'sj-input'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
/**
 * props
 */
interface IProps {
  clearable?: boolean;
  size?: 'small' | 'normal' | 'large';
  round?: boolean;
  prefix?: string;
  suffix?: string;
  search?: boolean;
  searchButton?: boolean;
  searchButtonText?: string;
  showSearch?: boolean;
  autosize?: boolean;
  loading?: boolean;
  password?: boolean;
  disabled?: boolean;
  maxLength?: number | string;
  showLength?: boolean;
  status?: 'success' | 'warning' | 'error';
  autofocus?: boolean;
  modelValue?: string;
  border?: 'none' | 'line' | 'block';
  placeholder?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  clearable: false,
  size: 'normal',
  round: false,
  search: false,
  searchButton: false,
  showSearch: true,
  autosize: false,
  loading: false,
  password: false,
  disabled: false,
  maxLength: 0,
  showLength: false,
  autofocus: false,
  border: 'block'
})

/**
 * slots
 */
const slots = useSlots()

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)
const conatinerClasses = useConatinerClasses(classNamePrefix, props, slots)

/**
 * emit
 */
interface IEmit {
  (e: 'clear'): void;
  (e: 'focus', event: Event): void;
  (e: 'blur', event: Event): void;
  (e: 'change', value: string, event: Event): void;
  (e: 'input', value: string, event: Event): void;
  (e: 'search', value: string): void;
  (e: 'update:modelValue', value: string): void;
}
const emit = defineEmits<IEmit>()

/**
 * autofocus
 */
const isAutofocusAllowed = computed<boolean>(() => props?.autofocus && !props?.disabled)

/**
 * length
 */
const realMaxLength = computed<number>(() => Math.max(0, isVaildNumber(props?.maxLength) ? Number(props?.maxLength) : 0))

/**
 * v-model
 */
const realValue = computed<string>({
  get () {
    return props?.modelValue || ''
  },
  set (value) {
    return emit('update:modelValue', value)
  }
})

/**
 * clearable
 */
const isClearBtnVisible = computed<boolean>(() => props?.clearable && !!realValue?.value)
const handleClear = () => {
  realValue.value = ''
  emit('clear')
}

/**
 * password
 */
const isPlainPassword = ref<boolean>(false)
const passwordIcon = computed<string>(() => isPlainPassword?.value ? 'eye' : 'eye-close')
const inputType = computed<string>(() => props?.password && !isPlainPassword?.value ? 'password' : 'text')
const handlePassword = () => {
  isPlainPassword.value = !isPlainPassword.value
}

/**
 * search
 */
const isSearchIconExist = computed<boolean>(() => props?.search && !props?.searchButton && props?.showSearch)
const isSearchBtnExist = computed<boolean>(() => props?.search && props?.searchButton && props?.showSearch)
const searchIcon = computed<string>(() => props?.loading ? 'loading-a' : 'search')
const handleSearch = () => {
  if (!props?.search || props?.loading) return
  emit('search', realValue?.value)
}

/**
 * focus
 */
const handleFocus = (event: Event) => {
  emit('focus', event)
}

/**
 * blur
 */
const handleBlur = (event: Event) => {
  emit('blur', event)
}

/**
 * change
 */
const handleChange = (event: Event) => {
  emit('change', realValue?.value, event)
}

/**
 * focus
 */
const handleInput = (event: Event) => {
  emit('input', realValue?.value, event)
}

/**
 * methods
 */
const sjInputRef = ref(null)
const focus = () => {
  const dom: HTMLElement | null = sjInputRef?.value
  if (dom) {
    (dom as HTMLElement)?.focus()
  }
}

const blur = () => {
  const dom: HTMLElement | null = sjInputRef?.value
  if (dom) {
    (dom as HTMLElement)?.blur()
  }
}

interface IExposeVars {
  focus: () => void;
  blur: () => void;
}
const exposeVars: IExposeVars = {
  focus,
  blur
}
defineExpose(exposeVars)
</script>
