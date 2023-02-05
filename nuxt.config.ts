// https://v3.nuxtjs.org/api/configuration/nuxt.config
const ONE_WEEK = 60 * 60 * 24 * 1000 * 7
export default defineNuxtConfig({
    sourcemap: false,
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=500, initial-scale=1',
            title: 'Webseiten-Übersicht - Verwalte deine persönliche Webseiten-Sammlung',
            meta: [
                {name: 'description', content: 'Erstelle deine eigene personalisierte Webseiten-Übersicht. Füge deine Lieblingswebseiten hinzu, organisiere und verwalte sie nach deinen Wünschen. Verpasse nie wieder wichtige Webinhalte.'}
            ],
            htmlAttrs: {
                lang: 'de',
                class: 'dark',
            }
        },
    },
    css: ['~/assets/css/main.css'],
    modules: [
        '@nuxt/image-edge',
        'nuxt-icons',
        '@vueuse/nuxt',
        '@nuxtjs/tailwindcss',
        '@sidebase/nuxt-auth',
    ],
    components: {
        dirs: [
            '~/components',
        ]
    },
    tailwindcss: {
        viewer: true,
    },
    runtimeConfig: {
        databasePath: process.env.DATABASE_PATH,
    },
    auth: {
        origin: process.env.BASE_URL,
    }
})
