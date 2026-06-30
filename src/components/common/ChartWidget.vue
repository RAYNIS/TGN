<script setup>
import { computed } from 'vue'
import { Bar, Doughnut, Line } from 'vue-chartjs'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'

ChartJS.register(ArcElement, BarElement, CategoryScale, Filler, Legend, LineElement, LinearScale, PointElement, Title, Tooltip)

const props = defineProps({
  title: { type: String, default: '' },
  type: { type: String, default: 'line' },
  chartData: { type: Object, required: true },
  options: { type: Object, default: () => ({}) },
  heightClass: { type: String, default: 'h-80' },
})

const chartComponent = computed(() => ({
  bar: Bar,
  doughnut: Doughnut,
  line: Line,
}[props.type] || Line))

const mergedOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#475569',
        usePointStyle: true,
      },
    },
  },
  scales: props.type === 'doughnut'
    ? undefined
    : {
        x: { grid: { display: false }, ticks: { color: '#64748B' } },
        y: { grid: { color: '#E2E8F0' }, ticks: { color: '#64748B' } },
      },
  ...props.options,
}))
</script>

<template>
  <div class="card">
    <div v-if="title" class="card-header">
      <div>
        <h3 class="section-title">{{ title }}</h3>
      </div>
      <slot name="actions" />
    </div>
    <div :class="heightClass">
      <component :is="chartComponent" :data="chartData" :options="mergedOptions" />
    </div>
  </div>
</template>
