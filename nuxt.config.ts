// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    nitro: {
        preset: "cloudflare_pages",
        prerender: {
            autoSubfolderIndex: false,
        },
    },
    content: {
        preview: {
            api: "https://api.nuxt.studio"
        },
        build: {
            markdown: {
                highlight: {
                    theme: "github-dark-dimmed",
                    langs: [
                        "json",
                        "toml",
                        "yaml",
                        "javascript",
                        "typescript",
                        "html",
                        "css",
                        "vue",
                        "shell",
                        "mdc",
                        "markdown",
                        "yaml",
                        "python",
                        "jinja",
                        "rust",
                        "shell",
                    ],
                },
            },
        },
    },

    modules: [
        "@nuxt/content",
        "@nuxt/eslint",
        "@nuxt/fonts",
        "@nuxt/icon",
        "@nuxt/image",
        "@nuxt/scripts",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/color-mode",
        "dayjs-nuxt",
    ],
    dayjs: {
        plugins: ["localizedFormat"],
    },

    colorMode: {
        preference: "system", // default theme
        dataValue: "theme", // activate data-theme in <html> tag
        classSuffix: "",
    },
    tailwindcss: { exposeConfig: true, editorSupport: true },
});
