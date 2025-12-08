<template>
  <button
    :type="type"
    :disabled="disabled"
    @click="$emit('click', $event)"
    :class="['px-6 py-3 font-bold rounded-lg transition-all duration-200 bg-orange-500 text-black disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105', extraClass]"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  label?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  extraClass?: string
}

withDefaults(defineProps<Props>(), {
  label: '',
  type: 'button',
  disabled: false,
  extraClass: ''
})

defineEmits(['click'])
</script>
