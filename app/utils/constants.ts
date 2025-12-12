/**
 * Global constants and configuration
 * Centralizes all configuration values to follow DRY principle
 */

export const API_CONFIG = {
  VIACEP_BASE_URL: 'https://viacep.com.br/ws',
  VIACEP_FORMAT: 'json'
}

export const CEP_CONFIG = {
  VALID_LENGTH: 8,
  ERROR_MESSAGES: {
    INVALID_FORMAT: 'CEP deve conter exatamente 8 dígitos',
    NOT_FOUND: 'CEP não encontrado',
    API_ERROR: 'Erro ao conectar com a API',
    NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.'
  }
}

export const UI_CONFIG = {
  LOADING_DELAY_MS: 300,
  ANIMATION_DURATION_MS: 200
}
