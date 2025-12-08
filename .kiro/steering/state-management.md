# State Management - Discreto, Reativo e Previsível

## Conceito Principal

Utilize padrões de gerenciamento de estado **explícitos e desacoplados**, garantindo que o estado seja:
- **Previsível**: Mudanças são rastreáveis e compreensíveis
- **Reativo**: Componentes reagem automaticamente a mudanças
- **Discreto**: Cada parte do estado tem responsabilidade clara
- **Testável**: Fácil de testar em isolamento

## Características Obrigatórias

### 1. Estado Explícito e Desacoplado

Nunca mutile o estado de objetos/estruturas de dados de forma não controlada. Use padrões explícitos:

```typescript
// ❌ ERRADO - Mutação não controlada
const user = { name: 'John', age: 30 }
user.age = 31 // Mutação direta, difícil de rastrear
user.name = 'Jane' // Onde isso foi mudado?

// ✅ CORRETO - Mutação controlada (Vue)
const user = ref({ name: 'John', age: 30 })
const updateUser = (updates) => {
  user.value = { ...user.value, ...updates }
}
updateUser({ age: 31 })

// ✅ CORRETO - Mutação controlada (React)
const [user, setUser] = useState({ name: 'John', age: 30 })
const updateUser = (updates) => {
  setUser(prev => ({ ...prev, ...updates }))
}
```

### 2. Hooks/Composables para Lógica de Estado

Encapsule lógica de estado em composables/hooks reutilizáveis:

```typescript
// ✅ CORRETO - Composable Vue
export const useUserState = () => {
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchUser = async (id) => {
    loading.value = true
    try {
      user.value = await userService.getUser(id)
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  return { user, loading, error, fetchUser }
}

// Usar em componentes
const { user, loading, error, fetchUser } = useUserState()
```

### 3. Contextos/Stores para Estado Compartilhado

Para estado compartilhado entre múltiplos componentes, use contextos ou stores:

```typescript
// ✅ CORRETO - Vue com Pinia
export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = computed(() => !!user.value)

  const login = async (email, password) => {
    user.value = await authService.login(email, password)
  }

  const logout = () => {
    user.value = null
  }

  return { user, isAuthenticated, login, logout }
})

// Usar em componentes
const auth = useAuthStore()
auth.login(email, password)

// ✅ CORRETO - React com Context
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const isAuthenticated = !!user

  const login = async (email, password) => {
    setUser(await authService.login(email, password))
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  )
}
```

### 4. Evitar Estado Global Desnecessário

Mantenha estado o mais local possível. Suba apenas quando necessário:

```typescript
// ❌ ERRADO - Estado global desnecessário
const globalState = {
  formInput: '', // Deveria ser local do componente
  isFormValid: false, // Deveria ser local do componente
  currentUser: null // Isso sim deveria ser global
}

// ✅ CORRETO - Estado no nível apropriado
// Componente local
const FormComponent = () => {
  const input = ref('')
  const isValid = computed(() => input.value.length > 0)
  return { input, isValid }
}

// Estado global (Pinia/Context)
const useAuthStore = defineStore('auth', () => {
  const currentUser = ref(null)
  return { currentUser }
})
```

### 5. Imutabilidade e Previsibilidade

Sempre crie novas referências ao atualizar estado, nunca mutile diretamente:

```typescript
// ❌ ERRADO - Mutação direta
const users = ref([{ id: 1, name: 'John' }])
users.value[0].name = 'Jane' // Mutação direta

// ✅ CORRETO - Imutabilidade
const users = ref([{ id: 1, name: 'John' }])
const updateUser = (id, updates) => {
  users.value = users.value.map(u =>
    u.id === id ? { ...u, ...updates } : u
  )
}
updateUser(1, { name: 'Jane' })

// ✅ CORRETO - Com estruturas de dados
const userMap = ref(new Map([[1, { id: 1, name: 'John' }]]))
const updateUser = (id, updates) => {
  const newMap = new Map(userMap.value)
  newMap.set(id, { ...newMap.get(id), ...updates })
  userMap.value = newMap
}
```

## Padrões Proibidos

### ❌ Mutação Não Controlada

```typescript
// PROIBIDO - Mutação direta sem rastreamento
const state = { count: 0 }
state.count++ // Onde isso foi mudado? Impossível debugar
```

### ❌ Estado Global Excessivo

```typescript
// PROIBIDO - Tudo em estado global
const globalState = {
  formInput: '',
  isHovering: false,
  dropdownOpen: false,
  // ... 50 outras coisas
}
```

### ❌ Lógica de Estado Espalhada

```typescript
// PROIBIDO - Lógica de estado em múltiplos componentes
const Component1 = () => {
  const user = ref(null)
  const fetchUser = async () => { /* ... */ }
}

const Component2 = () => {
  const user = ref(null)
  const fetchUser = async () => { /* ... */ } // Duplicado!
}
```

## Padrões Obrigatórios

### ✅ Estado Centralizado e Reutilizável

```typescript
// Composable reutilizável
export const useUserState = () => {
  const user = ref(null)
  const fetchUser = async (id) => { /* ... */ }
  return { user, fetchUser }
}

// Usar em múltiplos componentes
const Component1 = () => {
  const { user, fetchUser } = useUserState()
}

const Component2 = () => {
  const { user, fetchUser } = useUserState()
}
```

### ✅ Imutabilidade Garantida

```typescript
// Sempre criar novas referências
const addUser = (newUser) => {
  users.value = [...users.value, newUser]
}

const removeUser = (id) => {
  users.value = users.value.filter(u => u.id !== id)
}
```

### ✅ Debugging Fácil

```typescript
// Estado previsível e rastreável
const updateUser = (id, updates) => {
  console.log('Updating user:', id, updates) // Fácil de debugar
  users.value = users.value.map(u =>
    u.id === id ? { ...u, ...updates } : u
  )
}
```

## Checklist de State Management

Antes de criar ou modificar estado:

- [ ] O estado é explícito e controlado?
- [ ] Há mutações não controladas?
- [ ] A lógica de estado está encapsulada em composables/hooks?
- [ ] Estado compartilhado está em contextos/stores?
- [ ] Estado local está no nível mais baixo possível?
- [ ] Mudanças de estado são rastreáveis?
- [ ] Há duplicação de lógica de estado?
- [ ] O estado é imutável (novas referências)?

## Relação com Outras Regras

- **DRY** (`dry-principle.md`): Lógica de estado deve estar em um único lugar
- **Extreme Componentization** (`extreme-componentization.md`): Cada componente tem responsabilidade clara sobre seu estado
- **Code Efficiency** (`code-efficiency.md`): Evitar re-renderizações desnecessárias com estado bem gerenciado

## Exemplo Completo

```typescript
// ❌ ANTES - Estado espalhado e não controlado
const UserList = () => {
  const users = ref([])
  const selectedUser = ref(null)
  const isLoading = ref(false)

  const fetchUsers = async () => {
    isLoading.value = true
    users.value = await api.getUsers()
    isLoading.value = false
  }

  const selectUser = (user) => {
    selectedUser.value = user
  }

  return { users, selectedUser, isLoading, fetchUsers, selectUser }
}

// ✅ DEPOIS - Estado centralizado e controlado
// composables/useUserList.ts
export const useUserList = () => {
  const users = ref([])
  const selectedUser = ref(null)
  const isLoading = ref(false)

  const fetchUsers = async () => {
    isLoading.value = true
    try {
      users.value = await api.getUsers()
    } finally {
      isLoading.value = false
    }
  }

  const selectUser = (user) => {
    selectedUser.value = { ...user } // Imutável
  }

  return { users, selectedUser, isLoading, fetchUsers, selectUser }
}

// components/UserList.vue
const { users, selectedUser, isLoading, fetchUsers, selectUser } = useUserList()
```
