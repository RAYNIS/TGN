import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useClientStore = defineStore('client', () => {
  const journeyResults = ref([
    { id: 'TRJ-01', origin: 'Plateau', destination: 'Aéroport', departure: '08:15', arrival: '09:02', duration: '47 min', price: '1 500 FCFA', mode: 'Bus express + navette', comfort: 'Wi-Fi, climatisation' },
    { id: 'TRJ-02', origin: 'UCAD', destination: 'Liberté 6', departure: '08:22', arrival: '08:48', duration: '26 min', price: '400 FCFA', mode: 'Tramway', comfort: 'Temps réel embarqué' },
    { id: 'TRJ-03', origin: 'Yoff', destination: 'Gare Centrale', departure: '08:30', arrival: '09:08', duration: '38 min', price: '700 FCFA', mode: 'Bus direct', comfort: 'Places assises restantes: 14' },
  ])

  const reservations = ref([
    { id: 'RSV-901', trip: 'Plateau → Aéroport', schedule: 'Aujourd’hui • 18:10', seat: '12A', status: 'Confirmée', payment: 'Carte Visa' },
    { id: 'RSV-902', trip: 'UCAD → Liberté 6', schedule: 'Demain • 07:40', seat: 'Libre', status: 'En attente', payment: 'Wave' },
  ])

  const history = ref([
    { id: 'HIS-1', route: 'Plateau → Yoff', date: '18/04/2025', amount: '650 FCFA', rating: 5 },
    { id: 'HIS-2', route: 'Gare Centrale → Diamniadio', date: '16/04/2025', amount: '1 200 FCFA', rating: 4 },
    { id: 'HIS-3', route: 'UCAD → Parcelles', date: '12/04/2025', amount: '400 FCFA', rating: 5 },
  ])

  const notifications = ref([
    { id: 1, title: 'Bus L1 en approche', content: 'Arrivée dans 4 minutes à votre arrêt favori.', category: 'Trajet', read: false, timestamp: 'À l’instant' },
    { id: 2, title: 'Promo pass 7 jours', content: 'Rechargez avant vendredi et bénéficiez de -10%.', category: 'Offre', read: false, timestamp: 'Il y a 1h' },
    { id: 3, title: 'Incident résolu', content: 'Le service BRT-C a repris normalement.', category: 'Info réseau', read: true, timestamp: 'Il y a 3h' },
  ])

  const favorites = ref([
    { id: 'FAV-1', label: 'Maison → Bureau', route: 'Liberté 6 → Plateau', schedule: '07:20', mode: 'Bus direct' },
    { id: 'FAV-2', label: 'Campus → Maison', route: 'UCAD → Yoff', schedule: '18:05', mode: 'Tramway' },
  ])

  const payments = ref([
    { id: 'PAY-1', method: 'Carte Visa **** 2244', type: 'Carte bancaire', default: true, expires: '10/27' },
    { id: 'PAY-2', method: 'Wave +221 77 000 00 00', type: 'Mobile money', default: false, expires: 'Actif' },
  ])

  const liveVehicles = ref([
    { id: 'CLI-1', title: 'Ligne L1 • Bus express', lat: 14.7081, lng: -17.4565, status: 'Dans 4 min', popup: 'Prochain arrêt: Sacré-Cœur' },
    { id: 'CLI-2', title: 'Tramway Campus', lat: 14.6929, lng: -17.4518, status: 'À l’heure', popup: 'Occupation modérée · arrivée 08:22' },
  ])

  function searchJourneys(payload) {
    const origin = payload.origin?.trim() || 'Plateau'
    const destination = payload.destination?.trim() || 'Aéroport'
    journeyResults.value = journeyResults.value.map((journey, index) => ({
      ...journey,
      id: `TRJ-0${index + 1}`,
      origin,
      destination,
    }))
  }

  function addReservation(journey) {
    reservations.value.unshift({
      id: `RSV-${900 + reservations.value.length + 1}`,
      trip: `${journey.origin} → ${journey.destination}`,
      schedule: `Aujourd’hui • ${journey.departure}`,
      seat: 'Attribué automatiquement',
      status: 'Confirmée',
      payment: 'Carte par défaut',
    })
  }

  function markNotificationAsRead(notificationId) {
    const notification = notifications.value.find((item) => item.id === notificationId)
    if (notification) {
      notification.read = true
    }
  }

  function addFavorite(favorite) {
    favorites.value.unshift({ id: `FAV-${favorites.value.length + 1}`, ...favorite })
  }

  return {
    journeyResults,
    reservations,
    history,
    notifications,
    favorites,
    payments,
    liveVehicles,
    searchJourneys,
    addReservation,
    markNotificationAsRead,
    addFavorite,
  }
})
