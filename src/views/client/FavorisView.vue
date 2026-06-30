<script setup>
import { reactive } from 'vue'
import { useClientStore } from '@/stores/client'

const store = useClientStore()
const form = reactive({ label: '', route: '', schedule: '', mode: '' })

function addFavorite() {
  store.addFavorite({ ...form })
  form.label = ''
  form.route = ''
  form.schedule = ''
  form.mode = ''
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Favoris & trajets récurrents</h1>
      <p class="text-sm text-slate-500">Enregistrez vos trajets maison-travail et vos correspondances les plus fréquentes.</p>
    </div>

    <div class="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
      <div class="grid gap-4 md:grid-cols-2">
        <article v-for="favorite in store.favorites" :key="favorite.id" class="card">
          <p class="text-sm font-semibold text-primary">{{ favorite.label }}</p>
          <h3 class="mt-3 text-lg font-semibold">{{ favorite.route }}</h3>
          <p class="mt-2 text-sm text-slate-500">Départ habituel: {{ favorite.schedule }}</p>
          <p class="mt-1 text-sm text-slate-500">Mode privilégié: {{ favorite.mode }}</p>
        </article>
      </div>

      <form class="card space-y-4" @submit.prevent="addFavorite">
        <div>
          <h3 class="section-title">Ajouter un favori</h3>
          <p class="section-subtitle">Créez un raccourci vers vos trajets essentiels.</p>
        </div>
        <input v-model="form.label" class="input-field" placeholder="Libellé" required />
        <input v-model="form.route" class="input-field" placeholder="Trajet" required />
        <input v-model="form.schedule" class="input-field" placeholder="Horaire favori" required />
        <input v-model="form.mode" class="input-field" placeholder="Mode" required />
        <button class="btn-primary w-full">Enregistrer</button>
      </form>
    </div>
  </div>
</template>
