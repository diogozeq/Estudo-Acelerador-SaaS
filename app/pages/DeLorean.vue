<template>
  <div class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden font-display bg-background-dark text-white">
    <div class="flex h-full min-h-screen w-full">
      <!-- Sidebar -->
      <aside class="flex h-full min-h-screen flex-col justify-between border-r border-solid border-white/10 p-4 w-64 brushed-steel-dark">
        <div class="flex flex-col gap-4">
          <!-- User Profile -->
          <div class="flex items-center gap-3">
            <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" :style="{ backgroundImage: `url('${user.avatar}')` }" />
            <div class="flex flex-col">
              <h1 class="text-white text-base font-medium leading-normal">{{ user.name }}</h1>
              <p class="text-[#90adcb] text-sm font-normal leading-normal">{{ user.company }}</p>
            </div>
          </div>

          <!-- Navigation -->
          <nav class="flex flex-col gap-2">
            <NuxtLink to="/delorean" class="flex items-center gap-3 px-3 py-2 rounded-md bg-electric-blue/20 text-electric-blue">
              <span class="material-symbols-outlined">timeline</span>
              <p class="text-sm font-medium leading-normal">Timelines</p>
            </NuxtLink>
            <NuxtLink to="/cep" class="flex items-center gap-3 px-3 py-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors duration-200 rounded-md">
              <span class="material-symbols-outlined">location_on</span>
              <p class="text-sm font-medium leading-normal">CEP v1</p>
            </NuxtLink>
            <NuxtLink to="/cep2" class="flex items-center gap-3 px-3 py-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors duration-200 rounded-md">
              <span class="material-symbols-outlined">search</span>
              <p class="text-sm font-medium leading-normal">CEP v2</p>
            </NuxtLink>
          </nav>
        </div>

        <!-- Gigawatts Meter -->
        <div class="flex flex-col gap-2 p-2 brushed-steel rounded-lg border-2 border-black/50 shadow-inner">
          <h3 class="text-center font-retro text-lg tracking-wider text-gray-300">GIGAWATTS</h3>
          <div class="w-full bg-black/50 rounded-full h-4 border border-gray-700 shadow-inner">
            <div class="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 h-full rounded-full flex items-center justify-end transition-all duration-300" :style="{ width: `${gigawattsPercentage}%` }">
              <span class="material-symbols-outlined text-xl text-yellow-200 -mr-2 drop-shadow-[0_0_4px_rgba(251,255,0,0.8)]">bolt</span>
            </div>
          </div>
          <p class="text-center font-mono text-sm text-yellow-300">{{ gigawatts.toFixed(2) }} GW</p>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col bg-background-dark">
        <!-- Header -->
        <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/10 px-6 py-3 brushed-steel-dark">
          <div class="flex items-center gap-4 text-white">
            <div class="size-6 text-electric-blue">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor" />
              </svg>
            </div>
            <h2 class="font-retro italic text-xl tracking-wide chrome-gradient">Painel do DeLorean</h2>
          </div>
          <div class="flex flex-1 justify-end gap-4 items-center">
            <div class="flex items-center gap-2 rounded-lg bg-black p-2 border border-gray-700">
              <p class="font-led text-3xl text-electric-blue tabular-nums">{{ speed }}</p>
              <span class="text-sm font-mono text-gray-400">MPH</span>
            </div>
            <button @click="startTrip" class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 industrial-button font-bold tracking-wider">
              <span class="truncate">START TRIP</span>
            </button>
          </div>
        </header>

        <!-- Main -->
        <main class="flex-1 p-6 overflow-y-auto">
          <!-- Time Display -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 rounded-lg brushed-steel border-2 border-black/50">
            <div class="flex flex-col items-center gap-2 rounded-md bg-black/70 p-4 border border-gray-700 shadow-inner">
              <p class="font-mono text-xs uppercase text-red-500 tracking-widest">Destination Time</p>
              <div class="font-led text-4xl text-red-500 led-text-red">{{ destinationTime.date }}</div>
              <div class="font-led text-2xl text-red-500 led-text-red">{{ destinationTime.time }}</div>
            </div>
            <div class="flex flex-col items-center gap-2 rounded-md bg-black/70 p-4 border border-gray-700 shadow-inner">
              <p class="font-mono text-xs uppercase text-green-400 tracking-widest">Present Time</p>
              <div class="font-led text-4xl text-green-400 led-text-green">{{ currentTime.date }}</div>
              <div class="font-led text-2xl text-green-400 led-text-green">{{ currentTime.time }}</div>
            </div>
            <div class="flex flex-col items-center gap-2 rounded-md bg-black/70 p-4 border border-gray-700 shadow-inner">
              <p class="font-mono text-xs uppercase text-yellow-400 tracking-widest">Last Time Departed</p>
              <div class="font-led text-4xl text-yellow-400 led-text-yellow">{{ lastDeparture.date }}</div>
              <div class="font-led text-2xl text-yellow-400 led-text-yellow">{{ lastDeparture.time }}</div>
            </div>
          </div>

          <!-- Projects and Status Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <!-- Projects -->
            <div class="lg:col-span-2 flex flex-col gap-4">
              <h2 class="font-retro italic text-2xl tracking-wide chrome-gradient px-4 pb-3 pt-5">Timeline Projects</h2>
              
              <div v-for="project in projects" :key="project.id" class="brushed-steel rounded-lg p-4 border border-black/50">
                <div class="flex flex-col items-stretch justify-start rounded-lg xl:flex-row xl:items-start">
                  <div class="w-full xl:w-1/3 bg-center bg-no-repeat aspect-video bg-cover rounded-lg" :style="{ backgroundImage: `url('${project.image}')` }" />
                  <div class="flex w-full min-w-72 grow flex-col items-stretch justify-start gap-3 py-4 xl:px-4 font-mono text-sm text-phosphor-green">
                    <p class="font-retro not-italic text-lg text-white">{{ project.name }}</p>
                    <p class="text-gray-300">{{ project.description }}</p>
                    <div class="flex items-end gap-3 justify-between">
                      <p class="text-gray-400">Target: {{ project.target }}</p>
                      <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-8 px-4 bg-electric-blue text-black text-sm font-bold tracking-wider hover:bg-electric-blue/90 transition-colors">
                        <span class="truncate">View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Easter Egg Photo -->
              <div class="mt-4 flex flex-col items-center justify-center bg-white p-4 pb-12 rounded-sm shadow-lg max-w-sm mx-auto relative rotate-[-3deg]">
                <div class="bg-gray-800 w-full aspect-square mb-4 flex items-center justify-center">
                  <p class="text-gray-500">Image Fading...</p>
                </div>
                <p class="font-retro text-black text-center text-lg">Great Scott!</p>
                <p class="font-mono text-gray-700 text-center text-sm">You broke the space-time continuum!</p>
              </div>
            </div>

            <!-- Right Sidebar -->
            <div class="lg:col-span-1 flex flex-col gap-6">
              <!-- System Status -->
              <div class="brushed-steel rounded-lg p-6 flex flex-col border border-black/50">
                <h3 class="font-retro italic text-lg tracking-wide chrome-gradient mb-4">System Status & Alerts</h3>
                <div class="flex flex-col gap-4 font-mono text-sm">
                  <div v-for="alert in alerts" :key="alert.message" class="flex items-start gap-3">
                    <span :class="['material-symbols-outlined mt-1', alertColor(alert.type)]">{{ alert.icon }}</span>
                    <div class="flex flex-col">
                      <p class="text-white">{{ alert.message }}</p>
                      <p class="text-gray-400 text-xs">{{ alert.time }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Loading Animation -->
              <div class="brushed-steel rounded-lg p-6 flex flex-col items-center justify-center border border-black/50 aspect-square">
                <h3 class="font-retro text-lg tracking-wider text-gray-300 mb-4">LOADING...</h3>
                <div class="relative w-40 h-40 flex items-center justify-center">
                  <div class="absolute w-full h-full">
                    <div class="absolute top-1/2 left-0 w-1/2 h-1 bg-gray-600 -translate-y-1/2" />
                    <div class="absolute top-1/2 right-0 w-1/2 h-1 bg-gray-600 -translate-y-1/2" />
                    <div class="absolute left-1/2 top-0 w-1 h-1/2 bg-gray-600 -translate-x-1/2" />
                    <div class="absolute left-1/2 bottom-0 w-1 h-1/2 bg-gray-600 -translate-x-1/2" />
                  </div>
                  <div class="absolute w-2/3 h-2/3 rounded-full bg-electric-blue/50 blur-xl animate-pulse" />
                  <div class="absolute w-1/3 h-1/3 rounded-full bg-white blur-lg animate-ping" />
                  <div class="relative bg-gray-700 w-12 h-12 rounded-full border-2 border-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ title: 'Painel do DeLorean' })

const { user, speed, gigawatts, gigawattsPercentage, destinationTime, currentTime, lastDeparture, alerts, projects, startTrip } = useAppState()

const alertColor = (type: string) => ({
  success: 'text-green-400',
  warning: 'text-yellow-400',
  error: 'text-fire-orange'
}[type])
</script>
