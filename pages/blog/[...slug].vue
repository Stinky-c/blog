<script setup lang="ts">
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("blog").path(route.path).first();
});
</script>

<template>
  <div
    v-if="page"
    class="container mx-auto sm:max-w-full md:max-w-[95%] lg:max-w-[80%] min-h-full h-full bg-base-200"
  >
    <div id="content-header" class="grid grid-rows-1 grid-cols-2 p-5">
      <div id="page-title" class="grow">
        <div class="sm:text-2xl lg:text-4xl font-bold bg-red-400">
          {{ page.title }}
        </div>
        <div class="sm:text-l lg:text-2xl bg-green-400">
          By: <span class="font-semibold"> {{ page.author }}</span>
        </div>
      </div>
      <div id="page-dates" class="justify-self-end">
        <div class="sm:text-sm lg:text-lg bg-blue-400">
          Created:
          <time
            :datetime="$dayjs(page.created).utc().toString()"
            class="font-semibold"
          >
            {{ $dayjs(page.created).format("LL") }}
          </time>
        </div>
        <div class="sm:text-sm lg:text-lg bg-yellow-400">
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
    <div class="divider divider-primary"></div>
    <ContentRenderer :value="page" :prose="true" class="prose min-w-full p-4" />
  </div>
  <div v-else>
    <div
      class="container mx-auto sm:max-w-full md:max-w-[95%] lg:max-w-[80%] h-full min-h-full bg-base-200"
    >
      <h1>Page Not Found</h1>
      <p>Oops! The content you're looking for doesn't exist.</p>
      <NuxtLink to="/">Go back home</NuxtLink>
    </div>
  </div>
</template>
