<template>
  <div class="flex flex-col">
    <span class="text-xs font-semibold text-orange-400 uppercase tracking-wide">{{ label }}</span>
    <span class="text-sm text-yellow-50 mt-1">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string
}>()
</script>
