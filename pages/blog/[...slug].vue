<script setup lang="ts">
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("blog").path(route.path).first();
});
</script>

<template>
  <div
    v-if="page"
    class="container mx-auto max-w-full md:max-w-[95%] lg:max-w-[80%] min-h-full h-full bg-base-200"
  >
    <div id="content-header" class="lg:flex lg:flex-row lg:flex-nowrap p-5">
      <div id="page-title" class="lg:grow">
        <div class="text-2xl md:text-3xl lg:text-4xl font-bold">
          {{ page.title }}
        </div>
        <div class="text-l lg:text-2xl">
          By: <span class="font-semibold"> {{ page.author }}</span>
        </div>
      </div>
      <div id="page-dates" class="lg:shrink-0">
        <div class="text-sm md:text-base lg:text-lg">
          Created:
          <time
            :datetime="$dayjs(page.created).utc().toString()"
            class="font-semibold"
          >
            {{ $dayjs(page.created).format("LL") }}
          </time>
        </div>
        <div class="text-sm md:text-md lg:text-lg">
          Updated:
          <time
            :datetime="$dayjs(page.updated).utc().toString()"
            class="font-semibold"
          >
            {{ $dayjs(page.updated).format("LL") }}</time
          >
        </div>
      </div>
    </div>
    <div class="divider divider-accent"></div>
    <ContentRenderer :value="page" :prose="true" class="prose min-w-full p-4" />
  </div>
  <div v-else>
    <div
      class="container mx-auto max-w-full md:max-w-[95%] lg:max-w-[80%] h-full min-h-full bg-base-200"
    >
      <h1>Page Not Found</h1>
      <p>Oops! The content you're looking for doesn't exist.</p>
      <NuxtLink to="/">Go back home</NuxtLink>
    </div>
  </div>
</template>
