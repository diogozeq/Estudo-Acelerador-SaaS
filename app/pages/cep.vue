<template>
  <main
    class="min-h-screen flex items-center justify-center p-8"
    style="background: linear-gradient(135deg, #1a0033 0%, #330066 50%, #1a0033 100%); color: #fff;"
  >
    <section
      class="max-w-2xl w-full bg-[rgba(255,255,255,0.05)] border-2 p-8 rounded-lg shadow-2xl"
      style="border-color: #ff6600; backdrop-filter: blur(10px);"
    >
      <!-- Header -->
      <h1 class="text-4xl font-extrabold mb-2 text-center" style="color: #ff6600;">
        🚗 Localizador de CEP 🚗
      </h1>
      <p class="text-center mb-6" style="color: #ffcc00;">
        (De Volta para o Futuro — 1985)
      </p>

      <!-- Input Section -->
      <div class="mb-6 space-y-4">
        <label for="cep-input" class="block text-lg font-semibold" style="color: #ffcc00;">
          Digite o CEP (somente números):
        </label>
        <div class="flex gap-2">
          <input
            id="cep-input"
            v-model="cepInput"
            type="text"
            placeholder="Ex: 01001000"
            maxlength="8"
            @keyup.enter="searchCep"
            class="flex-1 px-4 py-3 rounded-lg font-mono text-lg"
            style="background: rgba(0,0,0,0.3); color: #ffcc00; border: 2px solid #ff6600;"
          />
          <button
            @click="searchCep"
            :disabled="loading"
            class="px-6 py-3 font-bold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
            :style="{
              background: '#ff6600',
              color: '#050510',
              cursor: 'pointer',
              opacity: loading ? 0.6 : 1
            }"
          >
            {{ loading ? 'Procurando...' : 'Pesquisar' }}
          </button>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="mb-6 p-4 rounded-lg" style="background: rgba(255, 0, 0, 0.2); border: 2px solid #ff0000; color: #ff9999;">
        <p class="font-semibold">❌ Erro:</p>
        <p>{{ error }}</p>
      </div>

      <!-- Results Section -->
      <div v-if="result" class="space-y-4">
        <div class="bg-[rgba(255,102,0,0.1)] border-2 p-4 rounded-lg" style="border-color: #ffcc00;">
          <h2 class="text-2xl font-bold mb-4" style="color: #ffcc00;">Endereço Encontrado</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- CEP -->
            <div class="p-3 rounded" style="background: rgba(0,0,0,0.2);">
              <p class="text-sm opacity-80" style="color: #cccccc;">CEP</p>
              <p class="text-lg font-mono font-bold" style="color: #ff6600;">{{ result.cep }}</p>
            </div>

            <!-- Rua/Logradouro -->
            <div class="p-3 rounded" style="background: rgba(0,0,0,0.2);">
              <p class="text-sm opacity-80" style="color: #cccccc;">Logradouro</p>
              <p class="text-lg font-bold" style="color: #ffcc00;">{{ result.logradouro || '—' }}</p>
            </div>

            <!-- Bairro -->
            <div class="p-3 rounded" style="background: rgba(0,0,0,0.2);">
              <p class="text-sm opacity-80" style="color: #cccccc;">Bairro</p>
              <p class="text-lg font-bold" style="color: #ffcc00;">{{ result.bairro || '—' }}</p>
            </div>

            <!-- Localidade -->
            <div class="p-3 rounded" style="background: rgba(0,0,0,0.2);">
              <p class="text-sm opacity-80" style="color: #cccccc;">Localidade</p>
              <p class="text-lg font-bold" style="color: #ffcc00;">{{ result.localidade || '—' }}</p>
            </div>

            <!-- UF -->
            <div class="p-3 rounded" style="background: rgba(0,0,0,0.2);">
              <p class="text-sm opacity-80" style="color: #cccccc;">Estado (UF)</p>
              <p class="text-lg font-bold" style="color: #ff6600;">{{ result.uf || '—' }}</p>
            </div>

            <!-- Região -->
            <div class="p-3 rounded" style="background: rgba(0,0,0,0.2);">
              <p class="text-sm opacity-80" style="color: #cccccc;">Região</p>
              <p class="text-lg font-bold" style="color: #ff6600;">{{ result.regiao || '—' }}</p>
            </div>

            <!-- DDD -->
            <div class="p-3 rounded" style="background: rgba(0,0,0,0.2);">
              <p class="text-sm opacity-80" style="color: #cccccc;">DDD</p>
              <p class="text-lg font-bold" style="color: #ffcc00;">{{ result.ddd || '—' }}</p>
            </div>

            <!-- IBGE -->
            <div class="p-3 rounded" style="background: rgba(0,0,0,0.2);">
              <p class="text-sm opacity-80" style="color: #cccccc;">IBGE</p>
              <p class="text-lg font-bold" style="color: #ffcc00;">{{ result.ibge || '—' }}</p>
            </div>
          </div>

          <!-- Complemento -->
          <div v-if="result.complemento" class="mt-4 p-3 rounded" style="background: rgba(0,0,0,0.2);">
            <p class="text-sm opacity-80" style="color: #cccccc;">Complemento</p>
            <p class="text-lg" style="color: #ffcc00;">{{ result.complemento }}</p>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!loading && !error" class="text-center p-8 opacity-70">
        <p style="color: #ffcc00;">⏰ Digite um CEP e clique em "Pesquisar" para começar...</p>
        <p style="color: #cccccc;" class="text-sm mt-2">Exemplo: 01001000 (Praça da Sé, São Paulo)</p>
      </div>

      <!-- Footer -->
      <footer class="mt-8 text-center text-xs opacity-60" style="color: #cccccc;">
        <p>🔮 Powered by ViaCEP | Tema: De Volta para o Futuro (1985) 🔮</p>
      </footer>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  title: 'Localizador de CEP — De Volta para o Futuro'
})

interface CEPResult {
  cep: string
  logradouro: string
  complemento: string
  unidade: string
  bairro: string
  localidade: string
  uf: string
  estado: string
  regiao: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

const cepInput = ref('')
const loading = ref(false)
const error = ref('')
const result = ref<CEPResult | null>(null)

async function searchCep() {
  // Validação
  error.value = ''
  result.value = null

  const cep = cepInput.value.replace(/\D/g, '')

  if (!cep) {
    error.value = 'Por favor, digite um CEP válido (somente números).'
    return
  }

  if (cep.length !== 8) {
    error.value = 'CEP deve ter exatamente 8 dígitos.'
    return
  }

  loading.value = true

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    
    if (!response.ok) {
      throw new Error('Erro ao conectar com a API ViaCEP.')
    }

    const data: CEPResult = await response.json()

    // Verifica se retornou erro (campo 'erro' = true)
    if ('erro' in data) {
      error.value = `CEP ${cep} não encontrado.`
      return
    }

    result.value = data
  } catch (err) {
    error.value = `Erro na requisição: ${err instanceof Error ? err.message : 'Desconhecido'}`
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
  box-shadow: 0 0 8px rgba(255, 102, 0, 0.5);
}

button {
  user-select: none;
}
</style>
