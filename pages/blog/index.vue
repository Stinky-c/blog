<template>
  <div
    class="container mx-auto w-full sm:max-w-full md:max-w-[95%] lg:max-w-[80%] h-full min-h-full"
  >
    <ul class="list bg-base-200 rounded-box shadow-md">
      <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Sorted Posts</li>
      <li v-for="post in allPosts" :key="post.id" class="list-row">
        <div id="post-img">
          <img
            src="https://placehold.co/48x48.svg"
            class="size-12 rounded-full"
          />
        </div>
        <div id="post-info">
          <NuxtLink
            :to="post.path"
            class="link link-accent hover:text-accent-content text-lg font-semibold"
            >{{ post.title }}</NuxtLink
          >
          <div class="sm:text-xs lg:text-base">
            By: <span class=""> {{ post.author }}</span>
          </div>
        </div>
        <div id="post-desc" class="list-col-wrap">
          <!-- eslint-disable-next-line vue/no-v-html TODO: security risk-->
          <div class="content-center" v-html="post.description"></div>
        </div>
        <div id="post-dates">
          <div class="text-s">
            Created:
            <time
              :datetime="$dayjs(post.created).utc().toString()"
              class="font-semibold"
            >
              {{ $dayjs(post.created).format("LL") }}
            </time>
          </div>
          <div class="text-s">
            Updated:
            <time
              :datetime="$dayjs(post.updated).utc().toString()"
              class="font-semibold"
            >
              {{ $dayjs(post.updated).format("LL") }}</time
            >
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const allPosts = await queryCollection("blog").order("created", "DESC").all();

/*
TODO:
  - verify dates are formatted correctly
  - filter by author when clicking author
  - sorting systems
*/
</script>
