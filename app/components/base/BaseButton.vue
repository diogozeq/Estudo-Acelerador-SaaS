<template>
  <button
    :type="type"
    :disabled="disabled"
    @click="$emit('click', $event)"
    :class="[buttonClass, extraClass]"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeClasses } from '~/composables/useThemeClasses'

interface Props {
  label?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'danger'
  extraClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  type: 'button',
  disabled: false,
  variant: 'primary',
  extraClass: ''
})

defineEmits(['click'])

const theme = useThemeClasses()

const buttonClass = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return theme.buttonSecondary
    case 'danger':
      return theme.buttonDanger
    default:
      return theme.buttonPrimary
  }
})
</script>
