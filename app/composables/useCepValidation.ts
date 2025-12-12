/**
 * CEP validation logic
 * Centralizes all CEP-related validation to follow DRY principle
 * Ensures consistent validation across the application
 */

import type { CepResult } from '~/types/cep'

export const useCepValidation = () => {
  /**
   * Validates CEP format
   * CEP must contain exactly 8 digits
   */
  const validateFormat = (cep: string): boolean => {
    const cleanCep = cep.replace(/\D/g, '')
    return cleanCep.length === 8
  }

  /**
   * Checks if API returned an error
   * ViaCEP returns { erro: true } when CEP is not found
   */
  const isCepNotFound = (result: CepResult): boolean => {
    return result !== null && 'erro' in result && result.erro === true
  }

  return {
    validateFormat,
    isCepNotFound
  }
}
