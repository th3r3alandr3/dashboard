<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-20" @close="close">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                       leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
      </TransitionChild>

      <div class="fixed inset-0 z-20 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
                           enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                           enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                           leave-from="opacity-100 translate-y-0 sm:scale-100"
                           leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">Website hinzufügen
                  </DialogTitle>
                  <div class="mt-2">
                    <form>
                      <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                          Name
                        </label>
                        <input
                            v-model="formData.title"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username" type="text"
                            placeholder="Name"
                            @change="v$.title.$touch"
                        >
                        <p v-if="v$.title.$error" class="text-red-500 text-xs italic">{{ v$.title.$errors[0].$message }}</p>
                      </div>
                      <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                          URL
                        </label>
                        <input
                            v-model="formData.url"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="url"
                            placeholder="URL"
                            @change="v$.url.$touch"
                        >
                        <p v-if="v$.url.$error" class="text-red-500 text-xs italic">{{ v$.url.$errors[0].$message }}</p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button"
                        class="inline-flex w-full justify-center rounded-md border border-transparent bg-lime-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        @click="addWebsite">Hinzufügen
                </button>
                <button type="button"
                        class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        @click="close" ref="cancelButtonRef">Abbrechen
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {ref} from 'vue'
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'
import {useVuelidate} from '@vuelidate/core'
import {required, url} from '@vuelidate/validators'

const emit = defineEmits(['close'])
const props = defineProps({open: {type: Boolean, required: true}});

const open = ref(props.open)

const formData = reactive({
  title: '',
  url: '',
})

const rules = {
  title: {required},
  url: {required, url},
}

watch(() => props.open, (value) => {
  open.value = value
})
const v$ = useVuelidate(rules, formData)

async function addWebsite() {
  try {
    v$.value.$validate();
    if (v$.value.$error) {
      return;
    }
    const website = await $fetch("/api/websites/create", {
      method: "post",
      body: {
        title: formData.title,
        url: formData.url,
      },
    });
  } catch (e) {
    console.log(e)
  } finally {
    close()
  }
}

function close() {
  v$.value.$reset()
  formData.title = ''
  formData.url = ''
  emit('close')
}
</script>
