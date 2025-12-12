<template>
  <div v-if="error" class="brushed-steel rounded-lg p-6 border-2 border-red-600/50 mb-6">
    <div class="flex items-start gap-3">
      <span class="material-symbols-outlined text-red-500 mt-1">error</span>
      <div class="flex flex-col">
        <p class="font-mono text-sm uppercase text-red-500 tracking-widest">Erro</p>
        <p class="font-mono text-gray-300 mt-1">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  error: string | null
}

defineProps<Props>()
</script>
