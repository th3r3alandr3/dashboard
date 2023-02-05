<template>
  <div
    class="fixed bottom-6 right-6 group"
    @mouseenter="showActionMenu = true"
    @mouseleave="showActionMenu = false"
  >
    <div
      id="speed-dial-menu-text-inside-button"
      class="flex flex-col items-center mb-4 space-y-2"
      :class="{'hidden': !showActionMenu}"
    >
      <slot />
    </div>
    <button
      type="button"
      data-dial-toggle="speed-dial-menu-text-inside-button"
      aria-controls="speed-dial-menu-text-inside-button"
      aria-expanded="false"
      class="flex items-center justify-center text-white bg-lime-700 rounded-full w-14 h-14 hover:bg-lime-800 dark:bg-lime-600 dark:hover:bg-lime-700 focus:ring-4 focus:ring-lime-300 focus:outline-none dark:focus:ring-lime-800"
    >
      <Cog8ToothIcon class="w-8 h-8 transition-transform group-hover:rotate-45" />
    </button>
  </div>
</template>

<script setup lang="ts">
import {Cog8ToothIcon} from '@heroicons/vue/24/outline'
const showActionMenu = ref(false);
</script>
