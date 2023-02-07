<template>
  <section class="overflow-hidden text-gray-700 flex justify-center pb-12">
    <div class="px-5 py-2 mx-auto lg:pt-12 lg:px-32 md:container md:mx-auto">
      <draggable
        class="flex flex-wrap -m-1 md:-m-2"
        :sort="editDashboard"
        :list="websites"
        @change="orderChanged"
      >
        <WebsiteCard
          v-for="website in websites"
          :key="website.id"
          :website="website"
          @delete="deleteWebsite"
          @edit="editWebsite"
        />
      </draggable>
    </div>
    <ActionMenu>
      <button
        type="button"
        title="Website hinzufügen"
        class="w-[56px] h-[56px] text-stone-500 bg-white rounded-full border border-stone-200 dark:border-stone-600 hover:text-stone-900 shadow-sm dark:hover:text-white dark:text-stone-400 hover:bg-stone-50 dark:bg-stone-700 dark:hover:bg-stone-600 focus:ring-4 focus:ring-stone-300 focus:outline-none dark:focus:ring-stone-400"
        @click="showWebsiteModal = true"
      >
        <PlusIcon class="w-6 h-6 mx-auto mt-px" />
      </button>
      <button
        type="button"
        :title="'Dashboard bearbeiten' + (editDashboard ? ' beenden' : '')"
        class="w-[56px] h-[56px] text-stone-500 bg-white rounded-full border border-stone-200 dark:border-stone-600 hover:text-stone-900 shadow-sm dark:hover:text-white dark:text-stone-400 hover:bg-stone-50 dark:bg-stone-700 dark:hover:bg-stone-600 focus:ring-4 focus:ring-stone-300 focus:outline-none dark:focus:ring-stone-400"
        @click="editDashboard = !editDashboard"
      >
        <PencilIcon
          v-if="!editDashboard"
          class="w-6 h-6 mx-auto mt-px"
        />
        <XMarkIcon
          v-else
          class="w-6 h-6 mx-auto mt-px"
        />
      </button>
    </ActionMenu>
    <WebsiteModal
      :open="showWebsiteModal"
      @close="showWebsiteModal = false"
      @confirm="createWebsite"
    />
  </section>
</template>

<script setup lang="ts">

import {useToast} from "vue-toastification";

import {PencilIcon, PlusIcon, XMarkIcon} from '@heroicons/vue/24/outline'
import {Ref} from "vue";

definePageMeta({
    middleware: ['user-only'],
})

const headers = useRequestHeaders(['cookie']) as HeadersInit

const websites = reactive(await $fetch("/api/websites", {headers})) as Website[];

const editDashboard = inject('editDashboard') as boolean;

const showWebsiteModal = ref(false) as Ref<boolean>

const toast = useToast();

const addingWebsite = ref(false);


async function orderChanged(event: { moved: { element: Website, newIndex: number, oldIndex: number } }) {
    const {element, newIndex} = event.moved;
    await editWebsite({id: element.id, priority: newIndex}, false);
}

function addWebsite(website: Website) {
    if (!website) return;
    const websiteIndex = websites.findIndex((oldWebSite) => oldWebSite.url === website.url);
    if (websiteIndex !== -1) {
        websites.splice(websiteIndex, 1, website);
        toast.success("Die Website wurde erfolgreich hinzugefügt!");
    } else {
        websites.push(website);
    }
}

async function createWebsite(data: Partial<Website>) {
    showWebsiteModal.value = false;
    try {
        addingWebsite.value = true;
        addWebsite({pending: true, ...data} as Website);
        addWebsite(await $fetch("/api/websites/create", {
            method: "post",
            body: data,
            headers,
        }));
    } catch (e) {
        toast.error("Die Website konnte nicht hinzugefügt werden!");
        const websiteIndex = websites.findIndex((website) => website.url === data.url);
        if (websiteIndex !== -1) {
            websites.splice(websiteIndex, 1);
        }
    }
    finally {
        addingWebsite.value = false;
    }
}

async function deleteWebsite(id: string) {
    try {
        await $fetch("/api/websites/" + id, {method: "DELETE", headers});
        websites.splice(websites.findIndex((website) => website.id === id), 1);
        toast.success("Die Website wurde erfolgreich gelöscht!");
    } catch (e) {
        toast.error("Die Website konnte nicht gelöscht werden!");
    }
}

async function editWebsite(data: Partial<Website>, updateArray = true) {
    try {
        const website = await $fetch("/api/websites/" + data.id, {method: "PATCH", body: data, headers}) as Website;
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
