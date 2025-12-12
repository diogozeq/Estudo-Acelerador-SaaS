<template>
  <div class="mb-6 space-y-4">
    <label :for="`cep-input-${id}`" :class="theme.headingSmall" style="color: #ffcc00;">
      Digite o CEP (somente números):
    </label>
    <div class="flex gap-2">
      <BaseInput
        :id="`cep-input-${id}`"
        :model-value="input"
        type="text"
        placeholder="Ex: 01001000"
        maxlength="8"
        @update:model-value="onInputChange"
        @keyup.enter="onSearch"
      />
      <BaseButton
        label="Pesquisar"
        :disabled="loading"
        @click="onSearch"
      >
        {{ loading ? 'Procurando...' : 'Pesquisar' }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useThemeClasses } from '~/composables/useThemeClasses'
import { useCepValidation } from '~/composables/useCepValidation'
import { CEP_CONFIG } from '~/utils/constants'
import BaseInput from '../base/BaseInput.vue'
import BaseButton from '../base/BaseButton.vue'

interface Props {
  input: string
  loading: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:input': [value: string]
  'search': [cep: string]
}>()

const theme = useThemeClasses()
const { validateFormat } = useCepValidation()
const id = ref(Math.random().toString(36).substr(2, 9))

const onInputChange = (value: string) => {
  emit('update:input', value)
}

const onSearch = () => {
  const cep = props.input.replace(/\D/g, '')

  if (!cep) {
    // Error will be handled by parent
    return
  }

  if (!validateFormat(props.input)) {
    // Error will be handled by parent
    return
  }

  emit('search', cep)
}
</script>
