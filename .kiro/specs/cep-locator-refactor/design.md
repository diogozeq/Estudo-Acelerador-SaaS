# Design Document - CEP Locator Refactor

## Overview

The CEP Locator application is being refactored to follow strict architectural guidelines:
- **State Management**: Centralized, predictable, immutable updates
- **Componentization**: Extreme modularity with single responsibility
- **DRY**: Centralized theme classes, props, and configuration
- **Efficiency**: Concise code, computed properties, lazy loading

The application maintains its "Back to the Future" theme while providing a robust CEP lookup interface powered by the ViaCEP API.

## Architecture

```
app/
├── composables/
│   ├── useThemeClasses.ts       ← Centralized Tailwind classes
│   ├── useBaseProps.ts          ← Common component props
│   ├── useCepState.ts           ← CEP search state management
│   ├── useCepValidation.ts      ← CEP validation logic
│   └── useAppState.ts           ← Global app state (DeLorean)
├── components/
│   ├── base/
│   │   ├── BaseButton.vue       ← Generic button component
│   │   ├── BaseInput.vue        ← Generic input component
│   │   └── BaseCard.vue         ← Generic card component
│   ├── layout/
│   │   ├── AppHeader.vue        ← App header
│   │   └── AppFooter.vue        ← App footer
│   ├── features/
│   │   ├── CepSearchForm.vue    ← CEP search form
│   │   ├── CepResultsDisplay.vue ← Results display
│   │   └── CepErrorDisplay.vue  ← Error display
│   └── DeLorean/
│       └── DeLoreanDashboard.vue ← DeLorean dashboard
├── utils/
│   ├── cepFormatter.ts          ← CEP formatting utilities
│   └── constants.ts             ← Global constants
├── types/
│   └── cep.ts                   ← CEP types
└── pages/
    ├── index.vue                ← Home page
    ├── cep.vue                  ← CEP lookup page
    └── delorean.vue             ← DeLorean dashboard page
```

## Components and Interfaces

### Base Components

**BaseButton.vue**
- Props: `label`, `type`, `disabled`, `variant` (primary, secondary, danger)
- Emits: `click`
- Uses: `useThemeClasses`, `useBaseProps`

**BaseInput.vue**
- Props: `modelValue`, `type`, `placeholder`, `maxlength`, `variant`
- Emits: `update:modelValue`
- Uses: `useThemeClasses`, `useBaseProps`

**BaseCard.vue**
- Props: `title`, `variant` (default, highlight)
- Slots: default
- Uses: `useThemeClasses`

### Feature Components

**CepSearchForm.vue**
- Props: `loading`
- Emits: `search`
- Uses: `useCepState`, `useCepValidation`, `useThemeClasses`

**CepResultsDisplay.vue**
- Props: `result`
- Uses: `useThemeClasses`

**CepErrorDisplay.vue**
- Props: `error`
- Uses: `useThemeClasses`

### Composables

**useThemeClasses()**
- Returns: Object with centralized Tailwind class strings
- Variants: primary, secondary, danger, highlight
- Ensures: No class duplication across components

**useBaseProps()**
- Returns: Common props object (extraClass, variant)
- Ensures: Consistent prop interface across components

**useCepState()**
- State: `input`, `result`, `loading`, `error`
- Methods: `setInput()`, `setResult()`, `setLoading()`, `setError()`, `reset()`
- Ensures: Immutable state updates

**useCepValidation()**
- Methods: `validateFormat()`, `isCepNotFound()`
- Ensures: Centralized validation logic

**useAppState()**
- State: DeLorean dashboard state
- Methods: `startTrip()`, etc.
- Ensures: Global state management

## Data Models

```typescript
// CEP Response
interface CepResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  estado: string
  regiao: string
  ibge: string
  ddd: string
  siafi: string
}

// CEP Error
interface CepError {
  erro: boolean
}

// CEP State
interface CepState {
  input: string
  result: CepResponse | null
  loading: boolean
  error: string | null
}
```

## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: State Immutability
*For any* state update operation, the original state object should not be mutated; instead, a new reference should be created.
**Validates: Requirements 1.2**

Reasoning: State management requires immutability to ensure predictability and debuggability. When updating state, we must create new references rather than mutating existing objects. This property verifies that all state updates follow this pattern.

### Property 2: CEP Format Validation
*For any* input string, if it contains exactly 8 digits (after removing non-digits), validation should succeed; otherwise, it should fail.
**Validates: Requirements 5.1**

Reasoning: CEP validation is a critical business rule. The system must accept only strings with exactly 8 digits. This property ensures the validation logic works correctly across all possible inputs.

### Property 3: Component Variant Flexibility
*For any* base component (Button, Input, Card) with variant props, it should render correctly in multiple contexts without modification.
**Validates: Requirements 2.4**

Reasoning: Base components must be generic and reusable. By accepting variant props, they should adapt to different use cases. This property verifies that components work across multiple contexts.

### Property 4: API Error Response Handling
*For any* API response with `erro: true`, the system should display an error message and not display results.
**Validates: Requirements 5.4**

Reasoning: Error handling is critical for user experience. When the API returns an error, the system must handle it gracefully by showing an error message and preventing result display.

### Property 5: Loading State Transitions
*For any* API request, the loading state should be true during the request and false after completion (success or error).
**Validates: Requirements 5.5**

Reasoning: Loading state management ensures the UI provides proper feedback to users. The loading indicator must be shown during requests and hidden after completion, regardless of success or failure.

### Property 6: API Data Completeness
*For any* successful API response, all address fields from the response should be available for display in the results component.
**Validates: Requirements 5.3**

Reasoning: The system must display all data returned by the API. This property ensures that no fields are lost during data processing or display.

## Error Handling

- **Invalid CEP Format**: Display user-friendly message "CEP deve conter exatamente 8 dígitos"
- **API Errors**: Display "CEP não encontrado" or generic API error message
- **Network Errors**: Display "Erro ao conectar com a API"
- **Loading State**: Show loading indicator during API request
- **Empty State**: Show helpful message when no search has been performed

## Testing Strategy

### Unit Tests
- Validate CEP format validation logic
- Test state immutability in composables
- Test component prop validation
- Test error message display

### Property-Based Tests
- Property 1: State immutability across all update operations
- Property 2: CEP validation with various input formats
- Property 3: API error response handling
- Property 4: Loading state transitions
- Property 5: Theme class consistency
- Property 6: Component variant flexibility

**Testing Framework**: Vitest with fast-check for property-based testing
**Minimum Iterations**: 100 per property test
