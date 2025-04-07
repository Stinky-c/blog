// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },

    modules: [
        "@nuxt/content",
        "@nuxt/eslint",
        "@nuxt/fonts",
        "@nuxt/icon",
        "@nuxt/image",
        "@nuxt/scripts",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/color-mode",
    ],

    colorMode: {
        preference: "system", // default theme
        dataValue: "theme", // activate data-theme in <html> tag
        classSuffix: "",
    },
    tailwindcss: { exposeConfig: true },
});
