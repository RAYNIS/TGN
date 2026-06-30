import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoginView from '@/views/auth/LoginView.vue'
import ExploitantLayout from '@/components/layout/ExploitantLayout.vue'
import AutoriteLayout from '@/components/layout/AutoriteLayout.vue'
import ClientLayout from '@/components/layout/ClientLayout.vue'
import ExploitantDashboardView from '@/views/exploitant/DashboardView.vue'
import ExploitantLignesView from '@/views/exploitant/LignesView.vue'
import ExploitantVehiculesView from '@/views/exploitant/VehiculesView.vue'
import ExploitantHorairesView from '@/views/exploitant/HorairesView.vue'
import ExploitantConducteursView from '@/views/exploitant/ConduceteursView.vue'
import ExploitantSuiviView from '@/views/exploitant/SuiviView.vue'
import ExploitantRapportsView from '@/views/exploitant/RapportsView.vue'
import ExploitantIncidentsView from '@/views/exploitant/IncidentsView.vue'
import AutoriteDashboardView from '@/views/autorite/DashboardView.vue'
import AutoriteMonitoringView from '@/views/autorite/MonitoringView.vue'
import AutoriteRapportsView from '@/views/autorite/RapportsView.vue'
import AutoriteValidationView from '@/views/autorite/ValidationView.vue'
import AutoriteTarificationView from '@/views/autorite/TarificationView.vue'
import AutoriteAnalyticsView from '@/views/autorite/AnalyticsView.vue'
import AutoriteAuditView from '@/views/autorite/AuditView.vue'
import ClientHomeView from '@/views/client/HomeView.vue'
import ClientRechercheView from '@/views/client/RechercheView.vue'
import ClientReservationView from '@/views/client/ReservationView.vue'
import ClientSuiviView from '@/views/client/SuiviView.vue'
import ClientHistoriqueView from '@/views/client/HistoriqueView.vue'
import ClientNotificationsView from '@/views/client/NotificationsView.vue'
import ClientFavorisView from '@/views/client/FavorisView.vue'
import ClientPaiementView from '@/views/client/PaiementView.vue'
import ClientFeedbackView from '@/views/client/FeedbackView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/exploitant',
    component: ExploitantLayout,
    meta: { requiresAuth: true, role: 'exploitant' },
    children: [
      { path: '', name: 'exploitant-dashboard', component: ExploitantDashboardView },
      { path: 'lignes', name: 'exploitant-lignes', component: ExploitantLignesView },
      { path: 'vehicules', name: 'exploitant-vehicules', component: ExploitantVehiculesView },
      { path: 'horaires', name: 'exploitant-horaires', component: ExploitantHorairesView },
      { path: 'conducteurs', name: 'exploitant-conducteurs', component: ExploitantConducteursView },
      { path: 'suivi', name: 'exploitant-suivi', component: ExploitantSuiviView },
      { path: 'rapports', name: 'exploitant-rapports', component: ExploitantRapportsView },
      { path: 'incidents', name: 'exploitant-incidents', component: ExploitantIncidentsView },
    ],
  },
  {
    path: '/autorite',
    component: AutoriteLayout,
    meta: { requiresAuth: true, role: 'autorite' },
    children: [
      { path: '', name: 'autorite-dashboard', component: AutoriteDashboardView },
      { path: 'monitoring', name: 'autorite-monitoring', component: AutoriteMonitoringView },
      { path: 'rapports', name: 'autorite-rapports', component: AutoriteRapportsView },
      { path: 'validation', name: 'autorite-validation', component: AutoriteValidationView },
      { path: 'tarification', name: 'autorite-tarification', component: AutoriteTarificationView },
      { path: 'analytics', name: 'autorite-analytics', component: AutoriteAnalyticsView },
      { path: 'audit', name: 'autorite-audit', component: AutoriteAuditView },
    ],
  },
  {
    path: '/client',
    component: ClientLayout,
    meta: { requiresAuth: true, role: 'client' },
    children: [
      { path: '', name: 'client-home', component: ClientHomeView },
      { path: 'recherche', name: 'client-recherche', component: ClientRechercheView },
      { path: 'reservation', name: 'client-reservation', component: ClientReservationView },
      { path: 'suivi', name: 'client-suivi', component: ClientSuiviView },
      { path: 'historique', name: 'client-historique', component: ClientHistoriqueView },
      { path: 'notifications', name: 'client-notifications', component: ClientNotificationsView },
      { path: 'favoris', name: 'client-favoris', component: ClientFavorisView },
      { path: 'paiement', name: 'client-paiement', component: ClientPaiementView },
      { path: 'feedback', name: 'client-feedback', component: ClientFeedbackView },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.path === '/' || to.name === 'login') {
    if (to.name === 'login' && authStore.isAuthenticated) {
      return authStore.defaultRoute
    }
    return true
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login' }
  }

  if (to.meta.role && !authStore.hasRole(to.meta.role)) {
    return authStore.defaultRoute
  }

  return true
})

export default router
