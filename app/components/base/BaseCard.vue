<template>
  <div :class="[cardClass, extraClass]">
    <h2 v-if="title" :class="theme.headingMedium">{{ title }}</h2>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeClasses } from '~/composables/useThemeClasses'

interface Props {
  title?: string
  variant?: 'default' | 'highlight'
  extraClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  variant: 'default',
  extraClass: ''
})

const theme = useThemeClasses()

const cardClass = computed(() => {
  switch (props.variant) {
    case 'highlight':
      return theme.cardHighlight
    default:
      return theme.cardDefault
  }
})
</script>
