<template lang="pug">
section.overflow-hidden.text-gray-700.flex.items-center.justify-center.h-screen
  .px-5.py-2.mx-auto(class='lg:pt-12 lg:px-32 md:container md:mx-auto')
    .flex.flex-wrap.-m-1(class='md:-m-2')
      Card(v-for='site in sites' :site='site')
</template>

<script setup lang="ts">
const sites = [
  {url: 'http://homeassistant.local', name: 'Home Assistant'},
  {url: 'http://homebridge.local', name: 'Homebridge'},
  {url: 'http://nas.local', name: 'NAS'},
  {url: 'http://pihole.local', name: 'Pihole'},
  {url: 'http://portainer.local', name: 'Portainer'},
  {url: 'http://proxy.local', name: 'Proxy'},
]
</script>
