<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  value: { type: String, required: true },
  trend: { type: String, default: '' },
  tone: { type: String, default: 'primary' },
})

const toneClasses = computed(() => ({
  primary: 'from-blue-700 to-blue-500 text-white',
  accent: 'from-orange-500 to-amber-400 text-white',
  success: 'from-emerald-600 to-emerald-400 text-white',
  info: 'from-slate-800 to-slate-600 text-white',
}[props.tone] || 'from-blue-700 to-blue-500 text-white'))
</script>

<template>
  <article :class="['overflow-hidden rounded-2xl bg-gradient-to-br p-[1px] shadow-soft', toneClasses]">
    <div class="h-full rounded-[15px] bg-white/10 p-5 backdrop-blur-sm">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-sm font-medium text-white/80">{{ title }}</p>
          <h3 class="mt-3 text-3xl font-bold tracking-tight">{{ value }}</h3>
        </div>
        <div class="rounded-2xl bg-white/15 p-3">
          <slot>🚍</slot>
        </div>
      </div>
      <p class="mt-5 text-sm text-white/85">{{ trend }}</p>
    </div>
  </article>
</template>
