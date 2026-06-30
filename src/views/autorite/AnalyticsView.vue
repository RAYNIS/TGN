<script setup>
import { computed } from 'vue'
import { useAutoriteStore } from '@/stores/autorite'
import ChartWidget from '@/components/common/ChartWidget.vue'
import DataTable from '@/components/common/DataTable.vue'

const store = useAutoriteStore()

const profitabilityData = computed(() => ({
  labels: store.analytics.map((item) => item.corridor),
  datasets: [
    {
      label: 'Rentabilité %',
      data: store.profitabilitySeries,
      backgroundColor: ['#1E40AF', '#F97316', '#1F2937', '#0F766E'],
      borderWidth: 0,
    },
  ],
}))

const columns = [
  { key: 'corridor', label: 'Corridor' },
  { key: 'traffic', label: 'Trafic' },
  { key: 'ridership', label: 'Fréquentation' },
  { key: 'profitability', label: 'Rentabilité' },
  { key: 'emissions', label: 'Émissions' },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Analytics réseau</h1>
      <p class="text-sm text-slate-500">Analyse de trafic, fréquentation et profitabilité par corridor stratégique.</p>
    </div>

    <div class="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
      <DataTable :columns="columns" :rows="store.analytics" />
      <ChartWidget title="Rentabilité corridor" :chart-data="profitabilityData" type="doughnut" height-class="h-80" />
    </div>
  </div>
</template>
