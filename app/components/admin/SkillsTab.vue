<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-bold">Skills</h2>
      <button @click="openModal()" class="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
        + Add Skill
      </button>
    </div>

    <div v-if="loading" class="flex justify-center p-10">
      <LucideLoader2 class="w-8 h-8 animate-spin text-primary" />
    </div>
    <div v-else-if="items.length === 0" class="text-center p-10 text-gray-400">
      No skills found. Create one!
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="item in items" :key="item.id" class="glass-panel p-6 rounded-2xl flex justify-between items-center group">
        <div class="flex items-center gap-4 flex-1">
          <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
             <Icon v-if="item.icon.includes(':')" :name="item.icon" class="w-6 h-6" />
             <Icon v-else :name="`lucide:${item.icon}`" class="text-white w-5 h-5" />
          </div>
          <div>
            <h3 class="font-bold text-lg mb-0.5">{{ item.name }}</h3>
            <p class="text-sm text-gray-400 line-clamp-1 mb-0">{{ item.description }}</p>
          </div>
        </div>
        <div class="flex gap-2 ml-4">
          <button @click="openModal(item)" class="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 transition-colors">
            <LucideEdit class="w-4 h-4" />
          </button>
          <button @click="confirmDelete(item.id)" class="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
            <LucideTrash2 class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <ClientOnly>
      <Teleport to="body">
        <div v-if="isModalOpen" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div class="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-bold">{{ isEditing ? 'Edit' : 'Add' }} Skill</h3>
              <button @click="closeModal" class="text-gray-400 hover:text-white">
                <LucideX class="w-5 h-5" />
              </button>
            </div>

            <form @submit.prevent="save" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Name</label>
            <input v-model="form.name" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-primary/50" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Icon Type</label>
            <select v-model="form.icon" required class="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-primary/50">
              <optgroup label="Popular Tech Stack">
                <option value="logos:laravel">Laravel</option>
                <option value="logos:php">PHP</option>
                <option value="logos:vue">Vue.js</option>
                <option value="logos:nuxt-icon">Nuxt.js</option>
                <option value="logos:react">React</option>
                <option value="logos:flutter">Flutter</option>
                <option value="logos:bootstrap">Bootstrap 5</option>
                <option value="logos:tailwindcss-icon">Tailwind CSS</option>
                <option value="logos:javascript">JavaScript</option>
                <option value="logos:typescript-icon">TypeScript</option>
                <option value="logos:python">Python</option>
                <option value="logos:mysql">MySQL</option>
                <option value="logos:mariadb-icon">MariaDB</option>
                <option value="logos:postgresql">PostgreSQL</option>
                <option value="logos:git-icon">Git</option>
                <option value="logos:docker-icon">Docker</option>
                <option value="logos:gitlab">GitLab CI/CD</option>
                <option value="logos:ubuntu">Ubuntu</option>
                <option value="logos:linux-tux">WSL2 / Linux</option>
                <option value="logos:nginx">Nginx</option>
                <option value="logos:apache">Apache</option>
                <option value="logos:cloudflare-icon">Cloudflare</option>
                <option value="logos:figma">Figma</option>
                <option value="logos:html-5">HTML5</option>
                <option value="logos:css-3">CSS3</option>
              </optgroup>
              <optgroup label="System & Tools (Iconify)">
                <option value="mdi:api">REST API</option>
                <option value="lucide:server">Coolify / Server</option>
                <option value="mdi:shield-lock-outline">SSL / Security</option>
                <option value="mdi:clock-outline">Cron / Scheduler</option>
                <option value="mdi:cog-box">Supervisor / Process</option>
              </optgroup>
              <optgroup label="Generic (Legacy)">
                <option value="braces">Code (Braces)</option>
                <option value="server">Server</option>
                <option value="database">Database</option>
                <option value="smartphone">Mobile (Smartphone)</option>
                <option value="zap">Performance (Zap)</option>
                <option value="layers">Architecture (Layers)</option>
                <option value="box">Other (Box)</option>
              </optgroup>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Description (Optional)</label>
            <textarea v-model="form.description" rows="3" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-primary/50"></textarea>
          </div>

          <div class="pt-4 flex justify-end gap-3">
            <button type="button" @click="closeModal" class="px-5 py-2.5 rounded-xl text-gray-400 hover:text-white transition-colors">Cancel</button>
            <button type="submit" :disabled="saving" class="bg-primary hover:bg-primary/80 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl transition-colors font-medium flex items-center gap-2">
              <LucideLoader2 v-if="saving" class="w-4 h-4 animate-spin" />
              Save Skill
            </button>
          </div>
        </form>
      </div>
    </div>
      </Teleport>
    </ClientOnly>
  </div>
  
  <AdminConfirmDialog 
    :is-open="showDeleteConfirm"
    title="Delete Skill"
    message="Are you sure you want to delete this skill? This action cannot be undone."
    @confirm="executeDelete"
    @cancel="showDeleteConfirm = false"
  />
</template>

<script setup>
const supabase = useSupabaseClient()
const items = ref([])
const loading = ref(true)

const isModalOpen = ref(false)
const isEditing = ref(false)
const saving = ref(false)

const form = ref({
  id: null,
  name: '',
  icon: 'braces',
  description: ''
})

const fetchItems = async () => {
  loading.value = true
  const { data } = await supabase.from('skills').select('*').order('id', { ascending: true })
  if (data) items.value = data
  loading.value = false
}

onMounted(fetchItems)

const openModal = (item = null) => {
  if (item) {
    isEditing.value = true
    form.value = { ...item }
  } else {
    isEditing.value = false
    form.value = { id: null, name: '', icon: 'braces', description: '' }
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const save = async () => {
  try {
    saving.value = true
    const payload = {
      name: form.value.name,
      icon: form.value.icon,
      description: form.value.description
    }

    if (isEditing.value) {
      await supabase.from('skills').update(payload).eq('id', form.value.id)
    } else {
      await supabase.from('skills').insert([payload])
    }
    
    closeModal()
    await fetchItems()
  } catch (e) {
    alert('Error saving skill')
  } finally {
    saving.value = false
  }
}

const showDeleteConfirm = ref(false)
const itemToDelete = ref(null)

const confirmDelete = (id) => {
  itemToDelete.value = id
  showDeleteConfirm.value = true
}

const executeDelete = async () => {
  if (!itemToDelete.value) return
  
  try {
    const { error } = await supabase.from('skills').delete().eq('id', itemToDelete.value)
    if (error) throw error
    items.value = items.value.filter(i => i.id !== itemToDelete.value)
  } catch (e) {
    alert('Error deleting item: ' + e.message)
  } finally {
    showDeleteConfirm.value = false
    itemToDelete.value = null
  }
}
</script>
