<script setup>
import { computed } from 'vue'
import { useAutoriteStore } from '@/stores/autorite'
import ChartWidget from '@/components/common/ChartWidget.vue'

const store = useAutoriteStore()

const complianceData = computed(() => ({
  labels: store.demandLabels,
  datasets: [
    {
      label: 'Conformité %',
      data: store.complianceSeries,
      borderColor: '#F97316',
      backgroundColor: 'rgba(249, 115, 22, 0.16)',
      fill: true,
      tension: 0.35,
    },
  ],
}))
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Monitoring global</h1>
      <p class="text-sm text-slate-500">Surveillez la performance, la charge et les alertes de service à l’échelle du réseau.</p>
    </div>

    <div class="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
      <ChartWidget title="Indice de conformité" :chart-data="complianceData" type="line" />
      <div class="card space-y-4">
        <div>
          <h3 class="section-title">Watchlist réseau</h3>
          <p class="section-subtitle">Focus opérationnel des prochaines heures.</p>
        </div>
        <div v-for="operator in store.operators" :key="operator.name" class="rounded-2xl bg-slate-50 p-4">
          <div class="flex items-center justify-between gap-3">
            <p class="font-semibold text-slate-900">{{ operator.name }}</p>
            <span class="badge-success">{{ operator.punctuality }}</span>
          </div>
          <p class="mt-2 text-sm text-slate-500">{{ operator.mode }} · Satisfaction {{ operator.satisfaction }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
