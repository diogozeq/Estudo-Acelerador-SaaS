/**
 * CEP search state management
 * Centralizes all CEP-related state with immutable updates
 * Follows state management guidelines: explicit, reactive, discrete, testable
 */

import { reactive, computed } from 'vue'
import type { CepResponse } from '~/types/cep'

interface CepState {
  input: string
  result: CepResponse | null
  loading: boolean
  error: string | null
}

export const useCepState = () => {
  const state = reactive<CepState>({
    input: '',
    result: null,
    loading: false,
    error: null
  })

  /**
   * Set input value (immutable update)
   */
  const setInput = (value: string) => {
    state.input = value
  }

  /**
   * Set result (immutable update - creates new reference)
   */
  const setResult = (result: CepResponse | null) => {
    state.result = result ? { ...result } : null
  }

  /**
   * Set loading state
   */
  const setLoading = (loading: boolean) => {
    state.loading = loading
  }

  /**
   * Set error message
   */
  const setError = (error: string | null) => {
    state.error = error
  }

  /**
   * Reset all state to initial values
   */
  const reset = () => {
    state.input = ''
    state.result = null
    state.loading = false
    state.error = null
  }

  /**
   * Clear result and error (keep input)
   */
  const clearResults = () => {
    state.result = null
    state.error = null
  }

  return {
    // State
    input: computed(() => state.input),
    result: computed(() => state.result),
    loading: computed(() => state.loading),
    error: computed(() => state.error),

    // Methods
    setInput,
    setResult,
    setLoading,
    setError,
    reset,
    clearResults
  }
}
