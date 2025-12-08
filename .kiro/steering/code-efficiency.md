# Code Efficiency - Concisão, Legibilidade e Performance

## Conceito Principal

Escrever código **conciso**, **legível**, **não verboso** e **otimizado**. Priorizar clareza e eficiência em detrimento de abordagens excessivamente complexas ou redundantes (WET - Write Everything Twice).

## Características Obrigatórias

### 1. Concisão e Legibilidade (Não Verboso)

- Eliminar código *boilerplate* desnecessário
- Usar recursos modernos da linguagem para escrever menos e expressar mais
- O código deve ser autoexplicativo sem comentários excessivos

```typescript
// ❌ ERRADO - Verboso, WET
const isValid = (user) => {
  if (user && user.name && user.name.length > 0 && user.age && user.age > 18) {
    return true
  } else {
    return false
  }
}

// ✅ CORRETO - Conciso e claro
const isValid = (user) => user?.name?.length > 0 && user?.age > 18

// Outro Exemplo:
// ❌ ERRADO
const activeUsers = []
for (let i = 0; i < users.length; i++) {
  if (users[i].isActive) {
    activeUsers.push(users[i])
  }
}

// ✅ CORRETO
const activeUsers = users.filter(user => user.isActive)
```

### 2. Otimização e Performance

Priorizar algoritmos eficientes (considerar Complexidade de Tempo O(n) e Espaço O(n)).

```typescript
// ❌ ERRADO - O(n²) - Iteração aninhada desnecessária
const findUser = (users, id) => {
  for (const user of users) {
    for (const u of users) {
      if (u.id === id) return u
    }
  }
}

// ✅ CORRETO - O(n)
const findUser = (users, id) => users.find(user => user.id === id)

// ✅ MELHOR AINDA - O(1) se a estrutura permitir
const userMap = new Map(users.map(u => [u.id, u]))
const user = userMap.get(id)
```

### 3. Evitar Renderizações Desnecessárias (Front-end)

Em frameworks como Vue e React, otimizar re-renderizações:

```typescript
// ❌ ERRADO - Recalcula a cada render
const UserList = ({ users }) => {
  const sorted = users.sort((a, b) => a.name.localeCompare(b.name))
  return <div>{sorted.map(u => <User key={u.id} user={u} />)}</div>
}

// ✅ CORRETO - Memoiza o resultado
const UserList = ({ users }) => {
  const sorted = useMemo(() => 
    users.sort((a, b) => a.name.localeCompare(b.name)),
    [users]
  )
  return <div>{sorted.map(u => <User key={u.id} user={u} />)}</div>
}

// Vue equivalente:
const sorted = computed(() => 
  users.value.sort((a, b) => a.name.localeCompare(b.name))
)
```

### 4. Gerenciamento Eficiente de Memória

- Liberar recursos quando não mais necessários
- Evitar memory leaks em listeners e timers
- Usar estruturas de dados apropriadas

```typescript
// ❌ ERRADO - Memory leak
const useListener = () => {
  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })
}

// ✅ CORRETO - Cleanup
const useListener = () => {
  onMounted(() => {
    window.addEventListener('resize', handleResize)
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })
  })
}
```

## Padrões Proibidos

### ❌ Código Verboso / WET

- Repetição de estruturas de controle ou lógica
- Nomes de variáveis ou funções excessivamente longos sem necessidade
- Comentários que explicam o óbvio

```typescript
// ❌ PROIBIDO
const getUserNameAndEmailAndPhoneNumberAndAddressFromDatabase = (userId) => {
  // Esta função busca o usuário do banco de dados
  const user = db.query(`SELECT * FROM users WHERE id = ${userId}`)
  // Retorna o usuário
  return user
}

// ✅ CORRETO
const getUser = (userId) => db.query(`SELECT * FROM users WHERE id = ${userId}`)
```

### ❌ Otimização Prematura

- Otimizar micro-detalhes sem necessidade real ("Premature optimization is the root of all evil")
- Mas também, não ignorar performance em rotas críticas
- Ignorar estruturas de dados corretas (e.g., usar array para lookups O(n) quando Map faria O(1))

```typescript
// ❌ ERRADO - Otimização prematura
const sum = (arr) => {
  let total = 0
  for (let i = 0; i < arr.length; i++) {
    total += arr[i]
  }
  return total
}

// ✅ CORRETO - Simples e eficiente
const sum = (arr) => arr.reduce((a, b) => a + b, 0)

// ❌ ERRADO - Ignorar performance em rota crítica
const searchUsers = (users, query) => {
  return users.filter(u => u.name.includes(query)) // O(n) para cada busca
}

// ✅ CORRETO - Indexar para buscas frequentes
const userIndex = new Map()
users.forEach(u => userIndex.set(u.name.toLowerCase(), u))
const searchUsers = (query) => userIndex.get(query.toLowerCase()) // O(1)
```

## Lazy Loading e Code Splitting

Carregue componentes, módulos ou dados sob demanda para reduzir o impacto inicial:

```typescript
// ❌ ERRADO - Carrega tudo na inicialização
import HeavyComponent from './HeavyComponent.vue'
import AnotherHeavy from './AnotherHeavy.vue'

// ✅ CORRETO - Lazy loading
const HeavyComponent = defineAsyncComponent(() => 
  import('./HeavyComponent.vue')
)

// React equivalente
const HeavyComponent = lazy(() => import('./HeavyComponent'))

// Dados sob demanda
const loadUserData = async (userId) => {
  const data = await fetchUser(userId) // Carrega quando necessário
  return data
}
```

Otimize o tempo de carregamento da aplicação sem sacrificar a experiência do usuário.

## Priorizar Leitura e Manutenção

Faça revisões regulares para garantir que o código continue autoexplicativo e bem abstraído:

- Evite otimizações prematuras que dificultem a leitura
- Código legível > Código micro-otimizado
- Se a performance é crítica, documente por quê
- Revise regularmente para manter qualidade

## Checklist Rápido

Antes de finalizar o código, pergunte-se:

- [ ] Este código poderia ser mais conciso sem perder clareza?
- [ ] Existe uma função ou método embutido que faria isso de forma mais elegante?
- [ ] A complexidade algorítmica é a melhor possível para a escala de dados?
- [ ] Estou evitando re-renderizações ou re-cálculos desnecessários?
- [ ] Há memory leaks ou recursos não liberados?
- [ ] O código é autoexplicativo ou precisa de comentários?
- [ ] Componentes/módulos pesados estão em lazy loading?
- [ ] A otimização vale a pena em termos de legibilidade?

## Aplicação Imediata

Ao gerar ou revisar código:

1. **Prefira concisão**: Use desestruturação, ternaries, optional chaining (`?.`) e métodos funcionais (`.map()`, `.filter()`, `.reduce()`)
2. **Evite comentários óbvios**: O código deve ser a documentação
3. **Analise performance**: Para rotas críticas (loops pesados, grandes volumes de dados), sugira a estrutura de dados ou algoritmo mais eficiente
4. **Siga DRY**: Conforme definido em `extreme-componentization.md`, abstraia a lógica repetida
5. **Escolha estruturas de dados corretas**: Map para lookups, Set para unicidade, Array para sequências

## Exemplos Práticos

### Vue - Computado vs Método

```typescript
// ❌ ERRADO - Recalcula a cada render
const filteredUsers = () => users.value.filter(u => u.isActive)

// ✅ CORRETO - Memoizado
const filteredUsers = computed(() => users.value.filter(u => u.isActive))
```

### Desestruturação e Optional Chaining

```typescript
// ❌ ERRADO
const getName = (user) => {
  if (user && user.profile && user.profile.name) {
    return user.profile.name
  }
  return 'Unknown'
}

// ✅ CORRETO
const getName = (user) => user?.profile?.name ?? 'Unknown'
```

### Reduzir Complexidade

```typescript
// ❌ ERRADO - Múltiplas condições
if (user.age > 18 && user.age < 65 && user.isActive && user.isPaid) {
  // fazer algo
}

// ✅ CORRETO - Função auxiliar
const isEligible = (user) => 
  user.age > 18 && user.age < 65 && user.isActive && user.isPaid

if (isEligible(user)) {
  // fazer algo
}
```
