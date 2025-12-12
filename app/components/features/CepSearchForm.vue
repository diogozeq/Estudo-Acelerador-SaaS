<template>
  <div class="space-y-4">
    <label :for="`cep-input-${id}`" class="font-mono text-sm uppercase text-gray-400 tracking-widest">
      Digite o CEP (somente números):
    </label>
    <div class="flex gap-3">
      <input
        :id="`cep-input-${id}`"
        :value="input"
        type="text"
        placeholder="Ex: 01001000"
        maxlength="8"
        @input="onInputChange"
        @keyup.enter="onSearch"
        class="flex-1 px-4 py-3 rounded-lg font-mono text-lg bg-black/70 border-2 border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all"
      />
      <button
        :disabled="loading"
        @click="onSearch"
        class="px-6 py-3 font-bold rounded-lg transition-all duration-200 bg-electric-blue text-black disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
      >
        {{ loading ? 'Procurando...' : 'Pesquisar' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCepValidation } from '~/composables/useCepValidation'

interface Props {
  input: string
  loading: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:input': [value: string]
  'search': [cep: string]
}>()

const { validateFormat } = useCepValidation()
const id = ref(Math.random().toString(36).substr(2, 9))

const onInputChange = (e: Event) => {
  emit('update:input', (e.target as HTMLInputElement).value)
}

const onSearch = () => {
  const cep = props.input.replace(/\D/g, '')

  if (!cep || !validateFormat(props.input)) {
    return
  }

  emit('search', cep)
}
</script>
