<template>
  <div v-if="cepData" class="space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DetailField label="CEP" :value="cepData.cep" />
      <DetailField label="UF" :value="cepData.uf" />
      <DetailField label="Localidade" :value="cepData.localidade" />
      <DetailField label="Bairro" :value="cepData.bairro" />
      <DetailField label="Logradouro" :value="cepData.logradouro" />
      <DetailField label="Complemento" :value="cepData.complemento || '—'" />
      <DetailField label="Região" :value="cepData.regiao" />
      <DetailField label="DDD" :value="cepData.ddd" />
      <DetailField label="IBGE" :value="cepData.ibge" />
      <DetailField label="GIA" :value="cepData.gia" />
    </div>
  </div>
  <div v-else class="text-center text-yellow-200 opacity-60">
    Nenhum CEP selecionado
  </div>
</template>

<script setup lang="ts">
import type { CepResponse } from '../types/cep'
import DetailField from './DetailField.vue'

defineProps<{
  cepData: CepResponse | null
}>()
</script>
