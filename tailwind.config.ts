import type { Config } from "tailwindcss";
import Daisyui from "daisyui";
import typography from "@tailwindcss/typography";

export default <Partial<Config>>{
    plugins: [typography(), Daisyui],
    content: ["./pages/**/*.{vue,js,jsx,mjs,ts,tsx}"],
    daisyui: {
        themes: [
            "emerald", // Light mode
            "dark", // Dark mode
        ],
    },
};
