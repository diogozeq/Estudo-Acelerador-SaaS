<template>
  <div v-if="result" class="space-y-4">
    <BaseCard title="Endereço Encontrado" variant="highlight">
      <div :class="theme.gridLayout">
        <!-- CEP -->
        <div :class="[theme.fieldContainer, theme.bgDark]">
          <p :class="theme.textSmall">CEP</p>
          <p :class="[theme.textBase, 'font-mono font-bold', theme.colorPrimary]">
            {{ formatCepDisplay(result.cep) }}
          </p>
        </div>

        <!-- Logradouro -->
        <div :class="[theme.fieldContainer, theme.bgDark]">
          <p :class="theme.textSmall">Logradouro</p>
          <p :class="[theme.textBase, 'font-bold', theme.colorAccent]">
            {{ result.logradouro || '—' }}
          </p>
        </div>

        <!-- Bairro -->
        <div :class="[theme.fieldContainer, theme.bgDark]">
          <p :class="theme.textSmall">Bairro</p>
          <p :class="[theme.textBase, 'font-bold', theme.colorAccent]">
            {{ result.bairro || '—' }}
          </p>
        </div>

        <!-- Localidade -->
        <div :class="[theme.fieldContainer, theme.bgDark]">
          <p :class="theme.textSmall">Localidade</p>
          <p :class="[theme.textBase, 'font-bold', theme.colorAccent]">
            {{ result.localidade || '—' }}
          </p>
        </div>

        <!-- UF -->
        <div :class="[theme.fieldContainer, theme.bgDark]">
          <p :class="theme.textSmall">Estado (UF)</p>
          <p :class="[theme.textBase, 'font-bold', theme.colorPrimary]">
            {{ result.uf || '—' }}
          </p>
        </div>

        <!-- Região -->
        <div :class="[theme.fieldContainer, theme.bgDark]">
          <p :class="theme.textSmall">Região</p>
          <p :class="[theme.textBase, 'font-bold', theme.colorPrimary]">
            {{ result.regiao || '—' }}
          </p>
        </div>

        <!-- DDD -->
        <div :class="[theme.fieldContainer, theme.bgDark]">
          <p :class="theme.textSmall">DDD</p>
          <p :class="[theme.textBase, 'font-bold', theme.colorAccent]">
            {{ result.ddd || '—' }}
          </p>
        </div>

        <!-- IBGE -->
        <div :class="[theme.fieldContainer, theme.bgDark]">
          <p :class="theme.textSmall">IBGE</p>
          <p :class="[theme.textBase, 'font-bold', theme.colorAccent]">
            {{ result.ibge || '—' }}
          </p>
        </div>
      </div>

      <!-- Complemento -->
      <div v-if="result.complemento" :class="['mt-4', theme.fieldContainer, theme.bgDark]">
        <p :class="theme.textSmall">Complemento</p>
        <p :class="[theme.textBase, theme.colorAccent]">{{ result.complemento }}</p>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { useThemeClasses } from '~/composables/useThemeClasses'
import { formatCepDisplay } from '~/utils/cepFormatter'
import type { CepResponse } from '~/types/cep'
import BaseCard from '../base/BaseCard.vue'

interface Props {
  result: CepResponse | null
}

defineProps<Props>()

const theme = useThemeClasses()
</script>
