<script setup>
import { computed } from 'vue'
import { useAutoriteStore } from '@/stores/autorite'
import KpiCard from '@/components/common/KpiCard.vue'
import ChartWidget from '@/components/common/ChartWidget.vue'
import DataTable from '@/components/common/DataTable.vue'

const store = useAutoriteStore()

const demandData = computed(() => ({
  labels: store.demandLabels,
  datasets: [
    {
      label: 'Voyages (milliers)',
      data: store.demandSeries,
      backgroundColor: '#1E40AF',
      borderRadius: 12,
    },
  ],
}))

const operatorColumns = [
  { key: 'name', label: 'Opérateur' },
  { key: 'mode', label: 'Mode' },
  { key: 'punctuality', label: 'Ponctualité' },
  { key: 'ridership', label: 'Voyageurs' },
  { key: 'compliance', label: 'Conformité' },
]
</script>

<template>
  <div class="space-y-6">
    <section class="rounded-3xl bg-white p-8 shadow-soft ring-1 ring-blue-100">
      <div class="flex flex-wrap items-center justify-between gap-6">
        <div>
          <p class="text-sm uppercase tracking-[0.3em] text-primary">Vision stratégique</p>
          <h1 class="mt-3 text-3xl font-bold">Vue consolidée de l’autorité organisatrice</h1>
          <p class="mt-3 max-w-2xl text-slate-600">Qualité de service, arbitrages budgétaires et conformité réglementaire sur l’ensemble du réseau.</p>
        </div>
        <div class="grid gap-3 rounded-3xl bg-blue-50 p-4 text-sm sm:grid-cols-2">
          <div><p class="text-slate-500">Validations en cours</p><p class="mt-1 text-2xl font-bold text-primary">3</p></div>
          <div><p class="text-slate-500">Audit mensuel</p><p class="mt-1 text-2xl font-bold text-primary">97%</p></div>
        </div>
      </div>
    </section>

    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <KpiCard v-for="kpi in store.overviewKpis" :key="kpi.title" v-bind="kpi">🏛️</KpiCard>
    </section>

    <div class="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
      <ChartWidget title="Demande hebdomadaire réseau" :chart-data="demandData" type="bar" />
      <div class="card space-y-4">
        <div>
          <h3 class="section-title">Alertes prioritaires</h3>
          <p class="section-subtitle">Points d’attention pilotage réseau.</p>
        </div>
        <div v-for="alert in store.monitoringAlerts" :key="alert.message" class="rounded-2xl border border-slate-200 p-4">
          <div class="flex items-center justify-between gap-3">
            <p class="font-semibold text-slate-900">{{ alert.zone }}</p>
            <span :class="alert.level === 'Élevé' ? 'badge-danger' : alert.level === 'Moyen' ? 'badge-warning' : 'badge-info'">{{ alert.level }}</span>
          </div>
          <p class="mt-2 text-sm text-slate-500">{{ alert.message }}</p>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div>
          <h3 class="section-title">Benchmark opérateurs</h3>
          <p class="section-subtitle">Comparaison des principaux délégataires.</p>
        </div>
      </div>
      <DataTable :columns="operatorColumns" :rows="store.operators">
        <template #cell-compliance="{ value }"><span class="badge-success">{{ value }}</span></template>
      </DataTable>
    </div>
  </div>
</template>
