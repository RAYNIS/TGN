<script setup>
const model = defineModel({ type: String, default: '' })
defineProps({
  placeholder: { type: String, default: 'Rechercher...' },
})
</script>

<template>
  <label class="relative block">
    <span class="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">🔎</span>
    <input v-model="model" :placeholder="placeholder" class="input-field pl-11" type="search" />
  </label>
</template>
