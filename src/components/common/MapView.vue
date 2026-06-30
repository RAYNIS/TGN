<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const props = defineProps({
  center: { type: Array, default: () => [14.6937, -17.4441] },
  zoom: { type: Number, default: 12 },
  markers: { type: Array, default: () => [] },
  polylines: { type: Array, default: () => [] },
  heightClass: { type: String, default: 'h-[420px]' },
})

const mapContainer = ref(null)
let mapInstance
let layerGroup

function renderMarkers() {
  if (!layerGroup) return
  layerGroup.clearLayers()

  props.markers.forEach((marker) => {
    const leafletMarker = L.marker([marker.lat, marker.lng]).addTo(layerGroup)
    leafletMarker.bindPopup(`
      <div style="min-width:200px">
        <strong>${marker.title}</strong><br />
        <span>${marker.status || ''}</span><br />
        <small>${marker.popup || ''}</small>
      </div>
    `)
  })

  props.polylines.forEach((polyline) => {
    L.polyline(polyline.points, {
      color: polyline.color || '#1E40AF',
      weight: polyline.weight || 4,
      opacity: 0.75,
      dashArray: polyline.dashArray,
    }).addTo(layerGroup)
  })
}

onMounted(async () => {
  await nextTick()
  mapInstance = L.map(mapContainer.value, { zoomControl: false }).setView(props.center, props.zoom)
  L.control.zoom({ position: 'bottomright' }).addTo(mapInstance)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(mapInstance)

  layerGroup = L.layerGroup().addTo(mapInstance)
  renderMarkers()
  setTimeout(() => mapInstance.invalidateSize(), 100)
})

watch(
  () => [props.markers, props.polylines],
  () => renderMarkers(),
  { deep: true },
)

watch(
  () => props.center,
  (center) => {
    if (mapInstance) {
      mapInstance.setView(center, props.zoom)
    }
  },
)

onBeforeUnmount(() => {
  if (mapInstance) {
    mapInstance.remove()
  }
})
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div ref="mapContainer" :class="heightClass"></div>
  </div>
</template>
