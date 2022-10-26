<template>
  <div class="sj-message-container" :style="containerStyles">
    <TransitionGroup :name="transitionName" tag="div">
      <div v-for="message in data" :key="message?.id" class="sj-message-body" :style="bodyStyles">
        <div class="sj-message">
          <Icon v-if="message?.showIcon && message?.icon" class="sj-message-icon" :type="message?.icon"
            :color="message?.iconColor" size="20" />
          <div class="sj-message-content">
            <component :is="message?.content" />
          </div>
          <Icon v-if="message?.closable" class="sj-message-close" type="close" @click="handleClose(message)" />
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import Icon from '../Icon'
import { computed } from 'vue'
import isFunction from 'src/utils/isFunction'
import type { MessagePlacement } from './types'
import type { DefaultMessage } from './message'
import type { Ref, StyleValue } from 'src/types/global'

interface Props {
  data: Set<DefaultMessage>;
  placement: Ref<MessagePlacement>;
}

const props = defineProps<Props>()

const handleClose = (message: DefaultMessage) => {
  message.destroyed()
  if (isFunction(message?.onClose)) message?.onClose()
}

const transitionName = computed<string>(() => {
  const placement = props?.placement?.value
  if (placement.startsWith('bottom')) {
    return 'sj-global-message-slide-from-bottom'
  }

  if (placement.startsWith('right')) {
    return 'sj-global-message-slide-from-right'
  }

  if (placement.startsWith('left')) {
    return 'sj-global-message-slide-from-left'
  }

  return 'sj-global-message-slide-from-top'
})

/**
 * styles
 */
const containerStyles = computed<StyleValue>(() => {
  const placement = props?.placement?.value
  if (placement.includes('bottom')) {
    return {
      bottom: 0
    }
  }
  return {
    top: 0
  }
})

const bodyStyles = computed<StyleValue>(() => {
  const placement = props?.placement?.value
  return {
    textAlign: placement.includes('left') ? 'left' : placement.includes('right') ? 'right' : 'center'
  }
})
</script>
