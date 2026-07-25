<template>
  <div class="relative min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 overflow-x-hidden">
    
    <!-- Animated Gradient Background Orbs -->
    <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/40 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
      <div class="absolute top-[20%] right-[-10%] w-96 h-96 bg-secondary/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-accent/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
    </div>

    <!-- Navbar -->
    <div class="fixed top-6 left-0 right-0 z-50 px-4 md:px-6 pointer-events-none">
      <nav class="max-w-4xl mx-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-full h-16 px-6 flex items-center justify-between shadow-2xl pointer-events-auto">
        <a href="#" class="font-black text-xl tracking-tighter flex items-center gap-2 reveal">
          <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <span class="text-white text-sm font-black">M</span>
          </div>
          <span v-if="profile" class="hidden sm:block bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">{{ profile.name.split(' ').slice(0, 2).join(' ') }}</span>
        </a>
        <div class="hidden md:flex gap-8 text-sm font-medium text-gray-400 reveal reveal-delay-100">
          <a href="#about" class="hover:text-white transition-colors">About</a>
          <a href="#skills" class="hover:text-white transition-colors">Skills</a>
          <a href="#experience" class="hover:text-white transition-colors">Experience</a>
          <a href="#education" class="hover:text-white transition-colors">Education</a>
          <a href="#projects" class="hover:text-white transition-colors">Projects</a>
        </div>
        <a href="#contact" class="reveal reveal-delay-200 relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none hover:scale-105 transition-transform">
          <span class="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span class="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background/80 px-6 py-1 text-sm font-bold text-white backdrop-blur-3xl transition-colors hover:bg-background">
            Contact Me
          </span>
        </a>
      </nav>
    </div>

    <main class="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32 space-y-32">
      
      <!-- HERO -->
      <section class="flex flex-col items-center text-center min-h-[60vh] justify-center reveal">
        <div v-if="profile" class="space-y-6 max-w-4xl mt-12">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-200 backdrop-blur-md mb-4 shadow-xl">
            <span class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
            </span>
            Available for new opportunities
          </div>
          
          <h1 class="text-6xl md:text-8xl font-black tracking-tighter leading-[1.1] text-white drop-shadow-2xl">
            Hi, I'm <br class="hidden md:block"/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-pulse">{{ profile.name }}</span>
          </h1>
          
          <p class="text-xl md:text-2xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed mt-6">
            {{ profile.bio }}
          </p>

          <div class="pt-8 flex flex-wrap gap-5 justify-center">
            <a href="#projects" class="group flex items-center gap-3 px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300">
              <span>View Work</span>
              <LucideArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a v-if="profile?.github" :href="profile.github" target="_blank" class="group flex items-center gap-3 px-10 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300">
              <Icon name="lucide:github" class="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </section>

      <!-- ABOUT -->
      <section id="about" class="reveal">
        <div class="glass-card p-10 text-center relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50"></div>
          
          <div class="relative z-10">
            <div v-if="profile?.photo_url" class="relative w-32 h-32 mx-auto mb-8 rounded-full p-1 bg-gradient-to-tr from-primary to-secondary shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              <div class="w-full h-full rounded-full overflow-hidden border-4 border-background">
                <img :src="profile.photo_url" alt="Profile Photo" class="w-full h-full object-cover" />
              </div>
            </div>
            <LucideUser v-else class="w-12 h-12 text-primary mx-auto mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
            
            <h2 class="text-3xl font-bold text-white mb-6">About Me</h2>
          <p class="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap max-w-3xl mx-auto">{{ profile?.description }}</p>
          
          <div class="flex justify-center gap-12 mt-12 pt-12 border-t border-white/10">
            <div>
              <h3 class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 mb-2">{{ profile?.years_experience }}+</h3>
              <p class="text-secondary font-bold tracking-widest uppercase text-sm">Years Exp</p>
            </div>
            <div>
              <h3 class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 mb-2">{{ profile?.projects_completed }}+</h3>
              <p class="text-primary font-bold tracking-widest uppercase text-sm">Projects</p>
            </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SKILLS -->
      <section id="skills" class="reveal">
        <div class="flex items-center gap-4 mb-12">
          <div class="p-3 rounded-2xl bg-primary/20 border border-primary/30">
            <LucideCpu class="w-8 h-8 text-primary" />
          </div>
          <h2 class="text-4xl font-bold text-white">Technical Arsenal</h2>
        </div>
        
        <div class="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto" v-if="skills">
          <div v-for="(skill, index) in skills" :key="skill.id" 
               class="glass-card px-6 py-4 flex items-center gap-4 group hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_10px_30px_-10px_rgba(232,121,249,0.3)] transition-all duration-300 reveal cursor-default"
               :style="{ transitionDelay: `${index * 50}ms` }">
            <div class="text-accent group-hover:scale-110 transition-transform flex-shrink-0 flex items-center justify-center">
               <Icon v-if="skill.icon && skill.icon.includes(':')" :name="skill.icon" class="w-7 h-7" />
               <LucideCode v-else-if="skill.icon === 'braces'" class="w-6 h-6" />
               <LucideServer v-else-if="skill.icon === 'server'" class="w-6 h-6" />
               <LucideDatabase v-else-if="skill.icon === 'database'" class="w-6 h-6" />
               <LucideSmartphone v-else-if="skill.icon === 'smartphone'" class="w-6 h-6" />
               <LucideZap v-else-if="skill.icon === 'zap'" class="w-6 h-6" />
               <LucideLayers v-else-if="skill.icon === 'layers'" class="w-6 h-6" />
               <LucideBox v-else class="w-6 h-6" />
            </div>
            <div class="flex flex-col text-left">
              <span class="font-bold text-lg text-white leading-tight">{{ skill.name }}</span>
              <span v-if="skill.description" class="text-xs text-gray-400 mt-1">{{ skill.description }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- EXPERIENCE -->
      <section id="experience" class="reveal">
        <div class="flex items-center gap-4 mb-16">
          <div class="p-3 rounded-2xl bg-secondary/20 border border-secondary/30">
            <LucideBriefcase class="w-8 h-8 text-secondary" />
          </div>
          <h2 class="text-4xl font-bold text-white">Experience</h2>
        </div>
        
        <div class="space-y-8" v-if="groupedExperiences.length">
          <div v-for="(group, groupIndex) in groupedExperiences" :key="groupIndex" class="glass-card p-8 md:p-10 reveal" :style="{ transitionDelay: `${groupIndex * 100}ms` }">
            <h3 class="text-2xl md:text-3xl font-bold text-secondary mb-8 flex items-center gap-3">
              <LucideBuilding2 class="w-8 h-8 text-secondary/70" />
              {{ group.company }}
            </h3>
            
            <div class="relative border-l-2 border-white/10 ml-4 space-y-10">
              <div v-for="(role, roleIndex) in group.roles" :key="role.id" class="relative pl-8">
                <!-- Timeline Dot -->
                <div class="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-background border-2 border-primary ring-4 ring-primary/20"></div>
                
                <div class="md:flex justify-between items-start mb-4">
                  <div>
                    <h4 class="text-xl md:text-2xl font-bold text-white">{{ role.role }}</h4>
                  </div>
                  <div class="mt-2 md:mt-0 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 text-gray-300 font-medium text-sm inline-block backdrop-blur-md">
                    {{ role.period }}
                  </div>
                </div>
                
                <ul class="space-y-3">
                  <li v-for="(item, i) in role.description" :key="i" class="text-gray-400 flex items-start gap-3 leading-relaxed">
                    <LucideArrowRight class="w-4 h-4 text-primary shrink-0 mt-1.5" />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- EDUCATION -->
      <section id="education" class="reveal">
        <div class="flex items-center gap-4 mb-16">
          <div class="p-3 rounded-2xl bg-primary/20 border border-primary/30">
            <LucideGraduationCap class="w-8 h-8 text-primary" />
          </div>
          <h2 class="text-4xl font-bold text-white">Education</h2>
        </div>
        
        <div class="space-y-8" v-if="sortedEducations && sortedEducations.length">
          <div v-for="(edu, index) in sortedEducations" :key="edu.id" class="glass-card p-8 md:p-10 reveal" :style="{ transitionDelay: `${index * 100}ms` }">
            <div class="md:flex justify-between items-start mb-6">
              <div>
                <h3 class="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-3">
                  <LucideBookOpen class="w-7 h-7 text-primary/70" />
                  {{ edu.institution }}
                </h3>
                <h4 class="text-xl font-medium text-primary">{{ edu.degree }}</h4>
                <div v-if="edu.gpa" class="mt-2 text-sm text-gray-400 font-medium bg-white/5 inline-block px-3 py-1 rounded-lg border border-white/5">
                  GPA: <span class="text-white">{{ edu.gpa }}</span>
                </div>
              </div>
              <div class="mt-4 md:mt-0 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 text-gray-300 font-medium text-sm inline-block backdrop-blur-md">
                {{ edu.period }}
              </div>
            </div>
            
            <div class="mt-6 text-gray-400 leading-relaxed whitespace-pre-line">
              {{ edu.description }}
            </div>
          </div>
        </div>
      </section>

      <!-- PROJECTS -->
      <section id="projects" class="reveal">
        <div class="flex items-center justify-between mb-16">
          <div class="flex items-center gap-4">
            <div class="p-3 rounded-2xl bg-accent/20 border border-accent/30">
              <LucideCode class="w-8 h-8 text-accent" />
            </div>
            <h2 class="text-4xl font-bold text-white">Featured Works</h2>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8" v-if="projects">
          <div v-for="(project, index) in projects" :key="project.id" 
               class="glass-card flex flex-col group hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_50px_-20px_rgba(255,255,255,0.1)] transition-all duration-500 reveal overflow-hidden"
               :style="{ transitionDelay: `${index * 100}ms` }">
            
            <div v-if="project.image_url" class="w-full h-48 sm:h-64 overflow-hidden border-b border-white/5 cursor-pointer relative group/image" @click="openLightbox(project.image_url)">
              <img :src="project.image_url" :alt="project.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div class="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center">
                <LucideMaximize2 class="w-8 h-8 text-white drop-shadow-lg" />
              </div>
            </div>

            <div class="p-8 flex-1 flex flex-col">
              <div class="flex-1">
                <h3 class="text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-secondary group-hover:to-primary transition-all">{{ project.title }}</h3>
                <p class="text-gray-400 text-lg leading-relaxed mb-8">{{ project.description }}</p>
              </div>
              
              <div class="flex flex-wrap gap-2 mb-10">
                <span v-for="tech in project.tech_stack" :key="tech" class="px-4 py-2 bg-black/40 border border-white/5 text-sm text-gray-300 rounded-xl font-medium">
                  {{ tech }}
                </span>
              </div>

              <div class="flex gap-4 mt-auto">
                <a v-if="project.live_url" :href="project.live_url" target="_blank" class="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/25">
                  Visit Live <LucideExternalLink class="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- CTA SECTION -->
      <section id="contact" class="reveal relative overflow-hidden rounded-[3rem] p-12 md:p-20 glass-card text-center border-white/10 border shadow-[0_0_50px_rgba(168,85,247,0.1)]">
        <!-- Glow effects inside the CTA -->
        <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        <div class="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
        <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/20 rounded-full blur-[100px]"></div>

        <div class="relative z-10 max-w-3xl mx-auto space-y-8">
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Ready to Build Something <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Amazing?</span>
          </h2>
          <p class="text-xl text-gray-400">
            Let's collaborate to bring your ideas to life. I'm currently available for freelance projects and exciting full-time opportunities.
          </p>
          
          <div class="flex flex-col items-center gap-6 pt-6">
            <a v-if="profile?.email" :href="`mailto:${profile.email}`" class="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]">
              <LucideMail class="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Say Hello!</span>
            </a>
            
            <div class="flex items-center gap-4 mt-2">
              <a v-if="profile?.linkedin" :href="profile.linkedin" target="_blank" class="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-gray-300 hover:text-white transition-all hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <Icon name="lucide:linkedin" class="w-6 h-6" />
              </a>
              <a v-if="profile?.github" :href="profile.github" target="_blank" class="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-gray-300 hover:text-white transition-all hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <Icon name="lucide:github" class="w-6 h-6" />
              </a>
              <a v-if="profile?.instagram" :href="profile.instagram" target="_blank" class="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-gray-300 hover:text-white transition-all hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <Icon name="lucide:instagram" class="w-6 h-6" />
              </a>
              <a v-if="profile?.whatsapp" :href="`https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`" target="_blank" class="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-gray-300 hover:text-white transition-all hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <Icon name="mdi:whatsapp" class="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Lightbox Modal -->
      <ClientOnly>
        <Teleport to="body">
          <div v-if="lightboxImage" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4" @click="closeLightbox">
            <div class="relative max-w-5xl max-h-[90vh] w-full flex justify-center">
              <button @click="closeLightbox" class="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors">
                <LucideX class="w-8 h-8" />
              </button>
              <img :src="lightboxImage" class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" @click.stop />
            </div>
          </div>
        </Teleport>
      </ClientOnly>

    </main>

    <footer class="border-t border-white/10 py-12 mt-20 relative z-10 bg-black/50 backdrop-blur-xl text-center text-gray-500">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="font-medium">© {{ new Date().getFullYear() }} {{ profile?.name }}. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const supabase = useSupabaseClient()

const loading = ref(true)

const lightboxImage = ref(null)
const openLightbox = (url) => {
  if (url) lightboxImage.value = url
}
const closeLightbox = () => {
  lightboxImage.value = null
}

const activeSection = ref('home')

const { data: profile } = await useAsyncData('profile', async () => {
    const { data } = await supabase.from('profile').select('*').single()
    return data
})

const { data: experiences } = await useAsyncData('experiences', async () => {
    const { data } = await supabase.from('experiences').select('*').order('id', { ascending: true })
    return data
})

const { data: skills } = await useAsyncData('skills', async () => {
    const { data } = await supabase.from('skills').select('*').order('id', { ascending: true })
    return data
})

const { data: educations } = await useAsyncData('educations', async () => {
    const { data } = await supabase.from('education').select('*')
    return data
})

const sortedEducations = computed(() => {
  if (!educations.value) return []
  return [...educations.value].sort((a, b) => {
    // Extract years from the period string and get the maximum year (usually the end year)
    const getYear = (str) => {
      const match = (str || '').match(/\d{4}/g)
      return match ? Math.max(...match.map(Number)) : 0
    }
    return getYear(b.period) - getYear(a.period)
  })
})

const groupedExperiences = computed(() => {
  if (!experiences.value) return []
  
  // Reverse to show newest experiences first (assuming higher ID = newer)
  const sortedExps = [...experiences.value].reverse()
  
  const groups = []
  const groupMap = new Map()

  sortedExps.forEach(exp => {
    if (groupMap.has(exp.company)) {
      groupMap.get(exp.company).roles.push(exp)
    } else {
      const newGroup = {
        company: exp.company,
        roles: [exp]
      }
      groupMap.set(exp.company, newGroup)
      groups.push(newGroup)
    }
  })
  
  return groups
})

const { data: projects } = await useAsyncData('projects', async () => {
    const { data } = await supabase.from('projects').select('*').order('id', { ascending: true })
    return data
})

// Scroll Reveal Logic
onMounted(() => {
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  };

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  // Need slight delay to ensure DOM is fully rendered for SSR
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach((element) => {
      observer.observe(element);
    });
  }, 100);
})
</script>

<style>
/* Glass Card Utility */
.glass-card {
  @apply bg-card backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl;
}

/* Scroll Reveal Animations */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

.reveal-delay-100 { transition-delay: 100ms; }
.reveal-delay-200 { transition-delay: 200ms; }
.reveal-delay-300 { transition-delay: 300ms; }

/* Custom animation delay for blobs */
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
