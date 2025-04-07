<template>
  <div class="navbar bg-base-300 shadow-sm">
    <div class="flex-none">
      <button class="btn btn-square btn-ghost">
        <Icon
          name="material-symbols:format-list-bulleted"
          class="fill-current w-6 h-6"
        />
      </button>
    </div>
    <div class="flex-1">
      <NuxtLink class="btn btn-ghost text-xl" to="/">
        <Icon name="material-symbols:home" class="size-[1.2em]" />
        Home
      </NuxtLink>
      <NuxtLink class="btn btn-ghost text-xl" to="/blog">
        <Icon name="material-symbols:news-rounded" class="size-[1.2em]" />
        Blog</NuxtLink
      >
      <NuxtLink class="btn btn-ghost text-xl" to="/docs">
        <Icon name="material-symbols:book-2" class="size-[1.2em]" />
        Docs
      </NuxtLink>
    </div>

    <div class="flex-none w-10">
      <ThemePicker />
    </div>
    <div class="avatar flex-none w-10">
      <div class="w-10 rounded-full">
        <img src="https://github.com/stinky-c.png" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
