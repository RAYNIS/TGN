<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useClientStore } from '@/stores/client'

const router = useRouter()
const store = useClientStore()
const form = reactive({ origin: 'Plateau', destination: 'Aéroport', date: '2025-04-24', time: '08:15' })

function submitSearch() {
  store.searchJourneys(form)
  router.push('/client/recherche')
}
</script>

<template>
  <div class="space-y-6">
    <section class="overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-blue-700 to-blue-500 p-8 text-white shadow-soft">
      <div class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p class="text-sm uppercase tracking-[0.3em] text-blue-100">TGN mobilité</p>
          <h1 class="mt-4 text-4xl font-bold tracking-tight">Voyagez simplement, informé en temps réel.</h1>
          <p class="mt-4 max-w-2xl text-blue-100">Recherche d’itinéraires, suivi en direct, réservation et paiement réunis dans une expérience passager premium.</p>
        </div>
        <form class="rounded-3xl bg-white p-6 text-slate-900" @submit.prevent="submitSearch">
          <div class="grid gap-4 md:grid-cols-2">
            <input v-model="form.origin" class="input-field" placeholder="Départ" />
            <input v-model="form.destination" class="input-field" placeholder="Arrivée" />
            <input v-model="form.date" type="date" class="input-field" />
            <input v-model="form.time" type="time" class="input-field" />
          </div>
          <button class="btn-primary mt-4 w-full">Rechercher un trajet</button>
        </form>
      </div>
    </section>

    <section class="grid gap-4 md:grid-cols-3">
      <div class="card"><p class="text-sm text-slate-500">Trajets réservés</p><p class="mt-3 text-3xl font-bold text-primary">{{ store.reservations.length }}</p></div>
      <div class="card"><p class="text-sm text-slate-500">Notifications non lues</p><p class="mt-3 text-3xl font-bold text-primary">{{ store.notifications.filter((item) => !item.read).length }}</p></div>
      <div class="card"><p class="text-sm text-slate-500">Favoris actifs</p><p class="mt-3 text-3xl font-bold text-primary">{{ store.favorites.length }}</p></div>
    </section>

    <section class="grid gap-4 lg:grid-cols-3">
      <article v-for="journey in store.journeyResults" :key="journey.id" class="card">
        <p class="text-sm font-semibold text-primary">{{ journey.mode }}</p>
        <h3 class="mt-3 text-xl font-semibold">{{ journey.origin }} → {{ journey.destination }}</h3>
        <p class="mt-3 text-sm text-slate-500">Départ {{ journey.departure }} · arrivée {{ journey.arrival }}</p>
        <div class="mt-5 flex items-center justify-between">
          <span class="badge-success">{{ journey.price }}</span>
          <RouterLink to="/client/reservation" class="btn-secondary !px-3 !py-2">Réserver</RouterLink>
        </div>
      </article>
    </section>
  </div>
</template>
