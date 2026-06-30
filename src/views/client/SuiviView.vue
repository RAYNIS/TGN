<script setup>
import { useClientStore } from '@/stores/client'
import MapView from '@/components/common/MapView.vue'

const store = useClientStore()
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold">Suivi temps réel</h1>
        <p class="text-sm text-slate-500">Visualisez la progression des véhicules vers vos arrêts favoris.</p>
      </div>
      <span class="badge-info">ETA synchronisé</span>
    </div>

    <div class="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
      <MapView :markers="store.liveVehicles" />
      <div class="space-y-4">
        <div v-for="vehicle in store.liveVehicles" :key="vehicle.id" class="card">
          <h3 class="font-semibold text-slate-900">{{ vehicle.title }}</h3>
          <p class="mt-2 text-sm text-slate-500">{{ vehicle.popup }}</p>
          <div class="mt-4 flex items-center justify-between">
            <span class="badge-success">{{ vehicle.status }}</span>
            <button class="btn-secondary !px-3 !py-2">Me notifier</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
