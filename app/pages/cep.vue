<template>
  <div class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden font-display bg-background-dark text-white">
    <div class="flex h-full min-h-screen w-full">
      <!-- Sidebar -->
      <aside class="flex h-full min-h-screen flex-col justify-between border-r border-solid border-white/10 p-4 w-64 brushed-steel-dark">
        <div class="flex flex-col gap-4">
          <!-- Navigation -->
          <nav class="flex flex-col gap-2">
            <NuxtLink to="/delorean" class="flex items-center gap-3 px-3 py-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors duration-200 rounded-md">
              <span class="material-symbols-outlined">timeline</span>
              <p class="text-sm font-medium leading-normal">Timelines</p>
            </NuxtLink>
            <NuxtLink to="/cep" class="flex items-center gap-3 px-3 py-2 rounded-md bg-electric-blue/20 text-electric-blue">
              <span class="material-symbols-outlined">location_on</span>
              <p class="text-sm font-medium leading-normal">CEP Lookup</p>
            </NuxtLink>
          </nav>
        </div>

        <!-- Gigawatts Meter -->
        <div class="flex flex-col gap-2 p-2 brushed-steel rounded-lg border-2 border-black/50 shadow-inner">
          <h3 class="text-center font-retro text-lg tracking-wider text-gray-300">GIGAWATTS</h3>
          <div class="w-full bg-black/50 rounded-full h-4 border border-gray-700 shadow-inner">
            <div class="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 h-full rounded-full flex items-center justify-end transition-all duration-300" :style="{ width: `${appState.gigawattsPercentage.value}%` }">
              <span class="material-symbols-outlined text-xl text-yellow-200 -mr-2 drop-shadow-[0_0_4px_rgba(251,255,0,0.8)]">bolt</span>
            </div>
          </div>
          <p class="text-center font-mono text-sm text-yellow-300">{{ appState.gigawatts.value.toFixed(2) }} GW</p>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col bg-background-dark">
        <!-- Header -->
        <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/10 px-6 py-3 brushed-steel-dark">
          <div class="flex items-center gap-4 text-white">
            <div class="size-6 text-electric-blue">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor" />
              </svg>
            </div>
            <h2 class="font-retro italic text-xl tracking-wide chrome-gradient">Localizador de CEP</h2>
          </div>
          <div class="flex flex-1 justify-end gap-4 items-center">
            <div class="flex items-center gap-2 rounded-lg bg-black p-2 border border-gray-700">
              <p class="font-led text-3xl text-electric-blue tabular-nums">{{ appState.speed.value }}</p>
              <span class="text-sm font-mono text-gray-400">MPH</span>
            </div>
            <BaseButton label="START TRIP" @click="appState.startTrip()" />
          </div>
        </header>

        <!-- Main -->
        <main class="flex-1 p-6 overflow-y-auto">
          <!-- Search Section -->
          <div class="brushed-steel rounded-lg p-6 border-2 border-black/50 mb-6">
            <h3 class="font-retro italic text-2xl tracking-wide chrome-gradient mb-4">Buscar Endereço</h3>
            
            <CepSearchForm
              :input="cepState.input.value"
              :loading="cepState.loading.value"
              @update:input="cepState.setInput"
              @search="handleSearch"
            />

            <!-- Empty State -->
            <div v-if="!cepState.loading.value && !cepState.error.value && !cepState.result.value" class="text-center p-8 opacity-70 mt-4">
              <p class="font-mono text-gray-400">⏰ Digite um CEP e clique em "Pesquisar" para começar...</p>
              <p class="font-mono text-gray-500 text-sm mt-2">Exemplo: 01001000 (Praça da Sé, São Paulo)</p>
            </div>
          </div>

          <!-- Loading Indicator -->
          <CepLoadingIndicator :loading="cepState.loading.value" />

          <!-- Error Display -->
          <CepErrorDisplay :error="cepState.error.value" />

          <!-- Results Display -->
          <CepResultsDisplay :result="cepState.result.value" />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppState } from '~/composables/useAppState'
import { useCepState } from '~/composables/useCepState'
import { useCepValidation } from '~/composables/useCepValidation'
import { API_CONFIG, CEP_CONFIG } from '~/utils/constants'
import BaseButton from '~/components/base/BaseButton.vue'
import CepSearchForm from '~/components/features/CepSearchForm.vue'
import CepResultsDisplay from '~/components/features/CepResultsDisplay.vue'
import CepErrorDisplay from '~/components/features/CepErrorDisplay.vue'
import CepLoadingIndicator from '~/components/features/CepLoadingIndicator.vue'

definePageMeta({
  title: 'Localizador de CEP — De Volta para o Futuro'
})

const appState = useAppState()
const cepState = useCepState()
const { validateFormat, isCepNotFound } = useCepValidation()

const handleSearch = async (cep: string) => {
  cepState.clearResults()

  if (!validateFormat(cep)) {
    cepState.setError(CEP_CONFIG.ERROR_MESSAGES.INVALID_FORMAT)
    return
  }

  cepState.setLoading(true)

  try {
    const response = await fetch(`${API_CONFIG.VIACEP_BASE_URL}/${cep}/${API_CONFIG.VIACEP_FORMAT}/`)

    if (!response.ok) {
      throw new Error(CEP_CONFIG.ERROR_MESSAGES.API_ERROR)
    }

    const data = await response.json()

    if (isCepNotFound(data)) {
      cepState.setError(CEP_CONFIG.ERROR_MESSAGES.NOT_FOUND)
      return
    }

    cepState.setResult(data)
  } catch (err) {
    cepState.setError(
      err instanceof Error ? err.message : CEP_CONFIG.ERROR_MESSAGES.NETWORK_ERROR
    )
  } finally {
    cepState.setLoading(false)
  }
}
</script>
