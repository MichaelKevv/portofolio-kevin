<template>
  <ClientOnly>
    <Teleport to="body">
      <div v-if="isOpen" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
        <div class="glass-card p-8 w-full max-w-md mx-4 shadow-2xl border border-white/10 animate-[zoom-in_0.2s_ease-out]">
          <div class="flex items-center gap-4 mb-4 text-red-400">
            <LucideAlertTriangle class="w-8 h-8" />
            <h3 class="text-xl font-bold text-white">{{ title }}</h3>
          </div>
          <p class="text-gray-300 mb-8">{{ message }}</p>
          
          <div class="flex justify-end gap-4">
            <button @click="cancel" class="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/5">
              Cancel
            </button>
            <button @click="confirm" class="px-6 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500/50 font-medium transition-colors flex items-center gap-2">
              <LucideTrash2 class="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  title: { type: String, default: 'Confirm Action' },
  message: { type: String, default: 'Are you sure you want to proceed?' }
})

const emit = defineEmits(['confirm', 'cancel'])

const confirm = () => emit('confirm')
const cancel = () => emit('cancel')
</script>

<style scoped>
@keyframes zoom-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
