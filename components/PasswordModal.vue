<template>
  <TransitionRoot
    as="template"
    :show="open"
  >
    <Dialog
      as="div"
      class="relative z-20"
      @close="close"
    >
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-opacity-75 bg-stone-500 dark:bg-stone-800 dark:bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-20 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white dark:bg-stone-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="bg-white dark:bg-stone-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-stone-900 dark:text-stone-100"
                  >
                    Passwort ändern
                  </DialogTitle>
                  <div class="mt-2">
                    <form>
                      <div class="relative z-0 my-6">
                        <input
                          id="password"
                          v-model="formData.password"
                          type="password"
                          class="block py-2.5 px-0 w-full text-sm text-stone-900 bg-transparent border-0 border-b-2 border-stone-300 appearance-none dark:text-white dark:border-stone-600 dark:focus:border-lime-500 focus:outline-none focus:ring-0 focus:border-lime-600 peer"
                          :class="{ 'text-red-700 dark:text-red-500 focus:border-red-600 dark:focus:border-red-500': v$.password.$error}"
                          placeholder=" "
                          @change="v$.password.$touch"
                        >
                        <label
                          for="password"
                          class="absolute text-sm text-stone-500 dark:text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          :class="{ 'text-red-700 dark:text-red-500 peer-focus:text-red-600 peer-focus:dark:text-red-500': v$.password.$error}"
                        >
                          Aktuelles Passwort
                        </label>
                        <p
                          v-if="v$.password.$error"
                          class="mt-2 text-sm text-red-600 dark:text-red-500"
                        >
                          {{ v$.password.$errors[0].$message }}
                        </p>
                      </div>
                      <div class="relative z-0 my-6">
                        <input
                          id="password"
                          v-model="formData.newPassword"
                          type="password"
                          class="block py-2.5 px-0 w-full text-sm text-stone-900 bg-transparent border-0 border-b-2 border-stone-300 appearance-none dark:text-white dark:border-stone-600 dark:focus:border-lime-500 focus:outline-none focus:ring-0 focus:border-lime-600 peer"
                          :class="{ 'text-red-700 dark:text-red-500 focus:border-red-600 dark:focus:border-red-500': v$.newPassword.$error}"
                          placeholder=" "
                          @change="v$.newPassword.$touch"
                        >
                        <label
                          for="password"
                          class="absolute text-sm text-stone-500 dark:text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          :class="{ 'text-red-700 dark:text-red-500 peer-focus:text-red-600 peer-focus:dark:text-red-500': v$.newPassword.$error}"
                        >
                          Neues Passwort
                        </label>
                        <p
                          v-if="v$.newPassword.$error"
                          class="mt-2 text-sm text-red-600 dark:text-red-500"
                        >
                          {{ v$.newPassword.$errors[0].$message }}
                        </p>
                      </div>
                      <div class="relative z-0 my-6">
                        <input
                          id="repeatedPassword"
                          v-model="formData.repeatedPassword"
                          type="password"
                          class="block py-2.5 px-0 w-full text-sm text-stone-900 bg-transparent border-0 border-b-2 border-stone-300 appearance-none dark:text-white dark:border-stone-600 dark:focus:border-lime-500 focus:outline-none focus:ring-0 focus:border-lime-600 peer"
                          :class="{ 'text-red-700 dark:text-red-500 focus:border-red-600 dark:focus:border-red-500': v$.repeatedPassword.$error}"
                          placeholder=" "
                          @change="v$.repeatedPassword.$touch"
                        >
                        <label
                          for="repeatedPassword"
                          class="absolute text-sm text-stone-500 dark:text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          :class="{ 'text-red-700 dark:text-red-500 peer-focus:text-red-600 peer-focus:dark:text-red-500': v$.repeatedPassword.$error}"
                        >
                          Neues Passwort wiederholen
                        </label>
                        <p
                          v-if="v$.repeatedPassword.$error"
                          class="mt-2 text-sm text-red-600 dark:text-red-500"
                        >
                          {{ v$.repeatedPassword.$errors[0].$message }}
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="bg-stone-50 dark:bg-stone-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md border border-transparent bg-lime-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-lime-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  @click="validateInput"
                >
                  Speichern
                </button>
                <button
                  ref="cancelButtonRef"
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md border border-stone-300 bg-white px-4 py-2 text-base font-medium text-stone-700 shadow-sm hover:bg-stone-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="close"
                >
                  Abbrechen
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'
import {useVuelidate} from '@vuelidate/core'
import {required, minLength, sameAs, not, helpers} from '@vuelidate/validators'

const props = defineProps({open: {type: Boolean, required: true}});
const emit = defineEmits(['close', 'confirm']);

const open = ref(props.open);

const formData = reactive({
    password: '',
    newPassword: '',
    repeatedPassword: '',
})

const rules = {
    password: {
        required: helpers.withMessage('Dieses Feld darf nicht leer sein.', required),
    },
    newPassword: {
        required: helpers.withMessage('Dieses Feld darf nicht leer sein.', required),
        minLength: helpers.withMessage('Dieses Feld muss mindestens 6 Zeichen enthalten.', minLength(6)),
        notSameAs: helpers.withMessage('Das neue Password muss sich vom vorherigen unterscheiden.', not(sameAs(computed(() => formData.password)))),
    },
    repeatedPassword: {
        required: helpers.withMessage('Dieses Feld darf nicht leer sein.', required),
        sameAs: helpers.withMessage('Die Passwörter stimmen nicht überein.', sameAs(computed(() => formData.newPassword))),
    },
}

const v$ = useVuelidate(rules, formData)

watch(() => props.open, (value) => {
    open.value = value
})

async function validateInput() {
    v$.value.$validate();
    if (v$.value.$error) {
        return;
    }
    const {repeatedPassword, ...form} = formData;
    reset()
    emit('confirm', form);
}

function close() {
    reset()
    emit('close')
}

function reset() {
    v$.value.$reset()
    formData.password = '';
    formData.newPassword = '';
    formData.repeatedPassword = '';
}
</script>
