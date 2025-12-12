/**
 * CEP formatting utilities
 * Provides functions for formatting and parsing CEP values
 */

/**
 * Format CEP string to standard format (XXXXX-XXX)
 */
export const formatCepDisplay = (cep: string): string => {
  const clean = cep.replace(/\D/g, '')
  if (clean.length !== 8) return cep
  return `${clean.slice(0, 5)}-${clean.slice(5)}`
}

/**
 * Remove all non-digit characters from CEP
 */
export const cleanCep = (cep: string): string => {
  return cep.replace(/\D/g, '')
}

/**
 * Check if CEP string is valid (8 digits)
 */
export const isValidCep = (cep: string): boolean => {
  return cleanCep(cep).length === 8
}
