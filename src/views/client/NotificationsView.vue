<script setup>
import { computed } from 'vue'
import { useClientStore } from '@/stores/client'

const store = useClientStore()
const unreadCount = computed(() => store.notifications.filter((item) => !item.read).length)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold">Notifications & alertes</h1>
        <p class="text-sm text-slate-500">Suivi des incidents, offres promotionnelles et rappels de trajets.</p>
      </div>
      <span class="badge-warning">{{ unreadCount }} non lues</span>
    </div>

    <div class="space-y-4">
      <article v-for="notification in store.notifications" :key="notification.id" class="card">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div class="flex items-center gap-3">
              <span :class="notification.read ? 'badge-info' : 'badge-warning'">{{ notification.category }}</span>
              <span class="text-sm text-slate-400">{{ notification.timestamp }}</span>
            </div>
            <h3 class="mt-3 text-lg font-semibold">{{ notification.title }}</h3>
            <p class="mt-2 text-sm text-slate-500">{{ notification.content }}</p>
          </div>
          <button v-if="!notification.read" class="btn-secondary !px-3 !py-2" @click="store.markNotificationAsRead(notification.id)">
            Marquer comme lue
          </button>
        </div>
      </article>
    </div>
  </div>
</template>
