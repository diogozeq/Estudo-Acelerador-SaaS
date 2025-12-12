<template>
  <main :class="[theme.mainContainer]" style="background: radial-gradient(circle at 10% 20%, #0b1221 0%, #050510 40%, #00142b 100%); color: #fff;">
    <BaseCard :class="theme.sectionContainer" title="De Volta para o Futuro - Parte II" variant="default">
      <p class="mb-6 leading-relaxed" style="color:#dfefff">
        O relógio marca 16:29. O DeLorean barra o tempo com fumaça prateada e um leve cheiro de gasolina do futuro.
        Você decidiu pular para 2015 — mas cuidado: cada escolha cria novas linhas temporais.
      </p>

      <div class="mb-6">
        <h2 :class="[theme.headingSmall, 'mb-2']" style="color:#80ffe1">Missões do Dia</h2>
        <ul class="text-left mx-auto max-w-md list-inside list-disc" style="color:#cde7ff">
          <li>Encontrar o manual do Hoverboard escondido na loja de gadgets.</li>
          <li>Evitar encontros com versões futuras de você mesmo.</li>
          <li>Garantir que o relógio de Hill Valley esteja sincronizado com 88 mph.</li>
        </ul>
      </div>

      <div class="space-y-4">
        <div class="space-x-4">
          <NuxtLink to="/delorean" :class="[theme.buttonPrimary, 'inline-block']">
            🚗 Painel do DeLorean
          </NuxtLink>
          <NuxtLink to="/cep" :class="[theme.buttonSecondary, 'inline-block']">
            📍 Localizador CEP
          </NuxtLink>
        </div>
      </div>

      <footer :class="[theme.textMuted, 'mt-8']" style="color:#9fb7ff">Easter Egg: repare no calendário — novembro de 1955 está piscando.</footer>
    </BaseCard>
  </main>
</template>

<script setup lang="ts">
import { useThemeClasses } from '~/composables/useThemeClasses'
import BaseCard from '~/components/base/BaseCard.vue'

definePageMeta({
  title: 'De Volta para o Futuro II - Página Inicial'
})

const theme = useThemeClasses()
</script>
