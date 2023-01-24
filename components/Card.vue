<template lang="pug">
.flex.flex-wrap(class='w-1/3 max-w-full' :class='{ "animate-wiggle": editDashboard }')
  .w-full(class='md:m-4')
    nuxt-link(:to='props.website.url' @click.prevent="linkClicked").relative.group
      button.rounded-full.p-2.absolute.-top-3.-right-3.z-20.bg-black.opacity-80(v-if="editDashboard" class='focus:outline-none')
        XMarkIcon.w-4.h-4.text-white.opacity-100(class='hover:text-lime-500' @click.prevent.stop='showRemoveWebsiteModal = true')
      .w-full.overflow-hidden
          .rounded-xl.z-10.opacity-0.transition.duration-300.ease-in-out.absolute.to-transparent.bg-gradient-to-t.inset-x-0.-bottom-2.pt-30.text-white.flex.items-end(class='group-hover:opacity-100 from-black/80')
            div
              .transform-gpu.p-4.text-xl.translate-y-4.pb-6.transform.transition.duration-300.ease-in-out(class='group-hover:opacity-100 group-hover:translate-y-0')
                .font-bold {{ props.website.title }}
                .opacity-60.text-sm {{ props.website.url }}
          nuxt-picture.block.object-cover.object-center.w-full.h-full.rounded-lg(v-if='true' :alt='props.website.title' :src='"/thumbnails" + (isDark ? props.website.image.dark : props.website.image.light)' :img-attrs='{class: "group-hover:scale-110 transition duration-300 ease-in-out"}')
          .flex.items-center.justify-center.h-64.mb-4.bg-gray-300.rounded.animate-pulse(v-else)
            nuxt-icon.w-12.h-12.text-gray-200(name='image')
RemoveWebsiteModal(:open='showRemoveWebsiteModal' @close='showRemoveWebsiteModal = false' @confirm='deleteWebsite')
WebsiteModal(:open='showEditWebsiteModal' @close='showEditWebsiteModal = false' @confirm='editWebsite' :website='props.website')
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {useDark} from "@vueuse/core";
import { XMarkIcon } from '@heroicons/vue/24/solid'

const props = defineProps({website: {type: Object, required: true}});
const emit = defineEmits(['delete', 'edit']);
const isDark = useDark();

const editDashboard = inject('editDashboard') as any;

const showRemoveWebsiteModal = ref(false);
const showEditWebsiteModal = ref(false);

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
