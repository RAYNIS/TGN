<script setup>
defineProps({
  count: { type: Number, default: 0 },
})
</script>

<template>
  <div class="relative inline-flex">
    <slot>
      <span class="text-xl">🔔</span>
    </slot>
    <span
      v-if="count > 0"
      class="absolute -right-2 -top-2 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-white"
    >
      {{ count }}
    </span>
  </div>
</template>
