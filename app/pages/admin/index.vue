<template>
  <div class="min-h-screen bg-background text-foreground flex">
    <!-- Sidebar -->
    <aside class="w-64 border-r border-white/10 bg-black/20 p-6 flex flex-col">
      <div class="flex items-center gap-3 mb-10">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
            <span class="text-white font-bold">M</span>
        </div>
        <span class="font-bold text-lg">CMS Admin</span>
      </div>

      <nav class="space-y-2 flex-1">
        <button @click="activeTab = 'profile'" :class="['w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors', activeTab === 'profile' ? 'bg-primary/20 text-primary' : 'text-gray-400 hover:bg-white/5 hover:text-white']">
          <LucideUser class="w-5 h-5" /> Profile
        </button>
        <button @click="activeTab = 'projects'" :class="['w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors', activeTab === 'projects' ? 'bg-primary/20 text-primary' : 'text-gray-400 hover:bg-white/5 hover:text-white']">
          <LucideBriefcase class="w-5 h-5" /> Projects
        </button>
        <button @click="activeTab = 'skills'" :class="['w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors', activeTab === 'skills' ? 'bg-primary/20 text-primary' : 'text-gray-400 hover:bg-white/5 hover:text-white']">
          <LucideCpu class="w-5 h-5" /> Skills
        </button>
        <button @click="activeTab = 'experience'" :class="['w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors', activeTab === 'experience' ? 'bg-primary/20 text-primary' : 'text-gray-400 hover:bg-white/5 hover:text-white']">
          <LucideAward class="w-5 h-5" /> Experience
        </button>
      </nav>

      <button @click="handleLogout" class="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors w-full">
        <LucideLogOut class="w-5 h-5" /> Sign Out
      </button>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-10 overflow-y-auto">
      <div class="max-w-4xl mx-auto">
        <header class="flex justify-between items-center mb-10">
          <h1 class="text-3xl font-bold capitalize">{{ activeTab }} Management</h1>
          <a href="/" target="_blank" class="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors">
            View Live Site <LucideExternalLink class="w-4 h-4" />
          </a>
        </header>

        <AdminProfileTab v-if="activeTab === 'profile'" />
        <AdminProjectsTab v-if="activeTab === 'projects'" />
        <AdminSkillsTab v-if="activeTab === 'skills'" />
        <AdminExperienceTab v-if="activeTab === 'experience'" />
        
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: [
    function (to, from) {
      const user = useSupabaseUser()
      if (!user.value) {
        return navigateTo('/login')
      }
    }
  ]
})

const supabase = useSupabaseClient()
const activeTab = ref('profile')

const handleLogout = async () => {
  await supabase.auth.signOut()
  navigateTo('/login')
}
</script>
