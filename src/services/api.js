import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 5000,
})

api.interceptors.request.use((config) => {
  const role = localStorage.getItem('tgn-role')
  if (role) {
    config.headers['X-TGN-Role'] = role
  }
  return config
})

const mockPayloads = {
  exploitant: {
    summary: 'Vue consolidée des opérations réseau',
    updatedAt: 'Aujourd’hui 10:15',
  },
  autorite: {
    summary: 'Suivi réglementaire et performance multimodale',
    updatedAt: 'Aujourd’hui 10:20',
  },
  client: {
    summary: 'Recherche, réservation et suivi temps réel',
    updatedAt: 'Aujourd’hui 10:22',
  },
}

const wait = (data, delay = 250) => new Promise((resolve) => setTimeout(() => resolve({ data }), delay))

export const apiService = {
  login(role) {
    return wait({ token: `mock-${role}-token`, role })
  },
  getDashboard(role) {
    return wait(mockPayloads[role] || mockPayloads.client)
  },
  list(resource) {
    return wait({ resource, items: [] })
  },
  post(resource, payload) {
    return wait({ resource, payload, status: 'created' })
  },
}

export default api
