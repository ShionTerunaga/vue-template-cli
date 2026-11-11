import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

const isStorybookEnabled = process.env.NUXT_STORYBOOK_ENABLED === "true";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
    components: [{ path: "~/app/components", extensions: ["vue"] }],
    devtools: {
        enabled: !isStorybookEnabled
    },
    storybook: {
        enabled: isStorybookEnabled
    },
    vite: {
        plugins: [vanillaExtractPlugin()]
    },

    runtimeConfig: {
        public: {
            NUXT_PUBLIC_API_KEY: process.env.NUXT_PUBLIC_API_KEY,
            NUXT_PUBLIC_POKEMON_API_URL: process.env.NUXT_PUBLIC_POKEMON_API_URL
        }
    },

    modules: [
        "@nuxt/image",
        ...(isStorybookEnabled ? ["@nuxtjs/storybook"] : [])
    ]
};
