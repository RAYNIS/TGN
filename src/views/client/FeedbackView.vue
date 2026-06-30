<script setup>
import { reactive, ref } from 'vue'

const form = reactive({ trip: 'Plateau → Yoff', rating: 5, comment: '' })
const recentFeedback = ref([
  { trip: 'UCAD → Liberté 6', rating: 4, comment: 'Correspondance fluide et arrivée à l’heure.' },
  { trip: 'Plateau → Aéroport', rating: 5, comment: 'Trajet confortable, informations claires dans l’application.' },
])

function submitFeedback() {
  recentFeedback.value.unshift({ ...form })
  form.comment = ''
  form.rating = 5
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Avis & feedback</h1>
      <p class="text-sm text-slate-500">Partagez votre expérience pour améliorer le réseau et le service voyageur.</p>
    </div>

    <div class="grid gap-6 xl:grid-cols-[1fr_1.2fr]">
      <form class="card space-y-4" @submit.prevent="submitFeedback">
        <div>
          <h3 class="section-title">Laisser un avis</h3>
          <p class="section-subtitle">Votre retour alimente les tableaux qualité.</p>
        </div>
        <input v-model="form.trip" class="input-field" placeholder="Trajet" required />
        <select v-model="form.rating" class="select-field">
          <option :value="5">5 étoiles</option>
          <option :value="4">4 étoiles</option>
          <option :value="3">3 étoiles</option>
          <option :value="2">2 étoiles</option>
          <option :value="1">1 étoile</option>
        </select>
        <textarea v-model="form.comment" class="input-field min-h-32" placeholder="Votre commentaire"></textarea>
        <button class="btn-primary">Envoyer</button>
      </form>

      <div class="space-y-4">
        <article v-for="item in recentFeedback" :key="`${item.trip}-${item.comment}`" class="card">
          <div class="flex items-center justify-between gap-3">
            <h3 class="font-semibold text-slate-900">{{ item.trip }}</h3>
            <span class="font-semibold text-amber-500">{{ '★'.repeat(item.rating) }}</span>
          </div>
          <p class="mt-3 text-sm text-slate-500">{{ item.comment || 'Avis transmis avec succès.' }}</p>
        </article>
      </div>
    </div>
  </div>
</template>
