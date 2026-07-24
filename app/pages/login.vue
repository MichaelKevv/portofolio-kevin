<template>
  <div class="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
    <!-- Glow effects -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="glass-panel p-8 md:p-12 rounded-3xl w-full max-w-md relative z-10 neon-border">
      <div class="text-center mb-8">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(139,92,246,0.5)]">
            <span class="text-white text-2xl font-bold">M</span>
        </div>
        <h1 class="text-3xl font-bold text-white mb-2">Admin Panel</h1>
        <p class="text-gray-400 text-sm">Sign in to manage your portfolio</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
          <input 
            v-model="email" 
            type="email" 
            required
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
            placeholder="admin@example.com"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Password</label>
          <input 
            v-model="password" 
            type="password" 
            required
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
            placeholder="••••••••"
          >
        </div>

        <div v-if="errorMsg" class="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
          {{ errorMsg }}
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-primary hover:bg-primary/80 text-white font-semibold py-3 rounded-xl transition-all hover:shadow-[0_0_20px_-5px_rgba(139,92,246,0.6)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <LucideLoader2 v-if="loading" class="w-5 h-5 animate-spin" />
          <span>{{ loading ? 'Signing in...' : 'Sign In' }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

// If already logged in, redirect to admin
watchEffect(() => {
  if (user.value) {
    router.push('/admin')
  }
})

const handleLogin = async () => {
  try {
    loading.value = true
    errorMsg.value = ''
    
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (error) throw error
    
    router.push('/admin')
  } catch (error) {
    errorMsg.value = error.message || 'Failed to sign in'
  } finally {
    loading.value = false
  }
}
</script>
