<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { apiService } from '@/services/api'

const router = useRouter()
const authStore = useAuthStore()
const loadingRole = ref('')

async function selectRole(role) {
  loadingRole.value = role
  await apiService.login(role)
  const target = authStore.loginAs(role)
  router.push(target)
  loadingRole.value = ''
}
</script>

<template>
  <div class="min-h-screen bg-grid-pattern bg-grid">
    <div class="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-4 py-10 lg:grid-cols-[1.2fr_0.9fr] lg:px-8">
      <section>
        <span class="badge-info">Transport Governance Network</span>
        <h1 class="mt-6 max-w-2xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Plateforme Vue 3 de pilotage du réseau de transport urbain.
        </h1>
        <p class="mt-6 max-w-2xl text-lg text-slate-600">
          Unifiez l’exploitation, la régulation et l’expérience voyageur au sein d’une interface moderne, temps réel et orientée performance.
        </p>
        <div class="mt-10 grid gap-4 sm:grid-cols-3">
          <div class="card">
            <p class="text-sm font-semibold text-primary">Exploitant</p>
            <p class="mt-2 text-sm text-slate-500">Opérations, flotte, incidents, suivi temps réel.</p>
          </div>
          <div class="card">
            <p class="text-sm font-semibold text-primary">Autorité</p>
            <p class="mt-2 text-sm text-slate-500">Conformité, validation, analytics et arbitrages.</p>
          </div>
          <div class="card">
            <p class="text-sm font-semibold text-primary">Client</p>
            <p class="mt-2 text-sm text-slate-500">Recherche d’itinéraires, paiement, notifications.</p>
          </div>
        </div>
      </section>

      <section class="card rounded-3xl border-slate-200 p-8 shadow-soft">
        <div class="text-center">
          <p class="text-sm uppercase tracking-[0.32em] text-primary">Connexion par rôle</p>
          <h2 class="mt-3 text-3xl font-bold">Sélectionnez votre interface</h2>
          <p class="mt-3 text-sm text-slate-500">Chaque rôle ouvre un portail dédié avec des données mock réalistes.</p>
        </div>

        <div class="mt-8 space-y-4">
          <button
            v-for="role in authStore.availableRoles"
            :key="role.value"
            class="group flex w-full items-center justify-between rounded-3xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-primary hover:shadow-soft"
            @click="selectRole(role.value)"
          >
            <div>
              <p class="text-lg font-semibold text-slate-900">{{ role.label }}</p>
              <p class="mt-1 text-sm text-slate-500">{{ role.profile }}</p>
            </div>
            <span class="rounded-2xl bg-blue-50 px-4 py-2 text-sm font-semibold text-primary group-hover:bg-primary group-hover:text-white">
              {{ loadingRole === role.value ? 'Chargement...' : 'Ouvrir' }}
            </span>
          </button>
        </div>

        <div class="mt-8 rounded-3xl bg-slate-900 p-5 text-sm text-slate-100">
          <p class="font-semibold">Temps réel</p>
          <p class="mt-2 text-slate-300">WebSocket mock, cartographie Leaflet, tableaux analytiques et stores Pinia intégrés.</p>
        </div>
      </section>
    </div>
  </div>
</template>
