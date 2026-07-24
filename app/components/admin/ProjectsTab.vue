<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-bold">Projects</h2>
      <button @click="openModal()" class="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
        + Add Project
      </button>
    </div>

    <div v-if="loading" class="flex justify-center p-10">
      <LucideLoader2 class="w-8 h-8 animate-spin text-primary" />
    </div>
    <div v-else-if="items.length === 0" class="text-center p-10 text-gray-400">
      No projects found. Create one!
    </div>
    <div v-else class="space-y-4">
      <div v-for="item in items" :key="item.id" class="glass-panel p-6 rounded-2xl flex justify-between items-center group">
        <div class="flex-1">
          <h3 class="font-bold text-lg mb-1">{{ item.title }}</h3>
          <p class="text-sm text-gray-400 line-clamp-1 mb-2">{{ item.description }}</p>
          <div class="flex flex-wrap gap-2">
            <span v-for="tech in item.tech_stack" :key="tech" class="text-xs bg-white/10 px-2 py-1 rounded text-gray-300">
              {{ tech }}
            </span>
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
              <h3 class="text-xl font-bold">{{ isEditing ? 'Edit' : 'Add' }} Project</h3>
              <button @click="closeModal" class="text-gray-400 hover:text-white">
                <LucideX class="w-5 h-5" />
              </button>
            </div>

        <form @submit.prevent="save" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Project Image</label>
            <input type="file" accept="image/*" @change="onFileChange" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/80" />
            
            <div v-if="imageSrc" class="mt-4 border border-white/10 rounded-xl overflow-hidden h-64 relative">
              <img :src="imageSrc" class="w-full h-full object-cover" />
            </div>
            <div v-else-if="form.image_url" class="mt-4 border border-white/10 rounded-xl overflow-hidden h-64 relative">
              <img :src="form.image_url" class="w-full h-full object-cover" />
              <div class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                 <span class="text-white text-sm">Upload new image to replace</span>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Title</label>
            <input v-model="form.title" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-primary/50" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Description</label>
            <textarea v-model="form.description" rows="3" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-primary/50"></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Tech Stack</label>
            <div class="space-y-2 mb-2">
              <div v-for="(tech, idx) in form.tech_stack" :key="idx" class="flex gap-2">
                <input v-model="form.tech_stack[idx]" required placeholder="e.g. Vue, Node.js..." class="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-primary/50" />
                <button type="button" @click="removeTech(idx)" class="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                  <LucideTrash2 class="w-4 h-4" />
                </button>
              </div>
            </div>
            <button type="button" @click="addTech" class="text-xs text-primary hover:text-primary/80 flex items-center gap-1">
              <LucidePlus class="w-3 h-3" /> Add Tech
            </button>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">GitHub URL (Optional)</label>
              <input v-model="form.github_url" type="url" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-primary/50" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Live URL (Optional)</label>
              <input v-model="form.live_url" type="url" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-primary/50" />
            </div>
          </div>

          <div class="pt-4 flex justify-end gap-3">
            <button type="button" @click="closeModal" class="px-5 py-2.5 rounded-xl text-gray-400 hover:text-white transition-colors">Cancel</button>
            <button type="submit" :disabled="saving" class="bg-primary hover:bg-primary/80 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl transition-colors font-medium flex items-center gap-2">
              <LucideLoader2 v-if="saving" class="w-4 h-4 animate-spin" />
              Save Project
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
    title="Delete Project"
    message="Are you sure you want to delete this project? This action cannot be undone."
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
  title: '',
  description: '',
  tech_stack: [],
  github_url: '',
  live_url: '',
  image_url: ''
})

const imageSrc = ref(null)
const selectedFile = ref(null)

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    selectedFile.value = file
    imageSrc.value = URL.createObjectURL(file)
  }
}

const uploadImage = async () => {
  if (!selectedFile.value) return form.value.image_url;

  return new Promise(async (resolve, reject) => {
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`
    const { data, error } = await supabase.storage.from('projects').upload(fileName, selectedFile.value, {
      contentType: selectedFile.value.type
    })
    
    if (error) {
      alert('Error uploading image: ' + error.message)
      reject(error)
    } else {
      const { data: { publicUrl } } = supabase.storage.from('projects').getPublicUrl(fileName)
      resolve(publicUrl)
    }
  })
}

const fetchItems = async () => {
  loading.value = true
  const { data } = await supabase.from('projects').select('*').order('id', { ascending: true })
  if (data) items.value = data
  loading.value = false
}

onMounted(fetchItems)

const openModal = (item = null) => {
  imageSrc.value = null
  selectedFile.value = null
  if (item) {
    isEditing.value = true
    form.value = { ...item, tech_stack: [...(item.tech_stack || [])], image_url: item.image_url || '' }
  } else {
    isEditing.value = false
    form.value = { id: null, title: '', description: '', tech_stack: [''], github_url: '', live_url: '', image_url: '' }
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const addTech = () => {
  form.value.tech_stack.push('')
}

const removeTech = (index) => {
  form.value.tech_stack.splice(index, 1)
}

const save = async () => {
  try {
    saving.value = true
    // filter empty tech stack items
    const cleanedStack = form.value.tech_stack.filter(t => t.trim() !== '')
    
    const payload = {
      title: form.value.title,
      description: form.value.description,
      tech_stack: cleanedStack,
      github_url: form.value.github_url,
      live_url: form.value.live_url
    }

    if (imageSrc.value) {
      payload.image_url = await uploadImage()
    }

    if (isEditing.value) {
      await supabase.from('projects').update(payload).eq('id', form.value.id)
    } else {
      await supabase.from('projects').insert([payload])
    }
    
    closeModal()
    await fetchItems()
  } catch (e) {
    alert('Error saving project')
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
    await supabase.from('projects').delete().eq('id', itemToDelete.value)
    await fetchItems()
  } catch (e) {
    alert('Error deleting item: ' + e.message)
  } finally {
    showDeleteConfirm.value = false
    itemToDelete.value = null
  }
}
</script>
