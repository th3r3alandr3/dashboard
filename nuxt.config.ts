// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: ['~/assets/css/main.css'],
    modules: [
        '@nuxt/image-edge',
        'nuxt-icons',
        '@vueuse/nuxt',
        '@nuxtjs/tailwindcss',
    ],
    components: {
        dirs: [
            '~/components',
        ]
    },
    tailwindcss: {
        viewer: true,
    },
    image: {
        provider: 'ipx',
    },
    runtimeConfig: {
        databasePath: process.env.DATABASE_PATH,
    }
})
