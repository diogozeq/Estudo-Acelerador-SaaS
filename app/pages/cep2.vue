<template>
  <main class="min-h-screen flex items-center justify-center p-8" style="background: linear-gradient(135deg,#0b0226 0%,#2a0044 50%,#0b0226 100%);">
    <section class="w-full max-w-2xl bg-[rgba(255,255,255,0.03)] p-8 rounded-lg border border-orange-600 flex flex-col items-center">
      <h1 class="text-2xl font-bold mb-6 text-orange-400">Buscar CEP</h1>

      <div class="flex gap-3 items-center justify-center w-full mb-6">
        <BaseInput v-model="cep" placeholder="Ex: 01001000" maxlength="8" />
        <BaseButton @click="onSearch" :disabled="loading">
          {{ loading ? 'Buscando...' : 'Pesquisar' }}
        </BaseButton>
      </div>

      <div v-if="error" class="w-full mb-6 p-4 bg-red-500/20 border border-red-500 rounded text-red-200 text-sm">
        {{ error }}
      </div>

      <div class="w-full">
        <CepDetails :cepData="data" />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
definePageMeta({ title: 'CEP 2' })

const cep = ref('')
const { data, loading, error, fetchCep } = useCep()

async function onSearch() {
  await fetchCep(cep.value)
}
</script>
