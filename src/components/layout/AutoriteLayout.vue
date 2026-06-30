<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import NotificationBadge from '@/components/common/NotificationBadge.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const navigation = [
  { label: 'Dashboard', to: '/autorite', icon: '🏛️' },
  { label: 'Monitoring', to: '/autorite/monitoring', icon: '🛰️' },
  { label: 'Rapports', to: '/autorite/rapports', icon: '📄' },
  { label: 'Validation', to: '/autorite/validation', icon: '✅' },
  { label: 'Tarification', to: '/autorite/tarification', icon: '💳' },
  { label: 'Analytics', to: '/autorite/analytics', icon: '📉' },
  { label: 'Audit', to: '/autorite/audit', icon: '🛡️' },
]

const pageTitle = computed(() => navigation.find((item) => route.path === item.to)?.label || 'Console autorité')

function isActive(item) {
  return item.to === '/autorite' ? route.path === item.to : route.path.startsWith(item.to)
}

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 lg:grid lg:grid-cols-[280px_1fr]">
    <aside class="hidden border-r border-slate-200 bg-white px-6 py-8 lg:block">
      <div>
        <p class="text-sm uppercase tracking-[0.28em] text-primary">TGN</p>
        <h1 class="mt-3 text-2xl font-bold">Admin Autorité</h1>
        <p class="mt-2 text-sm text-slate-500">Vision consolidée du réseau, conformité et décisions stratégiques.</p>
      </div>
      <nav class="mt-10 space-y-2">
        <RouterLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          :class="[
            'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
            isActive(item) ? 'bg-primary text-white shadow-soft' : 'text-slate-600 hover:bg-blue-50 hover:text-primary',
          ]"
        >
          <span>{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>
      <div class="mt-10 rounded-2xl bg-blue-50 p-4 text-sm text-slate-700">
        <p class="font-semibold text-primary">Comité hebdo</p>
        <p class="mt-2">3 arbitrages tarifaires et 2 validations réseau à traiter.</p>
      </div>
    </aside>

    <div>
      <header class="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div class="flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p class="text-sm text-slate-500">{{ authStore.user?.roleLabel }}</p>
            <h2 class="text-2xl font-bold">{{ pageTitle }}</h2>
          </div>
          <div class="flex items-center gap-3">
            <div class="rounded-2xl bg-blue-50 px-4 py-2 text-sm font-semibold text-primary">Cellule conformité</div>
            <NotificationBadge :count="5">
              <span class="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-lg shadow-sm">🔔</span>
            </NotificationBadge>
            <div class="hidden rounded-2xl border border-slate-200 px-4 py-2 sm:block">
              <p class="text-xs uppercase tracking-wide text-slate-500">Profil</p>
              <p class="text-sm font-semibold text-slate-800">{{ authStore.user?.name }}</p>
            </div>
            <button class="btn-secondary" @click="logout">Déconnexion</button>
          </div>
        </div>
      </header>
      <main class="px-4 py-6 sm:px-6 lg:px-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>
