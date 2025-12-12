<template>
  <main :class="theme.mainContainer" style="background: linear-gradient(135deg, #1a0033 0%, #330066 50%, #1a0033 100%); color: #fff;">
    <BaseCard :class="theme.sectionContainer" title="🚗 Localizador de CEP 🚗" variant="default">
      <p class="text-center mb-6" style="color: #ffcc00;">
        (De Volta para o Futuro — 1985)
      </p>

      <!-- Search Form -->
      <CepSearchForm
        :input="cepState.input.value"
        :loading="cepState.loading.value"
        @update:input="cepState.setInput"
        @search="handleSearch"
      />

      <!-- Loading Indicator -->
      <CepLoadingIndicator :loading="cepState.loading.value" />

      <!-- Error Display -->
      <CepErrorDisplay :error="cepState.error.value" />

      <!-- Results Display -->
      <CepResultsDisplay :result="cepState.result.value" />

      <!-- Empty State -->
      <div v-if="!cepState.loading.value && !cepState.error.value && !cepState.result.value" class="text-center p-8 opacity-70">
        <p style="color: #ffcc00;">⏰ Digite um CEP e clique em "Pesquisar" para começar...</p>
        <p style="color: #cccccc;" class="text-sm mt-2">Exemplo: 01001000 (Praça da Sé, São Paulo)</p>
      </div>
    </BaseCard>
  </main>
</template>

<script setup lang="ts">
import { useThemeClasses } from '~/composables/useThemeClasses'
import { useCepState } from '~/composables/useCepState'
import { useCepValidation } from '~/composables/useCepValidation'
import { API_CONFIG, CEP_CONFIG } from '~/utils/constants'
import BaseCard from '~/components/base/BaseCard.vue'
import CepSearchForm from '~/components/features/CepSearchForm.vue'
import CepResultsDisplay from '~/components/features/CepResultsDisplay.vue'
import CepErrorDisplay from '~/components/features/CepErrorDisplay.vue'
import CepLoadingIndicator from '~/components/features/CepLoadingIndicator.vue'

definePageMeta({
  title: 'Localizador de CEP — De Volta para o Futuro'
})

const theme = useThemeClasses()
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
