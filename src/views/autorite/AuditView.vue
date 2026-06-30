<script setup>
import { useAutoriteStore } from '@/stores/autorite'
import DataTable from '@/components/common/DataTable.vue'

const store = useAutoriteStore()
const columns = [
  { key: 'id', label: 'Mission' },
  { key: 'area', label: 'Périmètre' },
  { key: 'owner', label: 'Responsable' },
  { key: 'dueDate', label: 'Échéance' },
  { key: 'status', label: 'Statut' },
  { key: 'evidence', label: 'État des preuves' },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Audit & conformité</h1>
      <p class="text-sm text-slate-500">Préparez les missions, rassemblez les preuves et suivez la conformité réseau.</p>
    </div>

    <DataTable :columns="columns" :rows="store.audits">
      <template #cell-status="{ value }">
        <span :class="value === 'En cours' ? 'badge-warning' : value === 'Planifié' ? 'badge-info' : 'badge-success'">{{ value }}</span>
      </template>
    </DataTable>
  </div>
</template>
