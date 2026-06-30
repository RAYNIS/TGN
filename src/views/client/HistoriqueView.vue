<script setup>
import { useClientStore } from '@/stores/client'
import DataTable from '@/components/common/DataTable.vue'

const store = useClientStore()
const columns = [
  { key: 'route', label: 'Trajet' },
  { key: 'date', label: 'Date' },
  { key: 'amount', label: 'Montant' },
  { key: 'rating', label: 'Note' },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Historique des trajets</h1>
      <p class="text-sm text-slate-500">Retrouvez vos déplacements, dépenses et évaluations passées.</p>
    </div>

    <DataTable :columns="columns" :rows="store.history">
      <template #cell-rating="{ value }">
        <span class="font-semibold text-amber-500">{{ '★'.repeat(value) }}</span>
      </template>
    </DataTable>
  </div>
</template>
