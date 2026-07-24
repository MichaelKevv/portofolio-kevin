// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    'nuxt-lucide-icons',
    '@nuxt/icon'
  ],
  supabase: {
    redirect: false, // We will handle redirects manually via middleware for admin pages
  }
})
