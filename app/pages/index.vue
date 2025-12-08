<template>
  <main class="min-h-screen flex items-center justify-center p-8" style="background: radial-gradient(circle at 10% 20%, #0b1221 0%, #050510 40%, #00142b 100%); color: #fff;">
    <section class="max-w-3xl text-center bg-[rgba(255,255,255,0.02)] border p-8 rounded-2xl" style="border-color: #ffcc00;">
      <h1 class="text-4xl font-extrabold mb-4" style="color:#ffcc00">De Volta para o Futuro - Parte II</h1>
      <p class="mb-6 leading-relaxed" style="color:#dfefff">
        O relógio marca 16:29. O DeLorean barra o tempo com fumaça prateada e um leve cheiro de gasolina do futuro.
        Você decidiu pular para 2015 — mas cuidado: cada escolha cria novas linhas temporais.
      </p>

      <div class="mb-6">
        <h2 class="text-xl font-bold mb-2" style="color:#80ffe1">Missões do Dia</h2>
        <ul class="text-left mx-auto max-w-md list-inside list-disc" style="color:#cde7ff">
          <li>Encontrar o manual do Hoverboard escondido na loja de gadgets.</li>
          <li>Evitar encontros com versões futuras de você mesmo.</li>
          <li>Garantir que o relógio de Hill Valley esteja sincronizado com 88 mph.</li>
        </ul>
      </div>

      <div class="space-y-4">
        <div class="space-x-4">
          <NuxtLink to="/delorean" class="inline-block px-5 py-2 rounded-md font-semibold transition-transform hover:scale-105" style="background:#ff6b00; color:#050510">
            🚗 Painel do DeLorean
          </NuxtLink>
          <NuxtLink to="/cep" class="inline-block px-5 py-2 rounded-md font-semibold transition-transform hover:scale-105" style="background:#00eaff; color:#050510">
            📍 Localizador CEP v1
          </NuxtLink>
        </div>
        <div>
          <NuxtLink to="/cep2" class="inline-block px-5 py-2 rounded-md font-semibold transition-transform hover:scale-105" style="background:#9d4fff; color:#fff">
            🔍 Localizador CEP v2
          </NuxtLink>
        </div>
      </div>

      <footer class="mt-8 text-sm opacity-80" style="color:#9fb7ff">Easter Egg: repare no calendário — novembro de 1955 está piscando.</footer>
    </section>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'De Volta para o Futuro II - Página Inicial'
})
</script>

<style scoped>
button, a { transition: transform .12s ease; }
button:active, a:active { transform: translateY(1px); }
</style>
