<template lang="pug">
section.overflow-hidden.text-gray-700.flex.justify-center.pb-12
  .px-5.py-2.mx-auto(class='lg:pt-12 lg:px-32 md:container md:mx-auto')
    draggable.flex.flex-wrap.-m-1(class='md:-m-2' :sort="editDashboard" :list='websites' @change='orderChanged')
      Card(v-for='website in websites' :website='website' @delete='deleteWebsite' @edit='editWebsite')
</template>

<script setup lang="ts">

import {useToast} from "vue-toastification";

const websites = reactive(await $fetch("/api/websites"));

const editDashboard = inject('editDashboard') as any;

const toast = useToast();

async function orderChanged(event: { moved: { element: Website, newIndex: number, oldIndex: number } }) {
  const {element, newIndex, oldIndex} = event.moved;
  const website = await editWebsite({id: element.id, priority: newIndex}, false);
}

const addWebsite = inject('addWebsite') as Website;
watch(addWebsite, (website: Website) => {
      if (!website) return;
      const websiteIndex = websites.findIndex((oldWebSite) => oldWebSite.url === website.url);
      if (websiteIndex !== -1) {
        websites.splice(websiteIndex, 1, website);
        toast.success("Die Website wurde erfolgreich hinzugefügt!");
      } else {
        websites.push(website);
      }
    }, {immediate: true, deep: true}
);


async function deleteWebsite(id: string) {
  try {
    await $fetch("/api/websites/" + id, {method: "DELETE"});
    websites.splice(websites.findIndex((website) => website.id === id), 1);
    toast.success("Die Website wurde erfolgreich gelöscht!");
  } catch (e) {
    toast.error("Die Website konnte nicht gelöscht werden!");
  }
}

async function editWebsite(data: Partial<Website>, updateArray = true) {
  try {
    const website = <Website>await $fetch("/api/websites/" + data.id, {method: "PATCH", body: data});
    if (updateArray) {
      websites.splice(websites.findIndex((oldWebSite) => oldWebSite.id === website.id), 1, website);
      toast.success("Die Website wurde erfolgreich bearbeitet!");
    }
    return website;
  } catch (e) {
    toast.error("Die Website konnte nicht bearbeitet werden!");
  }
}
</script>
