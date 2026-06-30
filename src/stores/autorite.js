import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAutoriteStore = defineStore('autorite', () => {
  const overviewKpis = ref([
    { title: 'Réseaux supervisés', value: '12', trend: '+2 extensions', tone: 'primary' },
    { title: 'Voyages quotidiens', value: '186K', trend: '+4.1%', tone: 'accent' },
    { title: 'Conformité service', value: '94%', trend: 'niveau élevé', tone: 'success' },
    { title: 'Subvention par km', value: '1.84 €', trend: '-0.08 €', tone: 'info' },
  ])

  const operators = ref([
    { name: 'TransUrbis', mode: 'Bus & tram', punctuality: '92%', ridership: '81k', satisfaction: '4.5/5', compliance: '96%' },
    { name: 'Mobilité Centre', mode: 'BRT', punctuality: '95%', ridership: '54k', satisfaction: '4.6/5', compliance: '98%' },
    { name: 'Navette Littorale', mode: 'Bus express', punctuality: '87%', ridership: '23k', satisfaction: '4.2/5', compliance: '91%' },
  ])

  const validations = ref([
    { id: 'VAL-100', operator: 'TransUrbis', line: 'L1', requestedAt: 'Aujourd’hui 08:10', change: 'Renfort 2 départs', impact: 'Capacité +8%', status: 'À instruire' },
    { id: 'VAL-101', operator: 'Mobilité Centre', line: 'BRT-C', requestedAt: 'Aujourd’hui 09:02', change: 'Décalage horaire', impact: 'Ponctualité +2 pts', status: 'Analyse avancée' },
    { id: 'VAL-102', operator: 'Navette Littorale', line: 'NL-4', requestedAt: 'Hier 17:45', change: 'Suppression arrêt', impact: 'Réclamations à vérifier', status: 'En attente pièces' },
  ])

  const tariffs = ref([
    { label: 'Ticket urbain standard', price: '350 FCFA', audience: 'Grand public', policy: 'Tarif de base', review: 'Trimestrielle' },
    { label: 'Abonnement étudiant', price: '8 500 FCFA', audience: 'Étudiants', policy: 'Réduction 40%', review: 'Semestrielle' },
    { label: 'Pass intermodal 30 jours', price: '21 000 FCFA', audience: 'Commuters', policy: 'Bus + tram + BRT', review: 'Mensuelle' },
  ])

  const analytics = ref([
    { corridor: 'Nord', traffic: 'Élevé', ridership: '58k', profitability: '76%', emissions: '-18%' },
    { corridor: 'Centre', traffic: 'Saturé', ridership: '71k', profitability: '82%', emissions: '-24%' },
    { corridor: 'Est', traffic: 'Stable', ridership: '39k', profitability: '69%', emissions: '-12%' },
    { corridor: 'Sud', traffic: 'Croissance', ridership: '18k', profitability: '61%', emissions: '-7%' },
  ])

  const audits = ref([
    { id: 'AUD-09', area: 'Sécurité à bord', owner: 'Inspection générale', dueDate: '26/04/2025', status: 'Planifié', evidence: 'Checklist 96%' },
    { id: 'AUD-10', area: 'Conformité billettique', owner: 'Régulation tarifaire', dueDate: '30/04/2025', status: 'En cours', evidence: '12 anomalies mineures' },
    { id: 'AUD-11', area: 'Accessibilité PMR', owner: 'Mission qualité', dueDate: '03/05/2025', status: 'Préparation', evidence: 'Visites terrain à lancer' },
  ])

  const monitoringAlerts = ref([
    { zone: 'Corridor centre', message: 'Charge voyageurs > 90% sur 2 créneaux', level: 'Élevé' },
    { zone: 'Littoral', message: 'Retard moyen de 6 min ce matin', level: 'Moyen' },
    { zone: 'Pôle universitaire', message: 'Satisfaction en hausse grâce au renfort', level: 'Info' },
  ])

  const demandLabels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
  const demandSeries = [162, 174, 171, 178, 186, 139, 112]
  const complianceSeries = [91, 92, 94, 93, 95, 94, 96]
  const profitabilitySeries = [71, 73, 76, 78]

  return {
    overviewKpis,
    operators,
    validations,
    tariffs,
    analytics,
    audits,
    monitoringAlerts,
    demandLabels,
    demandSeries,
    complianceSeries,
    profitabilitySeries,
  }
})
