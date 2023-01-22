<template lang="pug">
.flex.flex-wrap(class='w-1/3 max-w-full')
  .w-full.overflow-hidden(class='md:m-4')
    nuxt-link(:to='props.website.url').relative.group
      .rounded-xl.z-10.opacity-0.transition.duration-300.ease-in-out.absolute.to-transparent.bg-gradient-to-t.inset-x-0.-bottom-2.pt-30.text-white.flex.items-end(class='group-hover:opacity-100 from-black/80')
        div
          .transform-gpu.p-4.text-xl.translate-y-4.pb-6.transform.transition.duration-300.ease-in-out(class='group-hover:opacity-100 group-hover:translate-y-0')
            .font-bold {{ props.website.title }}
            .opacity-60.text-sm {{ props.website.url }}
      nuxt-picture.block.object-cover.object-center.w-full.h-full.rounded-lg(v-if='true' :alt='props.website.title' :src='"/thumbnails" + (isDark ? props.website.image.dark : props.website.image.light)' :img-attrs='{class: "group-hover:scale-110 transition duration-300 ease-in-out"}')
      .flex.items-center.justify-center.h-64.mb-4.bg-gray-300.rounded.animate-pulse(v-else)
        nuxt-icon.w-12.h-12.text-gray-200(name='image')
</template>

<script lang="ts" setup>
import {useDark} from "@vueuse/core";

const props = defineProps({website: {type: Object, required: true}});
const isDark = useDark();
// let {data: response, pending} = useLazyFetch(`/api/thumbnail/${encodeURIComponent(<string>props.site.url)}`);
</script>
