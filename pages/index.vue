<template lang="pug">
section.overflow-hidden.text-gray-700.flex.justify-center.h-screen
  .px-5.py-2.mx-auto(class='lg:pt-12 lg:px-32 md:container md:mx-auto')
    .flex.flex-wrap.-m-1(class='md:-m-2')
      Card(v-for='website in websites' :website='website')
</template>

<script setup lang="ts">
const websites = await $fetch("/api/websites");
// const sites = [
//   {url: 'http://homeassistant.local', title: 'Home Assistant'},
//   {url: 'http://homebridge.local', title: 'Homebridge'},
//   {url: 'http://nas.local', title: 'NAS'},
//   {url: 'http://pihole.local', title: 'Pihole'},
//   {url: 'http://portainer.local', title: 'Portainer'},
//   {url: 'http://proxy.local', title: 'Proxy'},
// ]
</script>
