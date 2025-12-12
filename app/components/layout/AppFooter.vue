<template>
  <footer :class="['py-6 px-8 border-t-2 text-center', theme.borderPrimary]" style="background: radial-gradient(circle at 10% 20%, #0b1221 0%, #050510 40%, #00142b 100%);">
    <p :class="[theme.textMuted, theme.colorAccent]">
      🔮 Powered by ViaCEP | Tema: De Volta para o Futuro (1985) 🔮
    </p>
  </footer>
</template>

<script setup lang="ts">
import { useThemeClasses } from '~/composables/useThemeClasses'

const theme = useThemeClasses()
</script>
