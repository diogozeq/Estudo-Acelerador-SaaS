# Implementation Plan - CEP Locator Refactor

## Overview

This implementation plan converts the CEP Locator design into actionable coding tasks. Each task builds incrementally on previous tasks, ensuring no orphaned code. The plan focuses on refactoring the existing application to follow strict architectural guidelines while maintaining all functionality.

---

## Phase 1: Foundation - Composables and Utilities

- [x] 1. Create centralized theme classes composable


  - Create `app/composables/useThemeClasses.ts`
  - Define all Tailwind class variants (primary, secondary, danger, highlight)
  - Export button, input, card, and layout classes
  - _Requirements: 3.1, 6.2_



- [x] 1.1 Write property test for theme class consistency


  - **Property 5: Theme Class Centralization**
  - **Validates: Requirements 3.1, 6.2**

- [x] 2. Create base props composable


  - Create `app/composables/useBaseProps.ts`
  - Define common props (extraClass, variant)
  - Export as reusable props object
  - _Requirements: 3.2_



- [x] 3. Create CEP validation composable


  - Create `app/composables/useCepValidation.ts`
  - Implement `validateFormat()` function
  - Implement `isCepNotFound()` function
  - _Requirements: 5.1_



- [x] 3.1 Write property test for CEP format validation


  - **Property 2: CEP Format Validation**
  - **Validates: Requirements 5.1**



- [ ] 4. Create CEP state composable
  - Create `app/composables/useCepState.ts`
  - Define reactive state (input, result, loading, error)
  - Implement immutable state update methods
  - _Requirements: 1.2, 5.2, 5.3, 5.4, 5.5_



- [ ] 4.1 Write property test for state immutability
  - **Property 1: State Immutability**
  - **Validates: Requirements 1.2**

- [x] 5. Create constants and utilities


  - Create `app/utils/constants.ts` with API configuration


  - Create `app/utils/cepFormatter.ts` with formatting utilities
  - _Requirements: 3.4_

- [ ] 6. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.



---

## Phase 2: Base Components



- [ ] 7. Refactor BaseButton component
  - Update `app/components/base/BaseButton.vue`
  - Use `useThemeClasses()` for all classes
  - Use `useBaseProps()` for common props
  - Support variant prop (primary, secondary, danger)


  - _Requirements: 2.2, 2.3, 2.4_

- [ ] 7.1 Write property test for button variant flexibility
  - **Property 3: Component Variant Flexibility**
  - **Validates: Requirements 2.4**



- [ ] 8. Refactor BaseInput component
  - Update `app/components/base/BaseInput.vue`
  - Use `useThemeClasses()` for all classes
  - Use `useBaseProps()` for common props
  - Support variant prop
  - _Requirements: 2.2, 2.3, 2.4_





- [ ] 9. Create BaseCard component
  - Create `app/components/base/BaseCard.vue`
  - Use `useThemeClasses()` for all classes
  - Support title prop and variant prop
  - Provide default slot for content
  - _Requirements: 2.2, 2.3, 2.4_





- [ ] 10. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

---



## Phase 3: Feature Components



- [ ] 11. Create CepSearchForm component
  - Create `app/components/features/CepSearchForm.vue`
  - Use `useCepState()` for state management
  - Use `useCepValidation()` for validation


  - Use `useThemeClasses()` for styling
  - Emit `search` event with CEP value
  - _Requirements: 5.1, 5.2_



- [ ] 12. Create CepResultsDisplay component
  - Create `app/components/features/CepResultsDisplay.vue`
  - Accept `result` prop from parent
  - Display all address fields from API response


  - Use `useThemeClasses()` for styling
  - _Requirements: 5.3_

- [ ] 12.1 Write property test for API data completeness
  - **Property 6: API Data Completeness**


  - **Validates: Requirements 5.3**

- [ ] 13. Create CepErrorDisplay component
  - Create `app/components/features/CepErrorDisplay.vue`
  - Accept `error` prop from parent

  - Display user-friendly error messages
  - Use `useThemeClasses()` for styling

  - _Requirements: 5.4_

- [ ] 13.1 Write property test for error response handling
  - **Property 4: API Error Response Handling**


  - **Validates: Requirements 5.4**

- [ ] 14. Create CepLoadingIndicator component
  - Create `app/components/features/CepLoadingIndicator.vue`
  - Display loading state during API requests


  - Use `useThemeClasses()` for styling
  - _Requirements: 5.5_

- [ ] 14.1 Write property test for loading state transitions
  - **Property 5: Loading State Transitions**


  - **Validates: Requirements 5.5**

- [x] 15. Checkpoint - Ensure all tests pass


  - Ensure all tests pass, ask the user if questions arise.

---



## Phase 4: Layout Components

- [x] 16. Create AppHeader component



  - Create `app/components/layout/AppHeader.vue`
  - Display application title and navigation
  - Use `useThemeClasses()` for styling
  - _Requirements: 6.1, 6.2_

- [ ] 17. Create AppFooter component
  - Create `app/components/layout/AppFooter.vue`
  - Display footer information
  - Use `useThemeClasses()` for styling
  - _Requirements: 6.1, 6.2_

- [ ] 18. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

---

## Phase 5: Page Components

- [ ] 19. Refactor index.vue (Home page)
  - Update `app/pages/index.vue`
  - Use `useThemeClasses()` for all styling
  - Maintain "Back to the Future" theme
  - Use BaseCard and BaseButton components
  - _Requirements: 6.1, 6.2_

- [ ] 20. Refactor cep.vue (CEP Lookup page)
  - Update `app/pages/cep.vue`
  - Use `useCepState()` for state management
  - Use CepSearchForm, CepResultsDisplay, CepErrorDisplay components
  - Use CepLoadingIndicator component
  - Use `useThemeClasses()` for styling
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 21. Refactor DeLorean.vue (Dashboard page)
  - Update `app/pages/DeLorean.vue`
  - Use `useAppState()` for state management
  - Use `useThemeClasses()` for styling
  - Maintain existing functionality
  - _Requirements: 1.2, 6.1, 6.2_

- [ ] 22. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

---

## Phase 6: Integration and Cleanup

- [ ] 23. Remove duplicate composables
  - Delete `app/composable/` directory (old duplicate)
  - Verify all imports point to `app/composables/`
  - _Requirements: 3.1, 3.2_

- [ ] 24. Update app.vue wrapper
  - Ensure `app/app.vue` is minimal and clean
  - Verify NuxtPage component is properly configured
  - _Requirements: 1.1_

- [ ] 25. Final integration test
  - Verify all pages load correctly
  - Test CEP search functionality end-to-end
  - Verify theme consistency across all pages
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 6.1, 6.2_

- [ ] 26. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- All components use `useThemeClasses()` to eliminate class duplication
- All base components use `useBaseProps()` for consistent prop interfaces
- All state management uses immutable updates
- All validation logic is centralized in utility functions
- Property-based tests are marked as optional (*) to focus on core functionality first
- Tests can be added later without blocking feature implementation
