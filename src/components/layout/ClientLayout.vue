<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useClientStore } from '@/stores/client'
import NotificationBadge from '@/components/common/NotificationBadge.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const clientStore = useClientStore()

const navigation = [
  { label: 'Accueil', to: '/client', icon: '🏠' },
  { label: 'Recherche', to: '/client/recherche', icon: '🔎' },
  { label: 'Réservation', to: '/client/reservation', icon: '🎟️' },
  { label: 'Suivi', to: '/client/suivi', icon: '📍' },
  { label: 'Historique', to: '/client/historique', icon: '🕘' },
  { label: 'Notifications', to: '/client/notifications', icon: '🔔' },
  { label: 'Favoris', to: '/client/favoris', icon: '⭐' },
  { label: 'Paiement', to: '/client/paiement', icon: '💳' },
  { label: 'Feedback', to: '/client/feedback', icon: '💬' },
]

const unreadCount = computed(() => clientStore.notifications.filter((item) => !item.read).length)

function isActive(item) {
  return item.to === '/client' ? route.path === item.to : route.path.startsWith(item.to)
}

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <header class="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <RouterLink to="/client" class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-lg text-white shadow-soft">🚇</div>
          <div>
            <p class="text-xs uppercase tracking-[0.3em] text-primary">TGN</p>
            <p class="font-semibold text-slate-900">Mobilité voyageurs</p>
          </div>
        </RouterLink>
        <nav class="hidden items-center gap-2 lg:flex">
          <RouterLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            :class="[
              'rounded-xl px-3 py-2 text-sm font-medium transition',
              isActive(item) ? 'bg-blue-50 text-primary' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
            ]"
          >
            {{ item.label }}
          </RouterLink>
        </nav>
        <div class="flex items-center gap-3">
          <NotificationBadge :count="unreadCount">
            <RouterLink to="/client/notifications" class="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-lg shadow-sm">🔔</RouterLink>
          </NotificationBadge>
          <button class="hidden rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white sm:block" @click="logout">
            Déconnexion
          </button>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-7xl px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-8">
      <RouterView />
    </main>

    <nav class="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 px-2 py-2 backdrop-blur lg:hidden">
      <div class="grid grid-cols-5 gap-1">
        <RouterLink
          v-for="item in navigation.slice(0, 5)"
          :key="item.to"
          :to="item.to"
          :class="[
            'flex flex-col items-center rounded-2xl px-2 py-2 text-xs font-medium transition',
            isActive(item) ? 'bg-blue-50 text-primary' : 'text-slate-500',
          ]"
        >
          <span class="text-base">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </RouterLink>
      </div>
    </nav>
  </div>
</template>
