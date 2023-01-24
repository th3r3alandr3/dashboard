<template lang="pug">
section.overflow-hidden.text-gray-700.flex.justify-center.h-screen
  .px-5.py-2.mx-auto(class='lg:pt-12 lg:px-32 md:container md:mx-auto')
    draggable.flex.flex-wrap.-m-1(class='md:-m-2' :sort="editDashboard" :list='websites' @change='orderChanged')
      Card(v-for='website in websites' :website='website' @delete='deleteWebsite' @edit='editWebsite')
</template>

<script setup lang="ts">

let websites = reactive(await $fetch("/api/websites"));

const editDashboard = inject('editDashboard') as any;

async function orderChanged(event: { moved: { element: Website, newIndex: number, oldIndex: number } }) {
  const {element, newIndex, oldIndex} = event.moved;
  console.log(element, newIndex, oldIndex);
  await editWebsite({id: element.id, priority: newIndex});
}


async function deleteWebsite(id: string) {
  await $fetch("/api/websites/" + id, {method: "DELETE"});
  websites.splice(websites.findIndex((website) => website.id === id), 1);
}

async function editWebsite(data: Partial<Website>) {
  const website = <Website>await $fetch("/api/websites/" + data.id, {method: "PATCH", body: data});
  websites.splice(websites.findIndex((oldWebSite) => oldWebSite.id === website.id), 1, website);
}
</script>
