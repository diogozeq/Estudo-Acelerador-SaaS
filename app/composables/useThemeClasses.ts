/**
 * Centralized Tailwind CSS classes for consistent theming
 * Eliminates class duplication across components
 * Follows DRY principle and ensures visual consistency
 */

export const useThemeClasses = () => {
  // Button variants
  const buttonPrimary = 'px-6 py-3 font-bold rounded-lg transition-all duration-200 bg-orange-500 text-black disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95'
  const buttonSecondary = 'px-6 py-3 font-bold rounded-lg transition-all duration-200 bg-cyan-400 text-black disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95'
  const buttonDanger = 'px-6 py-3 font-bold rounded-lg transition-all duration-200 bg-red-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95'

  // Input variants
  const inputPrimary = 'flex-1 px-4 py-3 rounded-lg font-mono text-lg bg-white/5 border-2 border-orange-500 text-yellow-50 placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-orange-400'
  const inputSecondary = 'flex-1 px-4 py-3 rounded-lg font-mono text-lg bg-white/5 border-2 border-cyan-400 text-cyan-50 placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300'

  // Card variants
  const cardDefault = 'bg-[rgba(255,255,255,0.05)] border-2 p-8 rounded-lg shadow-2xl'
  const cardHighlight = 'bg-[rgba(255,102,0,0.1)] border-2 p-4 rounded-lg'

  // Layout classes
  const mainContainer = 'min-h-screen flex items-center justify-center p-8'
  const sectionContainer = 'max-w-2xl w-full'
  const gridLayout = 'grid grid-cols-1 md:grid-cols-2 gap-4'
  const fieldContainer = 'p-3 rounded'

  // Text variants
  const headingLarge = 'text-4xl font-extrabold'
  const headingMedium = 'text-2xl font-bold'
  const headingSmall = 'text-xl font-bold'
  const textBase = 'text-base'
  const textSmall = 'text-sm opacity-80'
  const textMuted = 'text-xs opacity-60'

  // Color utilities
  const colorPrimary = 'text-orange-500'
  const colorSecondary = 'text-cyan-400'
  const colorAccent = 'text-yellow-50'
  const colorError = 'text-red-500'
  const colorSuccess = 'text-green-500'
  const colorWarning = 'text-yellow-500'

  // Background utilities
  const bgDark = 'bg-[rgba(0,0,0,0.2)]'
  const bgError = 'bg-[rgba(255,0,0,0.2)]'
  const bgSuccess = 'bg-[rgba(0,255,0,0.2)]'
  const bgWarning = 'bg-[rgba(255,255,0,0.2)]'

  // Border utilities
  const borderPrimary = 'border-orange-500'
  const borderSecondary = 'border-cyan-400'
  const borderError = 'border-red-500'
  const borderSuccess = 'border-green-500'

  return {
    // Buttons
    buttonPrimary,
    buttonSecondary,
    buttonDanger,

    // Inputs
    inputPrimary,
    inputSecondary,

    // Cards
    cardDefault,
    cardHighlight,

    // Layout
    mainContainer,
    sectionContainer,
    gridLayout,
    fieldContainer,

    // Text
    headingLarge,
    headingMedium,
    headingSmall,
    textBase,
    textSmall,
    textMuted,

    // Colors
    colorPrimary,
    colorSecondary,
    colorAccent,
    colorError,
    colorSuccess,
    colorWarning,

    // Backgrounds
    bgDark,
    bgError,
    bgSuccess,
    bgWarning,

    // Borders
    borderPrimary,
    borderSecondary,
    borderError,
    borderSuccess,
  }
}
