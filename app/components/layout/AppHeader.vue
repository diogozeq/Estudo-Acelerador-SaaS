<template>
  <header :class="['py-6 px-8 border-b-2', theme.borderPrimary]" style="background: radial-gradient(circle at 10% 20%, #0b1221 0%, #050510 40%, #00142b 100%);">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <div>
        <h1 :class="[theme.headingLarge, theme.colorPrimary]">
          🚗 CEP Locator
        </h1>
        <p :class="[theme.textSmall, theme.colorAccent]">
          De Volta para o Futuro
        </p>
      </div>
      <nav class="space-x-4">
        <NuxtLink to="/" :class="[theme.buttonPrimary, 'inline-block']">
          Home
        </NuxtLink>
        <NuxtLink to="/cep" :class="[theme.buttonSecondary, 'inline-block']">
          CEP Lookup
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useThemeClasses } from '~/composables/useThemeClasses'

const theme = useThemeClasses()
</script>
