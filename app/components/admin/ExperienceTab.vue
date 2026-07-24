<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-bold">Experience</h2>
      <button @click="openModal()" class="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
        + Add Experience
      </button>
    </div>

    <div v-if="loading" class="flex justify-center p-10">
      <LucideLoader2 class="w-8 h-8 animate-spin text-primary" />
    </div>
    <div v-else-if="items.length === 0" class="text-center p-10 text-gray-400">
      No experience records found. Create one!
    </div>
    <div v-else class="space-y-4">
      <div v-for="item in items" :key="item.id" class="glass-panel p-6 rounded-2xl flex justify-between items-center group">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-1">
            <h3 class="font-bold text-lg">{{ item.company }}</h3>
            <span class="text-xs px-2 py-1 bg-white/10 rounded-full text-gray-300">{{ item.period }}</span>
          </div>
          <p class="text-sm text-accent mb-2">{{ item.role }}</p>
          <ul class="text-sm text-gray-400 list-disc list-inside">
            <li v-for="(desc, i) in item.description.slice(0, 2)" :key="i" class="line-clamp-1">{{ desc }}</li>
            <li v-if="item.description.length > 2" class="text-xs text-gray-500">...and {{ item.description.length - 2 }} more</li>
          </ul>
        </div>
        <div class="flex gap-2 ml-4">
          <button @click="openModal(item)" class="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 transition-colors">
            <LucideEdit class="w-4 h-4" />
          </button>
          <button @click="deleteItem(item.id)" class="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors">
            <LucideTrash class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div class="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold">{{ isEditing ? 'Edit' : 'Add' }} Experience</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-white">
            <LucideX class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="save" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Company</label>
              <input v-model="form.company" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-primary/50" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Role</label>
              <input v-model="form.role" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-primary/50" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Period (e.g., 2021 - Present)</label>
            <input v-model="form.period" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-primary/50" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Description (Bullet points)</label>
            <div class="space-y-2 mb-2">
              <div v-for="(desc, idx) in form.description" :key="idx" class="flex gap-2">
                <input v-model="form.description[idx]" required placeholder="What did you do?" class="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-primary/50" />
                <button type="button" @click="removeDesc(idx)" class="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                  <LucideTrash2 class="w-4 h-4" />
                </button>
              </div>
            </div>
            <button type="button" @click="addDesc" class="text-xs text-primary hover:text-primary/80 flex items-center gap-1">
              <LucidePlus class="w-3 h-3" /> Add Point
            </button>
          </div>

          <div class="pt-4 flex justify-end gap-3">
            <button type="button" @click="closeModal" class="px-5 py-2.5 rounded-xl text-gray-400 hover:text-white transition-colors">Cancel</button>
            <button type="submit" :disabled="saving" class="bg-primary hover:bg-primary/80 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl transition-colors font-medium flex items-center gap-2">
              <LucideLoader2 v-if="saving" class="w-4 h-4 animate-spin" />
              Save Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
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
  company: '',
  role: '',
  period: '',
  description: []
})

const fetchItems = async () => {
  loading.value = true
  const { data } = await supabase.from('experiences').select('*').order('id', { ascending: true })
  if (data) items.value = data
  loading.value = false
}

onMounted(fetchItems)

const openModal = (item = null) => {
  if (item) {
    isEditing.value = true
    form.value = { ...item, description: [...(item.description || [])] }
  } else {
    isEditing.value = false
    form.value = { id: null, company: '', role: '', period: '', description: [''] }
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const addDesc = () => {
  form.value.description.push('')
}

const removeDesc = (index) => {
  form.value.description.splice(index, 1)
}

const save = async () => {
  try {
    saving.value = true
    const cleanedDesc = form.value.description.filter(t => t.trim() !== '')
    
    const payload = {
      company: form.value.company,
      role: form.value.role,
      period: form.value.period,
      description: cleanedDesc
    }

    if (isEditing.value) {
      await supabase.from('experiences').update(payload).eq('id', form.value.id)
    } else {
      await supabase.from('experiences').insert([payload])
    }
    
    closeModal()
    await fetchItems()
  } catch (e) {
    alert('Error saving experience')
  } finally {
    saving.value = false
  }
}

const deleteItem = async (id) => {
  if (confirm('Are you sure you want to delete this experience record?')) {
    try {
      await supabase.from('experiences').delete().eq('id', id)
      await fetchItems()
    } catch (e) {
      alert('Error deleting experience')
    }
  }
}
</script>
