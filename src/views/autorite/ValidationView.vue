<script setup>
import { useAutoriteStore } from '@/stores/autorite'
import DataTable from '@/components/common/DataTable.vue'

const store = useAutoriteStore()
const columns = [
  { key: 'id', label: 'Dossier' },
  { key: 'operator', label: 'Opérateur' },
  { key: 'line', label: 'Ligne' },
  { key: 'change', label: 'Demande' },
  { key: 'impact', label: 'Impact' },
  { key: 'status', label: 'État' },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Validation des horaires</h1>
      <p class="text-sm text-slate-500">Analyse des demandes d’ajustement de l’offre et validation réglementaire.</p>
    </div>

    <DataTable :columns="columns" :rows="store.validations">
      <template #cell-status="{ value }">
        <span :class="value === 'À instruire' ? 'badge-warning' : value === 'Analyse avancée' ? 'badge-info' : 'badge-danger'">{{ value }}</span>
      </template>
      <template #actions>
        <div class="flex justify-end gap-2">
          <button class="btn-secondary !px-3 !py-2">Rejeter</button>
          <button class="btn-primary !px-3 !py-2">Valider</button>
        </div>
      </template>
    </DataTable>
  </div>
</template>
