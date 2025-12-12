<template>
  <input
    :id="id"
    :type="type"
    :placeholder="placeholder"
    :maxlength="maxlength"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    :class="[inputClass, extraClass]"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeClasses } from '~/composables/useThemeClasses'

interface Props {
  modelValue: string
  id?: string
  type?: string
  placeholder?: string
  maxlength?: number | string
  variant?: 'primary' | 'secondary'
  extraClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  id: undefined,
  type: 'text',
  placeholder: '',
  maxlength: undefined,
  variant: 'primary',
  extraClass: ''
})

defineEmits(['update:modelValue'])

const theme = useThemeClasses()

const inputClass = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return theme.inputSecondary
    default:
      return theme.inputPrimary
  }
})
</script>
