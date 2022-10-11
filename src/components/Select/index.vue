<template lang="">
  <div></div>
</template>

<script lang="ts">
import type { CommonSize, CommonFormStatus } from 'src/types/global'
const componentName = 'sj-select'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
interface IProps {
  size?: CommonSize;
  disabled?: boolean;
  autofocus?: boolean;
  modelValue?: string | number | Array<string | number>;
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
  placement?: 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-start' | 'bottom' | 'bottom-end' | 'left-start' | 'left' | 'left-end';
  remote?: boolean;
  remoteMethod?: () => Promise<Array<Record<string, any>>>;
  status?: CommonFormStatus;
}

</script>
