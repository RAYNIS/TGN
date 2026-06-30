import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const roleConfig = {
  exploitant: {
    label: 'Admin Exploitant',
    home: '/exploitant',
    profile: 'Société TransUrbis',
    initials: 'EX',
  },
  autorite: {
    label: 'Admin Autorité',
    home: '/autorite',
    profile: 'Autorité Organisatrice',
    initials: 'AU',
  },
  client: {
    label: 'App Client',
    home: '/client',
    profile: 'Voyageur Premium',
    initials: 'CL',
  },
}

export const useAuthStore = defineStore('auth', () => {
  const savedRole = localStorage.getItem('tgn-role') || ''
  const savedUser = localStorage.getItem('tgn-user')

  const role = ref(savedRole)
  const user = ref(savedUser ? JSON.parse(savedUser) : null)

  const isAuthenticated = computed(() => Boolean(role.value && user.value))
  const currentRoleConfig = computed(() => roleConfig[role.value] || null)
  const defaultRoute = computed(() => currentRoleConfig.value?.home || '/login')

  const availableRoles = Object.entries(roleConfig).map(([value, config]) => ({
    value,
    ...config,
  }))

  function loginAs(selectedRole) {
    const config = roleConfig[selectedRole]
    if (!config) {
      return '/login'
    }

    role.value = selectedRole
    user.value = {
      name: config.profile,
      email: `${selectedRole}@tgn.local`,
      initials: config.initials,
      roleLabel: config.label,
    }

    localStorage.setItem('tgn-role', role.value)
    localStorage.setItem('tgn-user', JSON.stringify(user.value))

    return config.home
  }

  function logout() {
    role.value = ''
    user.value = null
    localStorage.removeItem('tgn-role')
    localStorage.removeItem('tgn-user')
  }

  function hasRole(expectedRole) {
    return role.value === expectedRole
  }

  return {
    role,
    user,
    isAuthenticated,
    availableRoles,
    currentRoleConfig,
    defaultRoute,
    loginAs,
    logout,
    hasRole,
  }
})
