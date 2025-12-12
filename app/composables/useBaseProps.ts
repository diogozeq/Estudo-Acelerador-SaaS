/**
 * Common props shared across base components
 * Centralizes prop definitions to follow DRY principle
 * Ensures consistent prop interface across all components
 */

export const useBaseProps = () => {
  return {
    extraClass: { type: String, default: '' },
    variant: { type: String, default: 'primary' }
  }
}
