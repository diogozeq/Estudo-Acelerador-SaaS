import { ref } from 'vue'
import type { CepResult, CepResponse } from '../types/cep'

const API_BASE_URL = 'https://viacep.com.br/ws'

export const useCep = () => {
  const data = ref<CepResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const validateCepFormat = (cep: string): boolean => {
    const cleanCep = cep.replace(/\D/g, '')
    return cleanCep.length === 8
  }

  const isCepNotFound = (result: CepResult): boolean => {
    return result !== null && 'erro' in result && result.erro === true
  }

  const fetchCep = async (cep: string): Promise<void> => {
    error.value = null
    data.value = null

    if (!validateCepFormat(cep)) {
      error.value = 'CEP deve conter exatamente 8 dígitos'
      return
    }

    loading.value = true

    try {
      const cleanCep = cep.replace(/\D/g, '')
      const response = await fetch(`${API_BASE_URL}/${cleanCep}/json/`)

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`)
      }

      const result: CepResult = await response.json()

      if (isCepNotFound(result)) {
        error.value = 'CEP não encontrado'
        return
      }

      data.value = result as CepResponse
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao buscar CEP'
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchCep }
}
