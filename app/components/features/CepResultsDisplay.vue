<template>
  <div v-if="result" class="brushed-steel rounded-lg p-6 border-2 border-black/50">
    <h3 class="font-retro italic text-2xl tracking-wide chrome-gradient mb-6">Endereço Encontrado</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- CEP -->
      <div class="flex flex-col items-stretch justify-start rounded-lg bg-black/70 p-4 border border-gray-700 shadow-inner">
        <p class="font-mono text-xs uppercase text-gray-500 tracking-widest">CEP</p>
        <p class="font-led text-2xl text-electric-blue mt-2">{{ formatCepDisplay(result.cep) }}</p>
      </div>

      <!-- Logradouro -->
      <div class="flex flex-col items-stretch justify-start rounded-lg bg-black/70 p-4 border border-gray-700 shadow-inner">
        <p class="font-mono text-xs uppercase text-gray-500 tracking-widest">Logradouro</p>
        <p class="font-mono text-white mt-2">{{ result.logradouro || '—' }}</p>
      </div>

      <!-- Bairro -->
      <div class="flex flex-col items-stretch justify-start rounded-lg bg-black/70 p-4 border border-gray-700 shadow-inner">
        <p class="font-mono text-xs uppercase text-gray-500 tracking-widest">Bairro</p>
        <p class="font-mono text-white mt-2">{{ result.bairro || '—' }}</p>
      </div>

      <!-- Localidade -->
      <div class="flex flex-col items-stretch justify-start rounded-lg bg-black/70 p-4 border border-gray-700 shadow-inner">
        <p class="font-mono text-xs uppercase text-gray-500 tracking-widest">Localidade</p>
        <p class="font-mono text-white mt-2">{{ result.localidade || '—' }}</p>
      </div>

      <!-- UF -->
      <div class="flex flex-col items-stretch justify-start rounded-lg bg-black/70 p-4 border border-gray-700 shadow-inner">
        <p class="font-mono text-xs uppercase text-gray-500 tracking-widest">Estado (UF)</p>
        <p class="font-led text-2xl text-yellow-400 mt-2">{{ result.uf || '—' }}</p>
      </div>

      <!-- Região -->
      <div class="flex flex-col items-stretch justify-start rounded-lg bg-black/70 p-4 border border-gray-700 shadow-inner">
        <p class="font-mono text-xs uppercase text-gray-500 tracking-widest">Região</p>
        <p class="font-mono text-white mt-2">{{ result.regiao || '—' }}</p>
      </div>

      <!-- DDD -->
      <div class="flex flex-col items-stretch justify-start rounded-lg bg-black/70 p-4 border border-gray-700 shadow-inner">
        <p class="font-mono text-xs uppercase text-gray-500 tracking-widest">DDD</p>
        <p class="font-led text-2xl text-green-400 mt-2">{{ result.ddd || '—' }}</p>
      </div>

      <!-- IBGE -->
      <div class="flex flex-col items-stretch justify-start rounded-lg bg-black/70 p-4 border border-gray-700 shadow-inner">
        <p class="font-mono text-xs uppercase text-gray-500 tracking-widest">IBGE</p>
        <p class="font-mono text-white mt-2">{{ result.ibge || '—' }}</p>
      </div>
    </div>

    <!-- Complemento -->
    <div v-if="result.complemento" class="mt-4 flex flex-col items-stretch justify-start rounded-lg bg-black/70 p-4 border border-gray-700 shadow-inner">
      <p class="font-mono text-xs uppercase text-gray-500 tracking-widest">Complemento</p>
      <p class="font-mono text-white mt-2">{{ result.complemento }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCepDisplay } from '~/utils/cepFormatter'
import type { CepResponse } from '~/types/cep'

interface Props {
  result: CepResponse | null
}

defineProps<Props>()
</script>
