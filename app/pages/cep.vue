<template>
  <div class="font-sans text-white min-h-screen" style="background-color: #0a101f; background-image: linear-gradient(rgba(0, 100, 100, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 100, 100, 0.05) 1px, transparent 1px); background-size: 2rem 2rem;">
    <!-- Top ambient gradient -->
    <div class="fixed inset-0 -z-10 pointer-events-none" style="background: radial-gradient(900px 600px at 15% 10%, rgba(0,255,255,0.10), transparent 55%), radial-gradient(900px 600px at 85% 15%, rgba(255,138,0,0.10), transparent 55%), radial-gradient(1200px 900px at 50% 100%, rgba(255,255,255,0.03), transparent 60%);" />

    <!-- Header -->
    <header class="max-w-6xl mx-auto px-4 pt-6 pb-4">
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-2.5 h-2.5 rounded-full animate-pulse" style="background: #00ffff; box-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff, 0 0 20px #00ffff;" />
          <p class="font-display tracking-widest text-xs text-gray-300">WEB CONSOLE // TIME CIRCUIT INTERFACE</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="font-display text-xs tracking-widest text-gray-400">V</span>
          <span class="font-display text-xs tracking-widest" style="color: #f7dc77; text-shadow: 0 0 2px #f7dc77, 0 0 5px #f7dc77;">1.21GW</span>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-4 pb-12">
      <div class="grid gap-6 lg:grid-cols-2 items-start">
        <!-- LEFT: Main DeLorean panel -->
        <section class="panel-glow" aria-labelledby="panel-title">
          <div class="scanline animate-scan" id="scanline" />

          <!-- Status lights -->
          <div class="flex justify-center items-center space-x-2 mb-3" aria-label="Luzes de status">
            <div class="w-3 h-3 rounded-full" style="background: #ff8a00; box-shadow: 0 0 8px #ff8a00, 0 0 15px #ff8a00, 0 0 20px #ff8a00;" />
            <div class="w-3 h-3 rounded-full" style="background: #ff8a00; box-shadow: 0 0 8px #ff8a00, 0 0 15px #ff8a00, 0 0 20px #ff8a00;" />
            <div class="w-3 h-3 rounded-full" style="background: #ff8a00; box-shadow: 0 0 8px #ff8a00, 0 0 15px #ff8a00, 0 0 20px #ff8a00;" />
            <div class="w-3 h-3 rounded-full" style="background: #ff8a00; box-shadow: 0 0 8px #ff8a00, 0 0 15px #ff8a00, 0 0 20px #ff8a00;" />
            <div class="w-3 h-3 rounded-full" style="background: #f7dc77; box-shadow: 0 0 5px #f7dc77, 0 0 10px #f7dc77;" />
            <div class="w-3 h-3 rounded-full" style="background: #00ffff; box-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff, 0 0 20px #00ffff;" />
            <div class="w-3 h-3 rounded-full bg-gray-800 border border-gray-700" />
            <div class="w-3 h-3 rounded-full bg-gray-800 border border-gray-700" />
            <div class="w-3 h-3 rounded-full bg-gray-800 border border-gray-700" />
            <div class="w-3 h-3 rounded-full bg-red-900 border border-red-800" />
          </div>

          <p class="font-display font-bold text-sm tracking-wider mb-4 text-center" :style="{ color: statusColor, textShadow: `0 0 2px ${statusColor}, 0 0 5px ${statusColor}` }">
            STATUS: {{ statusText }}
          </p>

          <h1 class="text-3xl font-display font-bold mb-2 split-flap-text text-center" id="panel-title">
            <div class="flex justify-center flex-wrap gap-1.5">
              <div v-for="char in 'LOCALIZADOR'.split('')" :key="`l-${char}`" class="split-flap-char">{{ char }}</div>
              <div class="w-full h-2" />
              <div v-for="char in 'DE CEP'.split('')" :key="`c-${char}`" class="split-flap-char">{{ char }}</div>
            </div>
          </h1>

          <p class="text-gray-400 text-xs tracking-widest text-center">PAINEL DELOREAN V1.21GW — INTERFACE WEB</p>

          <!-- Input -->
          <div class="mt-8">
            <label class="block font-display text-sm tracking-wider mb-2" style="color: #00ffff; text-shadow: 0 0 2px #00ffff, 0 0 5px #00ffff, 0 0 8px #00ffff;" for="cepInput">
              GATILHO DA VIAGEM NO TEMPO
            </label>
            <div class="cep-input-container">
              <input
                id="cepInput"
                v-model="inputValue"
                class="cep-input-field font-display tracking-widest"
                name="cep"
                placeholder="DIGITE O CEP (XXXXX-XXX)"
                inputmode="numeric"
                autocomplete="postal-code"
                maxlength="9"
                type="text"
                @keyup.enter="handleSearch"
              />
            </div>
            <p class="mt-3 text-xs text-gray-400 leading-relaxed">Dica: cole um CEP com ou sem hífen. Enter também dispara a busca.</p>
          </div>

          <!-- Action row -->
          <div class="mt-8 flex gap-4">
            <div class="w-1/2">
              <label class="block font-display text-sm tracking-wider mb-2" style="color: #ff8a00; text-shadow: 0 0 2px #ff8a00, 0 0 5px #ff8a00;">ACELERADOR</label>
              <button
                id="searchBtn"
                @click="handleSearch"
                :disabled="cepState.loading.value"
                class="fire-button w-full h-28 rounded-xl flex flex-col justify-center items-center text-center transition-transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="font-display font-bold text-lg" style="color: #f7dc77; text-shadow: 0 0 2px #f7dc77, 0 0 5px #f7dc77;">{{ cepState.loading.value ? 'ACELERANDO...' : 'ATIVAR VIAGEM' }}</span>
                <span class="font-display font-bold text-sm" style="color: #f7dc77; text-shadow: 0 0 2px #f7dc77, 0 0 5px #f7dc77;">(PESQUISAR)</span>
              </button>
            </div>
            <div class="flex flex-col justify-end space-y-2 text-sm w-1/2">
              <p class="font-display text-gray-400">
                FLUX CAPACITOR:<br />
                <span class="font-bold tracking-wider" style="color: #f7dc77; text-shadow: 0 0 2px #f7dc77, 0 0 5px #f7dc77;">{{ fluxStatus }}</span>
              </p>
              <p class="font-display text-gray-400">
                VELOCIDADE:<br />
                <span class="font-bold tracking-wider" style="color: #f7dc77; text-shadow: 0 0 2px #f7dc77, 0 0 5px #f7dc77;">{{ speedText }}</span>
              </p>
              <p class="font-display text-gray-400">
                TEMPO ALVO:<br />
                <span class="font-bold tracking-wider" style="color: #f7dc77; text-shadow: 0 0 2px #f7dc77, 0 0 5px #f7dc77;">{{ targetTimeText }}</span>
              </p>
            </div>
          </div>

          <!-- Quick actions -->
          <div class="mt-6 flex flex-wrap gap-3">
            <button
              id="clearBtn"
              @click="clearSearch"
              class="px-4 py-2 rounded-lg border text-xs tracking-widest hover:brightness-125 transition font-display"
              style="border-color: rgba(0, 255, 255, 0.5); color: #00ffff; text-shadow: 0 0 2px #00ffff, 0 0 5px #00ffff, 0 0 8px #00ffff;"
            >
              LIMPAR
            </button>
            <button
              id="historyBtn"
              @click="toggleHistory"
              class="px-4 py-2 rounded-lg border text-xs tracking-widest hover:brightness-125 transition font-display"
              style="border-color: rgba(0, 255, 255, 0.5); color: #00ffff; text-shadow: 0 0 2px #00ffff, 0 0 5px #00ffff, 0 0 8px #00ffff;"
            >
              HISTÓRICO
            </button>
            <button
              id="copyBtn"
              @click="copyAddress"
              :disabled="!cepState.result.value"
              class="px-4 py-2 rounded-lg border text-xs tracking-widest hover:brightness-125 transition font-display disabled:opacity-40 disabled:cursor-not-allowed"
              style="border-color: rgba(243, 220, 119, 0.5); color: #f7dc77; text-shadow: 0 0 2px #f7dc77, 0 0 5px #f7dc77;"
            >
              COPIAR ENDEREÇO
            </button>
          </div>

          <!-- Inline feedback -->
          <div class="mt-5">
            <div class="digital-text text-xs tracking-[.25em] w-full text-center" id="miniDisplay">
              {{ miniDisplay }}
            </div>
          </div>
        </section>

        <!-- RIGHT: Result + History (web-only) -->
        <aside class="panel-glow" aria-label="Resultados e histórico">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="font-display text-sm tracking-widest" style="color: #00ffff; text-shadow: 0 0 2px #00ffff, 0 0 5px #00ffff, 0 0 8px #00ffff;">COORDENADAS DE DESTINO</p>
              <p class="text-gray-400 text-xs tracking-widest mt-1">RESULTADO VIA VIACEP</p>
            </div>
            <div class="text-right">
              <p class="font-display text-xs tracking-widest text-gray-400">SINAL</p>
              <p class="font-display text-sm tracking-widest" style="color: #f7dc77; text-shadow: 0 0 2px #f7dc77, 0 0 5px #f7dc77;">{{ signalText }}</p>
            </div>
          </div>

          <!-- Result card -->
          <div v-if="cepState.result.value" class="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
            <div class="flex items-center justify-between gap-4">
              <p class="font-display text-xs tracking-widest text-gray-300">CEP</p>
              <p class="font-display text-sm tracking-widest" style="color: #f7dc77; text-shadow: 0 0 2px #f7dc77, 0 0 5px #f7dc77;">{{ formatCepDisplay(cepState.result.value.cep) }}</p>
            </div>
            <div class="flex items-center justify-between gap-4">
              <p class="font-display text-xs tracking-widest text-gray-300">LOCALIDADE</p>
              <p class="font-display text-sm tracking-widest" style="color: #00ffff; text-shadow: 0 0 2px #00ffff, 0 0 5px #00ffff, 0 0 8px #00ffff;">{{ cepState.result.value.localidade }}</p>
            </div>
            <div class="flex items-center justify-between gap-4">
              <p class="font-display text-xs tracking-widest text-gray-300">LOGRADOURO</p>
              <p class="font-display text-xs tracking-widest text-gray-400">{{ cepState.result.value.logradouro || '—' }}</p>
            </div>
            <div class="flex items-center justify-between gap-4">
              <p class="font-display text-xs tracking-widest text-gray-300">BAIRRO</p>
              <p class="font-display text-xs tracking-widest text-gray-400">{{ cepState.result.value.bairro || '—' }}</p>
            </div>
            <div class="flex items-center justify-between gap-4">
              <p class="font-display text-xs tracking-widest text-gray-300">UF</p>
              <p class="font-display text-sm tracking-widest" style="color: #00ffff; text-shadow: 0 0 2px #00ffff, 0 0 5px #00ffff, 0 0 8px #00ffff;">{{ cepState.result.value.uf }}</p>
            </div>
            <div class="flex items-center justify-between gap-4">
              <p class="font-display text-xs tracking-widest text-gray-300">DDD</p>
              <p class="font-display text-sm tracking-widest" style="color: #f7dc77; text-shadow: 0 0 2px #f7dc77, 0 0 5px #f7dc77;">{{ cepState.result.value.ddd || '—' }}</p>
            </div>
          </div>

          <!-- Error display -->
          <div v-if="cepState.error.value" class="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
            <p class="font-display text-xs tracking-widest text-red-400 mb-2">⚠️ ERRO DE SINCRONIZAÇÃO</p>
            <p class="text-xs text-gray-300">{{ cepState.error.value }}</p>
          </div>

          <!-- Loading display -->
          <div v-if="cepState.loading.value" class="mt-6 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-4 text-center">
            <p class="font-display text-xs tracking-widest" style="color: #f7dc77; text-shadow: 0 0 2px #f7dc77, 0 0 5px #f7dc77;">ATINGINDO 88 MPH...</p>
            <div class="flex justify-center gap-1 mt-3">
              <div class="w-1 h-6 rounded-full animate-pulse" style="background: #00ffff; animation-delay: 0s;" />
              <div class="w-1 h-6 rounded-full animate-pulse" style="background: #00ffff; animation-delay: 0.1s;" />
              <div class="w-1 h-6 rounded-full animate-pulse" style="background: #00ffff; animation-delay: 0.2s;" />
              <div class="w-1 h-6 rounded-full animate-pulse" style="background: #00ffff; animation-delay: 0.3s;" />
              <div class="w-1 h-6 rounded-full animate-pulse" style="background: #00ffff; animation-delay: 0.4s;" />
            </div>
          </div>

          <!-- History -->
          <div v-if="showHistory && history.length > 0" class="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p class="font-display text-xs tracking-widest text-gray-300 mb-3">HISTÓRICO DE VIAGENS</p>
            <div class="space-y-2 max-h-64 overflow-y-auto">
              <button
                v-for="(item, idx) in history"
                :key="idx"
                @click="inputValue = item.cep; handleSearch()"
                class="w-full text-left px-3 py-2 rounded border border-gray-700 hover:border-cyan-400 hover:bg-cyan-400/10 transition text-xs font-display tracking-widest text-gray-300 hover:text-cyan-400"
              >
                {{ formatCepDisplay(item.cep) }} — {{ item.localidade }}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCepState } from '~/composables/useCepState'
import { useCepValidation } from '~/composables/useCepValidation'
import { formatCepDisplay } from '~/utils/cepFormatter'
import { API_CONFIG, CEP_CONFIG } from '~/utils/constants'

definePageMeta({
  title: 'Localizador de CEP — Painel DeLorean V1.21GW'
})

const cepState = useCepState()
const { validateFormat, isCepNotFound } = useCepValidation()

const inputValue = ref('')
const showHistory = ref(false)
const history = ref<Array<{ cep: string; localidade: string }>>([])

const statusText = computed(() => {
  if (cepState.loading.value) return 'ACELERANDO...'
  if (cepState.error.value) return 'ERRO DE SINCRONIZAÇÃO'
  if (cepState.result.value) return 'COORDENADAS CONFIRMADAS'
  return 'PRONTO PARA A VIAGEM'
})

const statusColor = computed(() => {
  if (cepState.loading.value) return '#f7dc77'
  if (cepState.error.value) return '#ef4444'
  if (cepState.result.value) return '#00ff9c'
  return '#f7dc77'
})

const fluxStatus = computed(() => {
  if (cepState.loading.value) return 'CARREGANDO'
  if (cepState.result.value) return 'ATIVO'
  return 'EM ESPERA'
})

const speedText = computed(() => {
  if (cepState.loading.value) return '88 MPH'
  return '0 MPH'
})

const targetTimeText = computed(() => {
  if (cepState.result.value) return cepState.result.value.localidade
  return '—'
})

const signalText = computed(() => {
  if (cepState.error.value) return 'ERRO'
  if (cepState.result.value) return 'OK'
  return 'OK'
})

const miniDisplay = computed(() => {
  if (cepState.loading.value) return 'SINCRONIZANDO COORDENADAS...'
  if (cepState.error.value) return `ERRO: ${cepState.error.value}`
  if (cepState.result.value) return `CEP: ${formatCepDisplay(cepState.result.value.cep)} — ${cepState.result.value.localidade}`
  return 'AGUARDANDO COORDENADAS...'
})

const handleSearch = async () => {
  const cep = inputValue.value

  cepState.clearResults()

  if (!validateFormat(cep)) {
    cepState.setError(CEP_CONFIG.ERROR_MESSAGES.INVALID_FORMAT)
    return
  }

  cepState.setLoading(true)

  try {
    const response = await fetch(`${API_CONFIG.VIACEP_BASE_URL}/${cep}/${API_CONFIG.VIACEP_FORMAT}/`)

    if (!response.ok) {
      throw new Error(CEP_CONFIG.ERROR_MESSAGES.API_ERROR)
    }

    const data = await response.json()

    if (isCepNotFound(data)) {
      cepState.setError(CEP_CONFIG.ERROR_MESSAGES.NOT_FOUND)
      return
    }

    cepState.setResult(data)

    // Add to history
    const cleanCep = cep.replace(/\D/g, '')
    if (!history.value.some(h => h.cep === cleanCep)) {
      history.value.unshift({ cep: cleanCep, localidade: data.localidade })
      if (history.value.length > 10) history.value.pop()
    }
  } catch (err) {
    cepState.setError(
      err instanceof Error ? err.message : CEP_CONFIG.ERROR_MESSAGES.NETWORK_ERROR
    )
  } finally {
    cepState.setLoading(false)
  }
}

const clearSearch = () => {
  inputValue.value = ''
  cepState.clearResults()
}

const toggleHistory = () => {
  showHistory.value = !showHistory.value
}

const copyAddress = () => {
  if (!cepState.result.value) return

  const address = `${cepState.result.value.logradouro}, ${cepState.result.value.bairro}, ${cepState.result.value.localidade} - ${cepState.result.value.uf}, ${formatCepDisplay(cepState.result.value.cep)}`
  navigator.clipboard.writeText(address)
}
</script>

<style scoped>
.panel-glow {
  border: 2px solid #ff8a00;
  border-radius: 1.5rem;
  box-shadow: 0 0 15px 5px rgba(255, 138, 0, 0.6), 0 0 15px 5px rgba(0, 255, 255, 0.6), inset 0 0 10px 2px rgba(255, 138, 0, 0.5), inset 0 0 10px 2px rgba(0, 255, 255, 0.5);
  background-color: rgba(10, 16, 31, 0.85);
  backdrop-filter: blur(6px);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
}

.panel-glow::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(1200px 400px at 10% 0%, rgba(0, 255, 255, 0.1), transparent 60%), radial-gradient(900px 400px at 90% 20%, rgba(255, 138, 0, 0.1), transparent 55%);
  pointer-events: none;
  mix-blend-mode: screen;
}

.digital-text {
  font-family: 'Orbitron', sans-serif;
  color: #e0e0e0;
  text-shadow: 0 0 5px rgba(224, 224, 224, 0.7);
  letter-spacing: 0.2em;
  background-color: #1a2336;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4);
}

.cep-input-container {
  position: relative;
  border: 1px solid #00ffff;
  border-radius: 0.75rem;
  box-shadow: 0 0 8px #00ffff, inset 0 0 8px #00ffff, inset 0 0 2px 1px #003333, inset 0 0 5px 3px #001a1a;
  padding: 0.85rem;
  background: rgba(0, 38, 38, 0.28);
  overflow: hidden;
}

.cep-input-container::before,
.cep-input-container::after {
  content: '';
  position: absolute;
  height: 60%;
  width: 4px;
  background: #00ffff;
  top: 20%;
  opacity: 0.75;
}

.cep-input-container::before {
  left: 8px;
}

.cep-input-container::after {
  right: 8px;
}

.cep-input-field {
  background: transparent;
  border: none;
  color: #e0e0e0;
  width: 100%;
  outline: none;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  font-family: 'Orbitron', sans-serif;
}

.cep-input-field::placeholder {
  color: #9ca3af;
}

.fire-button {
  background-image: linear-gradient(rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.35) 100%), linear-gradient(170deg, #ff4800 0%, #ff8c00 40%, #ffc600 60%, #ff8a00 100%);
  box-shadow: 0 0 10px #ff8a00, 0 0 20px #ff8a00, 0 0 30px #e13c0b, inset 0 0 10px rgba(255, 255, 255, 0.25);
  border: 2px solid #ffcc00;
  position: relative;
  overflow: hidden;
  background-blend-mode: overlay, normal;
  user-select: none;
}

.fire-button::after {
  content: '';
  position: absolute;
  bottom: -22px;
  left: 0;
  width: 100%;
  height: 44px;
  background: linear-gradient(to top, rgba(255, 204, 0, 0.7), transparent);
  filter: blur(10px);
  animation: flame-flicker 1.5s infinite linear;
}

@keyframes flame-flicker {
  0%,
  100% {
    transform: scaleY(1) scaleX(1);
    opacity: 0.65;
  }
  50% {
    transform: scaleY(1.25) scaleX(1.12);
    opacity: 1;
  }
}

.split-flap-char {
  font-family: 'Orbitron', sans-serif;
  background-color: #1a2336;
  color: #e0e0e0;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4);
  text-shadow: 0 0 5px rgba(224, 224, 224, 0.7);
  font-size: 1.6rem;
  line-height: 1.5;
  min-width: 2.1rem;
  text-align: center;
}

.scanline {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(to bottom, transparent, rgba(0, 255, 255, 0.08), transparent);
  height: 120px;
  width: 100%;
  filter: blur(1px);
  opacity: 0;
}

.scanline.on {
  opacity: 1;
}

.animate-scan {
  animation: scan 1.8s infinite linear;
}

@keyframes scan {
  0% {
    transform: translateY(-120%);
    opacity: 0;
  }
  10% {
    opacity: 0.9;
  }
  100% {
    transform: translateY(220%);
    opacity: 0;
  }
}

.font-display {
  font-family: 'Orbitron', sans-serif;
}
</style>
