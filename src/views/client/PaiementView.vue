<script setup>
import { useClientStore } from '@/stores/client'

const store = useClientStore()
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Paiement intégré</h1>
      <p class="text-sm text-slate-500">Gérez vos moyens de paiement et sécurisez vos achats de billets.</p>
    </div>

    <div class="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
      <div class="grid gap-4">
        <article v-for="payment in store.payments" :key="payment.id" class="card">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-sm font-semibold text-primary">{{ payment.type }}</p>
              <h3 class="mt-2 text-lg font-semibold">{{ payment.method }}</h3>
              <p class="mt-2 text-sm text-slate-500">Validité: {{ payment.expires }}</p>
            </div>
            <span :class="payment.default ? 'badge-success' : 'badge-info'">{{ payment.default ? 'Par défaut' : 'Secondaire' }}</span>
          </div>
        </article>
      </div>

      <div class="card space-y-4">
        <div>
          <h3 class="section-title">Résumé portefeuille</h3>
          <p class="section-subtitle">Métriques rapides du compte voyageur.</p>
        </div>
        <div class="rounded-2xl bg-slate-900 p-5 text-white">
          <p class="text-sm text-slate-300">Dépense mensuelle</p>
          <p class="mt-2 text-3xl font-bold">24 600 FCFA</p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="rounded-2xl bg-slate-50 p-4"><p class="text-sm text-slate-500">Titres actifs</p><p class="mt-2 text-xl font-bold">04</p></div>
          <div class="rounded-2xl bg-slate-50 p-4"><p class="text-sm text-slate-500">Cashback</p><p class="mt-2 text-xl font-bold">1 250 FCFA</p></div>
        </div>
      </div>
    </div>
  </div>
</template>
