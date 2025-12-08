# Princípio DRY - Don't Repeat Yourself

## Conceito Principal

Cada pedaço de **conhecimento** deve ter uma única, inequívoca e autoritária representação dentro de um sistema. Em vez de escrever a mesma informação ou lógica várias vezes, abstraia para um único local e reutilize sempre que necessário.

**Nota**: Este arquivo foca em DRY como princípio de reutilização de conhecimento. Para arquitetura de componentes, veja `extreme-componentization.md`. Para concisão de código, veja `code-efficiency.md`.

## Benefícios

- **Manutenção mais fácil**: Alterações em lógica de negócios acontecem em um único lugar, evitando inconsistências
- **Menos bugs**: Uma "fonte da verdade" reduz erros ao modificar lógica repetida
- **Maior reusabilidade**: Promove componentes, funções e classes reutilizáveis

## Aplicação Prática

- **Funções e métodos**: Encapsule lógicas comuns em funções reutilizáveis
- **Classes e herança**: Use herança para compartilhar funcionalidades comuns
- **Composables/Hooks**: Em frameworks modernos, use composables ou hooks para lógica compartilhada
- **Bibliotecas e pacotes**: Agrupe funcionalidades compartilhadas em bibliotecas reutilizáveis
- **Constantes centralizadas**: Valores, strings, configurações em um único lugar

## Advertência Importante

DRY não significa simplesmente "não copiar e colar código". Códigos visualmente idênticos podem representar conhecimentos ou lógicas de negócios diferentes que evoluem de formas distintas. Nesses casos, a duplicação pode ser aceitável.

**O foco deve ser na duplicação de conhecimento ou lógica de negócios, não apenas de texto.**

## Centralizar Configurações de Performance e Consistência

Use configurações globais, variáveis de ambiente ou arquivos de constantes para gerenciamento uniforme:

```typescript
// ❌ ERRADO - Valores espalhados
const UserList = () => {
  const ITEMS_PER_PAGE = 10
  const CACHE_TIME = 5000
  const MAX_RETRIES = 3
}

const UserSearch = () => {
  const ITEMS_PER_PAGE = 10 // Duplicado!
  const CACHE_TIME = 5000   // Duplicado!
}

// ✅ CORRETO - Centralizado
// constants/config.ts
export const CONFIG = {
  PAGINATION: { ITEMS_PER_PAGE: 10 },
  CACHE: { TIME_MS: 5000 },
  API: { MAX_RETRIES: 3 }
}

// Usar em qualquer lugar
import { CONFIG } from '~/constants/config'
const itemsPerPage = CONFIG.PAGINATION.ITEMS_PER_PAGE
```

Garantir que mudanças afetem toda a base de forma consistente, evitando inconsistências.

## Checklist DRY

Ao revisar ou sugerir código, sempre considere:
- [ ] Existe lógica repetida que pode ser abstraída?
- [ ] Há componentes ou funções que poderiam ser reutilizados?
- [ ] A mudança em um lugar afetaria múltiplos arquivos?
- [ ] Há uma "fonte da verdade" clara para cada conceito?
- [ ] Constantes/configurações estão centralizadas?
- [ ] Valores mágicos estão em constantes nomeadas?
