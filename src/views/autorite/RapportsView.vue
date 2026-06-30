<script setup>
const reports = [
  { title: 'Synthèse mensuelle réseau', target: 'Conseil métropolitain', updatedAt: 'Aujourd’hui 08:30', status: 'Prêt diffusion' },
  { title: 'Qualité de service par corridor', target: 'Direction exploitation', updatedAt: 'Hier 16:10', status: 'Relecture' },
  { title: 'Suivi subventions & CAPEX', target: 'Comité finance', updatedAt: 'Lundi 09:00', status: 'Publié' },
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold">Rapports réglementaires</h1>
        <p class="text-sm text-slate-500">Production des livrables pour tutelles, opérateurs et comités de pilotage.</p>
      </div>
      <button class="btn-primary">Générer un rapport</button>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <article v-for="report in reports" :key="report.title" class="card">
        <p class="text-sm font-semibold text-primary">{{ report.target }}</p>
        <h3 class="mt-3 text-lg font-semibold">{{ report.title }}</h3>
        <p class="mt-3 text-sm text-slate-500">Mise à jour {{ report.updatedAt }}</p>
        <div class="mt-5 flex items-center justify-between">
          <span :class="report.status === 'Publié' ? 'badge-success' : report.status === 'Relecture' ? 'badge-warning' : 'badge-info'">{{ report.status }}</span>
          <button class="btn-secondary !px-3 !py-2">Ouvrir</button>
        </div>
      </article>
    </div>
  </div>
</template>
