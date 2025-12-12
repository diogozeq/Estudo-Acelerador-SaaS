<template>
  <div v-if="loading" class="flex items-center justify-center p-8">
    <div class="space-y-4 text-center">
      <div class="flex justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2" :style="{ borderColor: '#ff6600' }"></div>
      </div>
      <p :class="theme.textBase" style="color: #ffcc00;">
        Buscando CEP...
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeClasses } from '~/composables/useThemeClasses'

interface Props {
  loading: boolean
}

defineProps<Props>()

const theme = useThemeClasses()
</script>
