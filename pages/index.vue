<template lang="pug">
section.overflow-hidden.text-gray-700.flex.justify-center.h-screen
  .px-5.py-2.mx-auto(class='lg:pt-12 lg:px-32 md:container md:mx-auto')
    .flex.flex-wrap.-m-1(class='md:-m-2')
      Card(v-for='website in websites' :website='website' @delete='deleteWebsite' @edit='editWebsite')
</template>

<script setup lang="ts">

const websites = await $fetch("/api/websites");

async function deleteWebsite(id: string) {
  await $fetch("/api/websites/" + id, {method: "DELETE"});
  websites.splice(websites.findIndex((website) => website.id === id), 1);
}

async function editWebsite(data: Partial<Website>) {
  const website = <Website>await $fetch("/api/websites/" + data.id, {method: "PATCH", body: JSON.stringify(data)});
  websites.splice(websites.findIndex((oldWebSite) => oldWebSite.id === website.id), 1, website);

}
</script>
