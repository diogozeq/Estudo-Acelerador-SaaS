<template>
  <div v-if="loading" class="brushed-steel rounded-lg p-6 flex flex-col items-center justify-center border-2 border-black/50 mb-6">
    <h3 class="font-retro text-lg tracking-wider text-gray-300 mb-4">LOADING...</h3>
    <div class="relative w-40 h-40 flex items-center justify-center">
      <div class="absolute w-full h-full">
        <div class="absolute top-1/2 left-0 w-1/2 h-1 bg-gray-600 -translate-y-1/2" />
        <div class="absolute top-1/2 right-0 w-1/2 h-1 bg-gray-600 -translate-y-1/2" />
        <div class="absolute left-1/2 top-0 w-1 h-1/2 bg-gray-600 -translate-x-1/2" />
        <div class="absolute left-1/2 bottom-0 w-1 h-1/2 bg-gray-600 -translate-x-1/2" />
      </div>
      <div class="absolute w-2/3 h-2/3 rounded-full bg-electric-blue/50 blur-xl animate-pulse" />
      <div class="absolute w-1/3 h-1/3 rounded-full bg-white blur-lg animate-ping" />
      <div class="relative bg-gray-700 w-12 h-12 rounded-full border-2 border-gray-500" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  loading: boolean
}

defineProps<Props>()
</script>
