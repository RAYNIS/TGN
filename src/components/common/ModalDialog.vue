<script setup>
defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
})

const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4" @click.self="emit('close')">
        <div class="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
          <div class="card-header">
            <div>
              <h3 class="section-title">{{ title }}</h3>
              <p v-if="description" class="section-subtitle">{{ description }}</p>
            </div>
            <button class="btn-secondary !px-3 !py-2" @click="emit('close')">Fermer</button>
          </div>
          <div>
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
