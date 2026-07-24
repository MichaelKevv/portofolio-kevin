<template>
  <div class="min-h-screen bg-background text-foreground flex">
    <!-- Sidebar -->
    <aside class="w-64 border-r border-white/10 bg-black/20 p-6 flex flex-col h-screen sticky top-0">
      <div class="flex items-center gap-3 mb-10">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
            <span class="text-white font-bold">M</span>
        </div>
        <span class="font-bold text-lg">CMS Admin</span>
      </div>

      <nav class="space-y-2 flex-1">
        <NuxtLink to="/admin/profile" active-class="bg-primary/20 text-primary" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-gray-400 hover:bg-white/5 hover:text-white">
          <LucideUser class="w-5 h-5" /> Profile
        </NuxtLink>
        <NuxtLink to="/admin/projects" active-class="bg-primary/20 text-primary" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-gray-400 hover:bg-white/5 hover:text-white">
          <LucideBriefcase class="w-5 h-5" /> Projects
        </NuxtLink>
        <NuxtLink to="/admin/skills" active-class="bg-primary/20 text-primary" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-gray-400 hover:bg-white/5 hover:text-white">
          <LucideCpu class="w-5 h-5" /> Skills
        </NuxtLink>
        <NuxtLink to="/admin/experience" active-class="bg-primary/20 text-primary" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-gray-400 hover:bg-white/5 hover:text-white">
          <LucideAward class="w-5 h-5" /> Experience
        </NuxtLink>
        <NuxtLink to="/admin/education" active-class="bg-primary/20 text-primary" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-gray-400 hover:bg-white/5 hover:text-white">
          <LucideGraduationCap class="w-5 h-5" /> Education
        </NuxtLink>
      </nav>

      <button @click="handleLogout" class="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors w-full">
        <LucideLogOut class="w-5 h-5" /> Sign Out
      </button>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-10 overflow-y-auto">
      <div class="max-w-4xl mx-auto">
        <header class="flex justify-between items-center mb-10">
          <h1 class="text-3xl font-bold capitalize">{{ route.name?.replace('admin-', '') || 'Admin' }} Management</h1>
          <a href="/" target="_blank" class="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors">
            View Live Site <LucideExternalLink class="w-4 h-4" />
          </a>
        </header>

        <!-- Render Child Routes Here -->
        <NuxtPage />
        
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
const route = useRoute()

const handleLogout = async () => {
  await supabase.auth.signOut()
  navigateTo('/login')
}
</script>
