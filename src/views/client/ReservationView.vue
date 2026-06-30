<script setup>
import { computed } from 'vue'
import { useClientStore } from '@/stores/client'

const store = useClientStore()
const selectedJourney = computed(() => store.journeyResults[0])

function reserve() {
  if (selectedJourney.value) {
    store.addReservation(selectedJourney.value)
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold">Réservation & billet</h1>
        <p class="text-sm text-slate-500">Confirmez vos trajets et préparez votre billet numérique.</p>
      </div>
      <button class="btn-primary" @click="reserve">Réserver l’offre recommandée</button>
    </div>

    <div class="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
      <div class="card">
        <div class="card-header">
          <div>
            <h3 class="section-title">Offre recommandée</h3>
            <p class="section-subtitle">Trajet optimisé selon votre historique et le temps réel.</p>
          </div>
        </div>
        <div v-if="selectedJourney" class="rounded-3xl bg-blue-50 p-6">
          <p class="text-sm font-semibold text-primary">{{ selectedJourney.mode }}</p>
          <h3 class="mt-3 text-2xl font-bold">{{ selectedJourney.origin }} → {{ selectedJourney.destination }}</h3>
          <div class="mt-4 grid gap-4 md:grid-cols-3">
            <div><p class="text-sm text-slate-500">Départ</p><p class="mt-1 font-semibold">{{ selectedJourney.departure }}</p></div>
            <div><p class="text-sm text-slate-500">Arrivée</p><p class="mt-1 font-semibold">{{ selectedJourney.arrival }}</p></div>
            <div><p class="text-sm text-slate-500">Tarif</p><p class="mt-1 font-semibold">{{ selectedJourney.price }}</p></div>
          </div>
        </div>
      </div>

      <div class="card space-y-4">
        <div>
          <h3 class="section-title">Réservations à venir</h3>
          <p class="section-subtitle">Vos billets actifs et en attente.</p>
        </div>
        <div v-for="reservation in store.reservations" :key="reservation.id" class="rounded-2xl border border-slate-200 p-4">
          <div class="flex items-center justify-between gap-3">
            <p class="font-semibold text-slate-900">{{ reservation.trip }}</p>
            <span :class="reservation.status === 'Confirmée' ? 'badge-success' : 'badge-warning'">{{ reservation.status }}</span>
          </div>
          <p class="mt-2 text-sm text-slate-500">{{ reservation.schedule }}</p>
          <p class="mt-1 text-sm text-slate-500">Paiement: {{ reservation.payment }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
