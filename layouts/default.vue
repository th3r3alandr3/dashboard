<template>
  <div>
    <Disclosure
      v-slot="{ open }"
      as="nav"
      class="bg-slate-500 dark:bg-stone-900 fixed top-0 w-full opacity-75 z-10"
    >
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton
              class="inline-flex items-center justify-center rounded-md p-2 text-stone-400 hover:bg-slate-300 dark:hover:bg-stone-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span class="sr-only">Open main menu</span>
              <Bars3Icon
                v-if="!open"
                class="block h-6 w-6"
                aria-hidden="true"
              />
              <XMarkIcon
                v-else
                class="block h-6 w-6"
                aria-hidden="true"
              />
            </DisclosureButton>
          </div>
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center">
              <nuxt-icon
                class="w-8 h-8 text-lime-500"
                name="dashboard"
              />
            </div>
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <nuxt-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.href"
                  class="text-stone-300 hover:bg-slate-300 dark:hover:bg-stone-700 hover:text-white dark:hover:text-lime-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {{ item.name }}
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <!--            <button-->
            <!--              type="button"-->
            <!--              class="rounded-full bg-slate-400 text-stone-300 dark:bg-stone-800 p-1 dark:text-stone-400 hover:text-white focus:outline-none"-->
            <!--            >-->
            <!--              <MoonIcon-->
            <!--                v-if="!isDark"-->
            <!--                class="h-6 w-6"-->
            <!--                aria-hidden="true"-->
            <!--                @click="toggleDark()"-->
            <!--              />-->
            <!--              <SunIcon-->
            <!--                v-else-->
            <!--                class="h-6 w-6"-->
            <!--                aria-hidden="true"-->
            <!--                @click="toggleDark()"-->
            <!--              />-->
            <!--            </button>-->

            <!-- Profile dropdown -->
            <Menu
              as="div"
              class="relative ml-3"
            >
              <div>
                <MenuButton class="flex rounded-full bg-slate-400 dark:bg-stone-800 text-sm focus:outline-none">
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://api.dicebear.com/5.x/avataaars/svg?backgroundType=gradientLinear,solid"
                    alt="Avatar"
                  >
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="bg-slate-400 dark:bg-stone-800 absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem
                    v-slot="{ active }"
                    class="dark:bg-stone-800"
                  >
                    <a
                      href="#"
                      :class="[active ? 'text-stone-600 dark:text-stone-300' : 'text-stone-700 dark:text-stone-400', 'block px-4 py-2 text-sm']"
                      @click.prevent="showPasswordModal = true"
                    >
                      Passwort ändern
                    </a>
                  </MenuItem>
                  <MenuItem
                    v-slot="{ active }"
                    class="dark:bg-stone-800"
                  >
                    <a
                      href="#"
                      :class="[active ? 'text-stone-600 dark:text-stone-300' : 'text-stone-700 dark:text-stone-400', 'block px-4 py-2 text-sm']"
                      @click.prevent="onLogoutClick"
                    >
                      Ausloggen
                    </a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <PasswordModal
        :open="showPasswordModal"
        @close="showPasswordModal = false"
        @confirm="changePassword"
      />

      <DisclosurePanel class="sm:hidden">
        <div class="space-y-1 px-2 pt-2 pb-3">
          <DisclosureButton
            v-for="item in navigation"
            :key="item.name"
            as="a"
            :href="item.href"
            :class="[item.current ? 'bg-stone-900 text-white' : 'text-stone-300 hover:bg-stone-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']"
            :aria-current="item.current ? 'page' : undefined"
          >
            {{ item.name }}
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
    <slot />
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {Bars3Icon, MoonIcon, SunIcon, XMarkIcon} from '@heroicons/vue/24/outline'
import {useDark, useToggle} from '@vueuse/core';
import PasswordModal from "~/components/PasswordModal.vue";
import {useToast} from "vue-toastification";
import {FetchContext} from "ofetch";

const {signOut, data} = useSession()
const user = data.value?.user as User;
const isAdmin = user?.roles.includes('ADMIN');

const isDark = useDark();

isDark.value = true; // Default to dark mode
isDark.value // Need to access it to make it reactive

const toggleDark = useToggle(isDark);
const toast = useToast();

const editDashboard = ref(false)
const showPasswordModal = ref(false)
const passwordInvalid = ref(false)

provide('editDashboard', editDashboard)

const navigation = [
    {name: 'Dashboard', href: '/', current: true},
]


if (isAdmin) {
    navigation.push({name: 'Benutzerverwaltung', href: '/users', current: false})
}

function toggleEditDashboard() {
    editDashboard.value = !editDashboard.value;
}

async function onLogoutClick() {
    try {
        await signOut({redirect: false, callbackUrl: '/'});
        await navigateTo({name: 'login'});
    } catch (error) {
        console.error(error);
    }
}

async function changePassword(data: { password: string, newPassword: string }) {
    try {
        const headers = useRequestHeaders(['cookie']) as HeadersInit
        const userObj = {username: user.username, password: data.password, newPassword: data.newPassword};
        await $fetch("/api/users/changePassword", {
            method: 'PATCH',
            body: JSON.stringify(userObj),
            headers,
        });
        showPasswordModal.value = false;
        toast.success('Das Passwort wurde geändert.');
    } catch (error) {
        const {data} = error as { data: { statusCode: number, message: string } };
        if (data.statusCode === 401)
            toast.error(data.message);
        else
            toast.error('Ein Fehler ist aufgetreten.');
    }
}
</script>
