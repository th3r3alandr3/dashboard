<template>
  <div class="flex flex-wrap w-full md:w-1/2 xl:w-1/3 max-w-full" :class="{ 'animate-wiggle': editDashboard }">
    <div class="w-full m-4">
      <nuxt-link class="relative group" :to="props.website.url" @click.prevent="linkClicked">
        <button class="rounded-full p-2 absolute -top-3 -right-3 z-20 bg-black opacity-80 focus:outline-none"
                v-if="editDashboard">
          <XMarkIcon class="w-4 h-4 text-white opacity-100 hover:text-lime-500"
                     @click.prevent.stop="showRemoveWebsiteModal = true"></XMarkIcon>
        </button>
        <div class="rounded-xl w-full overflow-hidden">
          <div
              class="rounded-xl z-10 opacity-0 transition duration-300 ease-in-out absolute to-transparent bg-gradient-to-t inset-x-0 bottom-0 pt-30 text-white flex items-end group-hover:opacity-100 from-black/80">
            <div>
              <div
                  class="transform-gpu p-4 text-xl translate-y-4 transform transition duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
                <div class="font-bold">{{ props.website.title }}</div>
                <div class="opacity-60 text-sm">{{ props.website.url }}</div>
              </div>
            </div>
          </div>
          <client-only>
            <nuxt-picture
                v-if="!loading"
                class="rounded-xl block object-cover object-center w-full h-full"
                :class="{ 'hidden': !imageLoaded }"
                @load="imageLoaded = true"
                width="1920"
                height="1080"
                sizes="xs:100px md:250px lg:512"
                :alt="title"
                :src="src"
                :img-attrs="{class: 'group-hover:scale-110 transition duration-300 ease-in-out'}"
            />
          </client-only>
          <div class="rounded-xl flex items-center justify-center w-full h-56 bg-gray-300 dark:bg-stone-700 animate-pulse"
               v-if="loading || !imageLoaded">
            <svg class="w-12 h-12 text-gray-200 dark:text-stone-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                 fill="currentColor" viewbox="0 0 640 512">
              <path
                  d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"></path>
            </svg>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
  <RemoveWebsiteModal :open="showRemoveWebsiteModal" @close="showRemoveWebsiteModal = false"
                      @confirm="deleteWebsite"></RemoveWebsiteModal>
  <WebsiteModal :open="showEditWebsiteModal" @close="showEditWebsiteModal = false" @confirm="editWebsite"
                :website="props.website"></WebsiteModal>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {useDark} from "@vueuse/core";
import {XMarkIcon} from '@heroicons/vue/24/solid'

const props = defineProps({website: {type: Object, required: true}});
const emit = defineEmits(['delete', 'edit']);

const isDark = useDark();
isDark.value = true; // Default to dark mode
isDark.value; // Need to access it to make it reactive


const editDashboard = inject('editDashboard') as any;

const showRemoveWebsiteModal = ref(false);
const showEditWebsiteModal = ref(false);
const imageLoaded = ref(false);

const loading = computed(() => {
  return 'pending' in props.website ? props.website.pending : false;
})

const src = computed(() => {
  if (!props.website) return '';
  return '/thumbnails' + (isDark.value ? props.website.image.dark : props.website.image.light);
})

const title = computed(() => {
  return props.website ? props.website.title : '';
})

function handleLoad() {
  console.log('loaded');
}

function linkClicked() {
  if (editDashboard.value) {
    showEditWebsiteModal.value = true;
  } else {
    window.open(props.website.url, '_blank');
  }
}

function deleteWebsite(id: string) {
  showRemoveWebsiteModal.value = false;
  emit('delete', props.website.id)
}

function editWebsite(data: Record<string, any>) {
  showEditWebsiteModal.value = false;
  emit('edit', {id: props.website.id, ...data})
}
</script>
