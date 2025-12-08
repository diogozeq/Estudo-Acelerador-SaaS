# Componentização Extrema - Padrão Ouro de Arquitetura

## Conceito Principal

Componentização extrema leva a modularidade ao nível máximo, criando sistemas a partir de blocos de construção independentes, reutilizáveis e com interfaces bem definidas. Um componente é uma unidade de software independente que pode ser desenvolvida, testada, implantada e mantida isoladamente.

## Características Obrigatórias

### 1. Encapsulamento Forte

- O componente esconde detalhes internos
- Expõe apenas uma interface pública clara e bem definida
- Outras partes do sistema não devem conhecer a implementação interna

```typescript
// ❌ ERRADO - Expõe detalhes internos
export const userService = {
  _cache: {},
  _validateEmail: (email) => {},
  _fetchFromDB: (id) => {},
  getUser: (id) => {}
}

// ✅ CORRETO - Interface clara e encapsulada
export const useUserService = () => {
  const getUser = async (id: string) => { /* implementação */ }
  const updateUser = async (id: string, data: object) => { /* implementação */ }
  
  return { getUser, updateUser }
}
```

### 2. Independência

- Um componente pode ser trocado por outro desde que respeite o mesmo contrato
- Atualizações não quebram o sistema inteiro
- Defina interfaces/tipos claros

```typescript
// ✅ CORRETO - Contrato bem definido
interface IAuthProvider {
  login(email: string, password: string): Promise<User>
  logout(): Promise<void>
  getCurrentUser(): User | null
}

// Qualquer implementação que respeite IAuthProvider pode ser usada
class LocalAuthProvider implements IAuthProvider { }
class OAuthProvider implements IAuthProvider { }
```

### 3. Reutilização em Larga Escala

- Componentes genéricos o suficiente para múltiplos contextos
- Evite componentes muito específicos
- Crie abstrações que funcionem em diferentes cenários

```typescript
// ❌ ERRADO - Muito específico
const UserProfileCard = () => { /* só funciona para usuários */ }
const ProductCard = () => { /* só funciona para produtos */ }

// ✅ CORRETO - Genérico e reutilizável
const Card = ({ title, description, actions }) => { /* funciona para tudo */ }
```

### 4. Plug-and-Play

- Montar software complexo conectando componentes
- Como peças de Lego
- Composição sobre herança

```typescript
// ✅ CORRETO - Composição de componentes
const App = () => (
  <Layout>
    <Header />
    <Navigation />
    <MainContent>
      <Card title="Users">
        <UserList />
      </Card>
    </MainContent>
    <Footer />
  </Layout>
)
```

## Benefícios Garantidos

| Benefício | Aplicação |
|-----------|-----------|
| **Manutenção Simplificada** | Problema em um componente = corrigir apenas ele |
| **Desenvolvimento Paralelo** | Equipes trabalham em componentes diferentes simultaneamente |
| **Testabilidade** | Componentes independentes = testes isolados e confiáveis |
| **Escalabilidade** | Componentes podem ser escalados independentemente |

## Estrutura de Projeto Obrigatória

```
src/
├── components/
│   ├── base/              ← Componentes primitivos (Button, Input, Card)
│   ├── layout/            ← Componentes de layout (Header, Footer, Sidebar)
│   ├── features/          ← Componentes de features (UserList, ProductGrid)
│   └── README.md          ← Documentação de cada componente
├── composables/           ← Lógica reutilizável (Vue) / Hooks (React)
├── services/              ← Serviços de negócio (Auth, API, Storage)
├── utils/                 ← Funções utilitárias puras
├── types/                 ← Interfaces e tipos compartilhados
└── constants/             ← Constantes globais
```

## Regras Específicas para Vue

### Reutilização de Estilos Tailwind

Nunca duplicar strings de classes. Centralize em `composables/useThemeClasses.ts`:

```typescript
export const useThemeClasses = () => {
  const baseInputClasses = 'flex-1 px-4 py-3 rounded-lg font-mono text-lg bg-white/5 border-2 border-orange-500 text-yellow-50 placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-orange-400'
  const baseButtonClasses = 'px-6 py-3 font-bold rounded-lg transition-all duration-200 bg-orange-500 text-black disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105'
  
  return { baseInputClasses, baseButtonClasses }
}
```

### Props Comuns

Centralize em `composables/useBaseProps.ts`:

```typescript
export const useBaseProps = () => {
  return {
    extraClass: { type: String, default: '' }
  }
}
```

Use em componentes:

```vue
<script setup lang="ts">
import { useBaseProps } from '~/composable/useBaseProps'
import { useThemeClasses } from '~/composable/useThemeClasses'

const { baseInputClasses } = useThemeClasses()

defineProps({
  modelValue: { type: String, default: '' },
  ...useBaseProps()
})
</script>

<template>
  <input :class="[baseInputClasses, extraClass]" :value="modelValue" />
</template>
```

### Checklist para Vue

- [ ] Classes Tailwind duplicadas? → Mova para `useThemeClasses`
- [ ] Props duplicadas? → Mova para `useBaseProps`
- [ ] Lógica de validação repetida? → Crie um composable específico
- [ ] Formatação de dados repetida? → Crie função em `utils/`

## Política de Responsabilidade Única por Arquivo

Cada arquivo, módulo ou componente deve ter **uma única responsabilidade claramente definida**:

- **Componentes**: Apenas renderização e interação com o usuário
- **Composables/Hooks**: Apenas lógica reutilizável
- **Services**: Apenas comunicação com APIs ou dados externos
- **Utils**: Apenas funções puras e utilitárias
- **Types**: Apenas definições de tipos e interfaces
- **Constants**: Apenas valores constantes

```typescript
// ❌ ERRADO - Arquivo monolítico
const UserProfile = () => {
  // Lógica de negócios
  // Chamadas de API
  // Formatação de dados
  // Renderização
  // Gerenciamento de estado
}

// ✅ CORRETO - Separação de responsabilidades
// services/userService.ts - Apenas API
export const fetchUser = (id) => api.get(`/users/${id}`)

// utils/userFormatter.ts - Apenas formatação
export const formatUser = (user) => ({ ...user, fullName: `${user.firstName} ${user.lastName}` })

// composables/useUserProfile.ts - Apenas lógica
export const useUserProfile = (userId) => { /* lógica */ }

// components/UserProfile.vue - Apenas renderização
export default { /* renderização */ }
```

## Checklist de Componentização

Antes de criar qualquer novo componente ou função:

- [ ] **Encapsulamento**: Expõe apenas o necessário? Detalhes internos estão escondidos?
- [ ] **Independência**: Pode ser testado isoladamente? Tem dependências mínimas?
- [ ] **Reutilização**: Pode ser usado em múltiplos contextos? É genérico o suficiente?
- [ ] **Interface Clara**: A interface é óbvia? Está bem documentada?
- [ ] **Responsabilidade Única**: Faz uma coisa e faz bem? Não mistura responsabilidades?
- [ ] **Sem Efeitos Colaterais**: Não modifica estado global desnecessariamente?
- [ ] **Arquivo Focado**: Este arquivo tem apenas uma responsabilidade?

## Padrões Proibidos

### ❌ Componentes Monolíticos

```typescript
// PROIBIDO - Tudo em um lugar
const UserManagement = () => {
  // Autenticação
  // Validação
  // API calls
  // UI rendering
  // Formatação de dados
  // Caching
}
```

### ❌ Acoplamento Forte

```typescript
// PROIBIDO - Dependências hardcoded
const UserCard = () => {
  const user = fetchUserFromSpecificAPI()
  return <div>{user.name}</div>
}
```

### ❌ Props Drilling Excessivo

```typescript
// PROIBIDO - Passar props através de múltiplos níveis
<GrandParent user={user} />
  <Parent user={user} />
    <Child user={user} />
      <GrandChild user={user} />
```

## Padrões Obrigatórios

### ✅ Componentes Focados

```typescript
// CORRETO - Cada componente tem responsabilidade única
const UserCard = ({ user, onEdit, onDelete }) => { /* apenas renderização */ }
const useUserData = () => { /* apenas lógica de dados */ }
const formatUserName = (user) => { /* apenas formatação */ }
```

### ✅ Injeção de Dependências

```typescript
// CORRETO - Dependências injetadas
const UserCard = ({ user, userService, onEdit }) => {
  return <div>{user.name}</div>
}
```

### ✅ Context/Composables para Estado Compartilhado

```typescript
// CORRETO - Estado centralizado
const useUserContext = () => useContext(UserContext)
const useAuthStore = () => useStore('auth')
```

## Relação com Outras Regras

- **DRY** (`dry-principle.md`): Componentização extrema é a aplicação avançada de DRY em larga escala
- **Code Efficiency** (`code-efficiency.md`): Componentes devem ser concisos e otimizados

Juntos, garantem que:
- Não há duplicação de código, lógica ou conhecimento
- Mudanças afetam apenas um lugar
- Reutilização é maximizada
- Código é eficiente e legível

## Aplicação Imediata

Ao sugerir ou criar código:

1. **Identifique responsabilidades**: O que este componente/função faz?
2. **Separe responsabilidades**: Cada coisa em seu próprio componente
3. **Defina interfaces claras**: Como outros usam isso?
4. **Minimize dependências**: Injete o que for necessário
5. **Maximize reutilização**: Pode ser usado em múltiplos contextos?
6. **Documente contratos**: Deixe claro o que espera e o que retorna

## Exemplo Completo

```typescript
// ❌ ANTES - Monolítico e acoplado
const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
    fetch(`/api/users/${userId}`)
      .then(r => r.json())
      .then(data => {
        setUser({
          ...data,
          fullName: `${data.firstName} ${data.lastName}`,
          initials: `${data.firstName[0]}${data.lastName[0]}`
        })
        setLoading(false)
      })
  }, [userId])
  
  return (
    <div className="profile">
      {loading ? <Spinner /> : (
        <div>
          <h1>{user.fullName}</h1>
          <p>{user.email}</p>
          <button onClick={() => updateUser(user)}>Editar</button>
        </div>
      )}
    </div>
  )
}

// ✅ DEPOIS - Componentizado e desacoplado
// 1. Composable para lógica de dados
const useUserProfile = (userId: string) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
    userService.getUser(userId)
      .then(setUser)
      .finally(() => setLoading(false))
  }, [userId])
  
  return { user, loading }
}

// 2. Utilitário para formatação
const formatUserName = (user: User) => ({
  fullName: `${user.firstName} ${user.lastName}`,
  initials: `${user.firstName[0]}${user.lastName[0]}`
})

// 3. Componente de apresentação
const UserProfileCard = ({ user, onEdit }) => (
  <div className="profile">
    <h1>{user.fullName}</h1>
    <p>{user.email}</p>
    <button onClick={() => onEdit(user)}>Editar</button>
  </div>
)

// 4. Componente container que orquestra
const UserProfile = ({ userId, userService, onEdit }) => {
  const { user: rawUser, loading } = useUserProfile(userId)
  const user = rawUser ? formatUserName(rawUser) : null
  
  return loading ? <Spinner /> : <UserProfileCard user={user} onEdit={onEdit} />
}
```

## Conclusão

Componentização extrema não é apenas sobre código limpo — é sobre criar sistemas que:
- São fáceis de manter
- Podem crescer sem se tornarem caóticos
- Permitem que equipes trabalhem independentemente
- São testáveis e confiáveis
- Podem ser reutilizados em múltiplos contextos

**Aplique este padrão em TODOS os projetos.**
