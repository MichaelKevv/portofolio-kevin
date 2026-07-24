<template>
  <div class="glass-panel p-8 rounded-2xl">
    <div v-if="loading" class="flex justify-center p-10">
      <LucideLoader2 class="w-8 h-8 animate-spin text-primary" />
    </div>
    <form v-else @submit.prevent="save" class="space-y-6">
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Name</label>
          <input v-model="form.name" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Email</label>
          <input v-model="form.email" type="email" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50" />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-400 mb-2">Short Bio</label>
        <textarea v-model="form.bio" rows="2" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50"></textarea>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-400 mb-2">Full Description</label>
        <textarea v-model="form.description" rows="5" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50"></textarea>
      </div>
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Years of Exp</label>
          <input v-model="form.years_experience" type="number" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Projects Completed</label>
          <input v-model="form.projects_completed" type="number" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50" />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">LinkedIn URL</label>
          <input v-model="form.linkedin" placeholder="https://linkedin.com/in/..." class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">GitHub URL</label>
          <input v-model="form.github" placeholder="https://github.com/..." class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Instagram URL</label>
          <input v-model="form.instagram" placeholder="https://instagram.com/..." class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">WhatsApp Number</label>
          <input v-model="form.whatsapp" placeholder="+628..." class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50" />
        </div>
      </div>
      <div class="flex justify-end items-center gap-4">
        <span v-if="successMsg" class="text-green-400 text-sm flex items-center gap-1"><LucideCheckCircle class="w-4 h-4"/> {{ successMsg }}</span>
        <span v-if="errorMsg" class="text-red-400 text-sm">{{ errorMsg }}</span>
        <button type="submit" :disabled="saving" class="bg-primary hover:bg-primary/80 disabled:opacity-50 text-white px-6 py-3 rounded-xl transition-colors font-medium flex items-center gap-2">
          <LucideLoader2 v-if="saving" class="w-4 h-4 animate-spin" />
          Save Changes
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const loading = ref(true)
const saving = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

const form = ref({
  id: null,
  name: '',
  email: '',
  bio: '',
  description: '',
  years_experience: 0,
  projects_completed: 0,
  linkedin: '',
  instagram: '',
  whatsapp: '',
  github: ''
})

onMounted(async () => {
  try {
    const { data } = await supabase.from('profile').select('*').single()
    if (data) {
      form.value = { ...data }
    }
  } catch (e) {
    errorMsg.value = 'Failed to load profile'
  } finally {
    loading.value = false
  }
})

const save = async () => {
  try {
    saving.value = true
    successMsg.value = ''
    errorMsg.value = ''
    
    const { error } = await supabase
      .from('profile')
      .update({
        name: form.value.name,
        bio: form.value.bio,
        description: form.value.description,
        email: form.value.email,
        years_experience: form.value.years_experience,
        projects_completed: form.value.projects_completed,
        linkedin: form.value.linkedin,
        instagram: form.value.instagram,
        whatsapp: form.value.whatsapp,
        github: form.value.github
      })
      .eq('id', form.value.id)
      
    if (error) throw error
    
    successMsg.value = 'Profile updated successfully!'
    setTimeout(() => { successMsg.value = '' }, 3000)
  } catch (e) {
    errorMsg.value = e.message || 'Error updating profile'
  } finally {
    saving.value = false
  }
}
</script>
