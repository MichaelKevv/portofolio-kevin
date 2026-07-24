<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-bold">Education</h2>
      <button @click="openModal()" class="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
        + Add Education
      </button>
    </div>

    <div v-if="loading" class="flex justify-center p-10">
      <LucideLoader2 class="w-8 h-8 animate-spin text-primary" />
    </div>
    <div v-else-if="items.length === 0" class="text-center p-10 text-gray-400">
      No education records found. Create one!
    </div>
    <div v-else class="space-y-4">
      <div v-for="item in items" :key="item.id" class="glass-panel p-6 rounded-2xl flex justify-between items-center group">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-1">
            <h3 class="font-bold text-lg">{{ item.institution }}</h3>
            <span class="text-xs px-2 py-1 bg-white/10 rounded-full text-gray-300">{{ item.period }}</span>
          </div>
          <p class="text-sm text-accent mb-1">{{ item.degree }}</p>
          <p v-if="item.gpa" class="text-sm text-gray-300 mb-2 font-medium">GPA: {{ item.gpa }}</p>
          <p class="text-sm text-gray-400 mt-2 whitespace-pre-line">{{ item.description }}</p>
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
              <h3 class="text-xl font-bold">{{ isEditing ? 'Edit' : 'Add' }} Education</h3>
              <button @click="closeModal" class="text-gray-400 hover:text-white">
                <LucideX class="w-5 h-5" />
              </button>
            </div>

            <form @submit.prevent="save" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Institution</label>
            <input v-model="form.institution" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-primary/50" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Degree / Major</label>
              <input v-model="form.degree" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-primary/50" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Period (e.g. 2018-2022)</label>
              <input v-model="form.period" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-primary/50" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">GPA (Optional)</label>
            <input v-model="form.gpa" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-primary/50" placeholder="e.g. 3.8 / 4.0" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Description / Activities</label>
            <textarea v-model="form.description" rows="4" placeholder="Description about your education..." class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-primary/50 resize-y"></textarea>
          </div>

          <div class="pt-4 flex justify-end gap-3">
            <button type="button" @click="closeModal" class="px-5 py-2.5 rounded-xl text-gray-400 hover:text-white transition-colors">Cancel</button>
            <button type="submit" :disabled="saving" class="bg-primary hover:bg-primary/80 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl transition-colors font-medium flex items-center gap-2">
              <LucideLoader2 v-if="saving" class="w-4 h-4 animate-spin" />
              Save Education
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
    title="Delete Education"
    message="Are you sure you want to delete this education record? This action cannot be undone."
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
  institution: '',
  degree: '',
  period: '',
  gpa: '',
  description: ''
})

const fetchItems = async () => {
  loading.value = true
  const { data } = await supabase.from('education').select('*').order('id', { ascending: true })
  if (data) items.value = data
  loading.value = false
}

onMounted(fetchItems)

const openModal = (item = null) => {
  if (item) {
    isEditing.value = true
    form.value = { ...item, description: item.description || '' }
  } else {
    isEditing.value = false
    form.value = { id: null, institution: '', degree: '', period: '', gpa: '', description: '' }
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
      institution: form.value.institution,
      degree: form.value.degree,
      period: form.value.period,
      gpa: form.value.gpa,
      description: form.value.description
    }

    if (isEditing.value) {
      await supabase.from('education').update(payload).eq('id', form.value.id)
    } else {
      await supabase.from('education').insert([payload])
    }
    
    closeModal()
    await fetchItems()
  } catch (e) {
    alert('Error saving education: ' + e.message)
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
    await supabase.from('education').delete().eq('id', itemToDelete.value)
    await fetchItems()
  } catch (e) {
    alert('Error deleting item: ' + e.message)
  } finally {
    showDeleteConfirm.value = false
    itemToDelete.value = null
  }
}
</script>
