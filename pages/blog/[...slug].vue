<script setup lang="ts">
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("blog").path(route.path).first();
});
</script>

<template>
  <div
    v-if="page"
    class="container mx-auto sm:max-w-full md:max-w-[95%] lg:max-w-[80%] h-screen min-h-screen bg-red-400"
  >
    <h1>{{ page.title }}</h1>
    <h1>{{ page.author }}</h1>
    <h1>{{ page.created }}</h1>
    <h1>{{ page.updated }}</h1>
    <ContentRenderer
      :value="page"
      :prose="true"
      class="prose bg-red-600 p-2 min-w-full"
    />
  </div>
  <div v-else>
    <div
      class="container mx-auto sm:max-w-full md:max-w-[95%] lg:max-w-[80%] h-screen min-h-screen bg-red-400"
    >
      <h1>Page Not Found</h1>
      <p>Oops! The content you're looking for doesn't exist.</p>
      <NuxtLink to="/">Go back home</NuxtLink>
    </div>
  </div>
</template>
