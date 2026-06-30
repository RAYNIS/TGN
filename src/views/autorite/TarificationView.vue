<script setup>
import { useAutoriteStore } from '@/stores/autorite'

const store = useAutoriteStore()
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold">Tarification & politiques</h1>
        <p class="text-sm text-slate-500">Cadrez les grilles tarifaires, réductions et arbitrages commerciaux.</p>
      </div>
      <button class="btn-primary">Nouvelle politique</button>
    </div>

    <div class="grid gap-4 xl:grid-cols-3">
      <article v-for="tariff in store.tariffs" :key="tariff.label" class="card">
        <div class="flex items-center justify-between gap-3">
          <h3 class="text-lg font-semibold">{{ tariff.label }}</h3>
          <span class="badge-info">{{ tariff.price }}</span>
        </div>
        <p class="mt-3 text-sm text-slate-500">{{ tariff.audience }}</p>
        <p class="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">{{ tariff.policy }}</p>
        <div class="mt-4 flex items-center justify-between text-sm text-slate-500">
          <span>Révision {{ tariff.review }}</span>
          <button class="btn-secondary !px-3 !py-2">Modifier</button>
        </div>
      </article>
    </div>
  </div>
</template>
