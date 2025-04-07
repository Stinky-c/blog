import { defineContentConfig, defineCollection, z } from "@nuxt/content";

let blogSchema = z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    created: z.string().datetime({ offset: true }),
    updated: z.string().datetime({ offset: true }),
    tags: z.array(z.string()).optional(),
});

export default defineContentConfig({
    collections: {
        blog: defineCollection({
            type: "page",
            source: "blog/*.md",
            schema: blogSchema,
        }),
    },
});
