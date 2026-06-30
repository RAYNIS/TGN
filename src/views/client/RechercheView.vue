<script setup>
import { reactive } from 'vue'
import { useClientStore } from '@/stores/client'

const store = useClientStore()
const form = reactive({ origin: 'Liberté 6', destination: 'Plateau', time: '07:15' })

function submitSearch() {
  store.searchJourneys(form)
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Recherche d’itinéraire</h1>
      <p class="text-sm text-slate-500">Comparez les trajets par durée, confort, prix et correspondances.</p>
    </div>

    <form class="card grid gap-4 md:grid-cols-4" @submit.prevent="submitSearch">
      <input v-model="form.origin" class="input-field" placeholder="Départ" />
      <input v-model="form.destination" class="input-field" placeholder="Arrivée" />
      <input v-model="form.time" type="time" class="input-field" />
      <button class="btn-primary">Actualiser</button>
    </form>

    <div class="space-y-4">
      <article v-for="journey in store.journeyResults" :key="journey.id" class="card">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div class="flex items-center gap-3">
              <span class="badge-info">{{ journey.mode }}</span>
              <span class="text-sm text-slate-500">{{ journey.duration }}</span>
            </div>
            <h3 class="mt-3 text-xl font-semibold">{{ journey.origin }} → {{ journey.destination }}</h3>
            <p class="mt-2 text-sm text-slate-500">Départ {{ journey.departure }} · arrivée {{ journey.arrival }}</p>
            <p class="mt-3 text-sm text-slate-600">{{ journey.comfort }}</p>
          </div>
          <div class="text-right">
            <p class="text-2xl font-bold text-primary">{{ journey.price }}</p>
            <button class="btn-primary mt-4">Choisir ce trajet</button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
