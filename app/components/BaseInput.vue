<template>
  <input
    :id="id"
    :type="type"
    :placeholder="placeholder"
    :maxlength="maxlength"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    :class="['flex-1 px-4 py-3 rounded-lg font-mono text-lg bg-white/5 border-2 border-orange-500 text-yellow-50 placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-orange-400', extraClass]"
  />
</template>

<script setup lang="ts">
defineProps({
  modelValue: { type: String, default: '' },
  id: { type: String, default: undefined },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  maxlength: { type: [Number, String], default: undefined },
  extraClass: { type: String, default: '' }
})

defineEmits(['update:modelValue'])
</script>
