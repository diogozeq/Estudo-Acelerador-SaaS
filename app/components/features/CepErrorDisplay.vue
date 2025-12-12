<template>
  <div v-if="error" :class="['mb-6 p-4 rounded-lg', theme.bgError, 'border-2', theme.borderError, theme.colorError]">
    <p class="font-semibold">❌ Erro:</p>
    <p>{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { useThemeClasses } from '~/composables/useThemeClasses'

interface Props {
  error: string | null
}

defineProps<Props>()

const theme = useThemeClasses()
</script>
