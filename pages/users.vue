<template>
  <section class="overflow-hidden text-stone-700 flex justify-center pb-12">
    <div class="px-5 py-2 mx-auto lg:pt-12 lg:px-32 md:container md:mx-auto">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-stone-500 dark:text-stone-400">
          <thead class="text-xs text-stone-700 uppercase bg-stone-50 dark:bg-stone-700 dark:text-stone-400">
            <tr>
              <th
                scope="col"
                class="px-6 py-3"
              >
                ID
              </th>
              <th
                scope="col"
                class="px-6 py-3"
              >
                <div class="flex items-center">
                  Benutzername
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-3 h-3 ml-1"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 320 512"
                    >
                      <path
                        d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                      />
                    </svg>
                  </a>
                </div>
              </th>
              <th
                scope="col"
                class="px-6 py-3"
              >
                <div class="flex items-center">
                  Erstellungsdatum
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-3 h-3 ml-1"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 320 512"
                    >
                      <path
                        d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                      />
                    </svg>
                  </a>
                </div>
              </th>
              <th
                scope="col"
                class="px-6 py-3"
              >
                <div class="flex items-center">
                  Änderungsdatum
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-3 h-3 ml-1"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 320 512"
                    >
                      <path
                        d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                      />
                    </svg>
                  </a>
                </div>
              </th>
              <th
                scope="col"
                class="px-6 py-3"
              >
                <div class="flex items-center">
                  Rollen
                </div>
              </th>
              <th
                scope="col"
                class="px-6 py-3"
              >
                <span class="sr-only">Bearbeiten</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user ,index) in users"
              :key="user.id"
              class="bg-white dark:bg-stone-800"
              :class="{ 'border-b dark:border-stone-700': index !== users.length - 1 }"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-stone-900 whitespace-nowrap dark:text-white"
              >
                {{ user.id }}
              </th>
              <td class="px-6 py-4">
                {{ user.username }}
              </td>
              <td class="px-6 py-4">
                {{ formatDate(user.createdAt) }}
              </td>
              <td class="px-6 py-4">
                {{ formatDate(user.updatedAt) }}
              </td>
              <td class="px-6 py-4">
                <ul>
                  <li
                    v-for="(role, roleIndex) in user.roles"
                    :key="roleIndex"
                  >
                    {{ role[0].toUpperCase() + role.slice(1).toLowerCase() }}
                  </li>
                </ul>
              </td>
              <td class="flex items-center px-6 py-4 space-x-3">
                <button
                  type="button"
                  class="rounded-full bg-slate-400 dark:bg-stone-900 p-2 text-lime-600 dark:text-lime-500 hover:text-white dark:hover:text-white dark:hover:bg-lime-500  focus:outline-none"
                  @click="editUser(user)"
                >
                  <PencilIcon class="w-5 h-5" />
                </button>
                <button
                  type="button"
                  class="rounded-full bg-slate-400 dark:bg-stone-900 p-2 text-red-600 dark:text-red-500  hover:text-white dark:hover:text-white dark:hover:bg-red-500  focus:outline-none"
                  @click="onDeleteUser(user)"
                >
                  <TrashIcon class="w-5 h-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <ActionMenu>
      <button
        type="button"
        title="Benutzer hinzufügen"
        class="w-[56px] h-[56px] text-stone-500 bg-white rounded-full border border-stone-200 dark:border-stone-600 hover:text-stone-900 shadow-sm dark:hover:text-white dark:text-stone-400 hover:bg-stone-50 dark:bg-stone-700 dark:hover:bg-stone-600 focus:ring-4 focus:ring-stone-300 focus:outline-none dark:focus:ring-stone-400"
        @click="addUser"
      >
        <UserPlusIcon class="w-6 h-6 mx-auto mt-px" />
      </button>
    </ActionMenu>
    <UserModal
      :open="showUserModal"
      :user="selectedUser"
      @close="onCloseUserModal"
      @confirm="onConfirmUserModal"
    />
    <RemoveUserModal
      :open="showDeleteUserModal"
      :user="selectedUser"
      @close="onCloseDeleteUserModal"
      @confirm="deleteUser"
    />
  </section>
</template>

<script setup lang="ts">

import {useToast} from "vue-toastification";
import {PencilIcon, TrashIcon, UserPlusIcon} from '@heroicons/vue/24/outline'
import {Ref} from "vue";
import RemoveUserModal from "~/components/RemoveUserModal.vue";
import ActionMenu from "~/components/ActionMenu.vue";

definePageMeta({
    middleware: ['admin-only'],
})

const headers = useRequestHeaders(['cookie']) as HeadersInit

const toast = useToast();

const showUserModal = ref(false);

const showDeleteUserModal = ref(false);

const selectedUser = ref(null) as Ref<User | null>;

const users = reactive(await $fetch("/api/users", {headers})) as User[];

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
};

async function onDeleteUser(user: User) {
    selectedUser.value = user;
    showDeleteUserModal.value = true;
}

async function onCloseDeleteUserModal() {
    showDeleteUserModal.value = false;
    selectedUser.value = null;
}

async function onCloseUserModal() {
    showUserModal.value = false;
    setTimeout(() => {
        selectedUser.value = null;
    }, 300);
}

async function onConfirmUserModal(user: User) {
    showUserModal.value = false;
    setTimeout(() => {
        selectedUser.value = null;
    }, 300);

    if (user.id) {
        await patchUser(user, true);
    } else {
        await postUser(user);
    }
}

async function deleteUser(user: User) {
    showDeleteUserModal.value = false;
    selectedUser.value = null;

    try {
        await $fetch("/api/users/" + user.id, {method: "DELETE", headers});
        users.splice(users.findIndex((oldUser) => oldUser.id === user.id), 1);
        toast.success("Die User wurde erfolgreich gelöscht!");
    } catch (e) {
        toast.error("Die User konnte nicht gelöscht werden!");
    }
}

async function editUser(user: User) {
    selectedUser.value = user;
    showUserModal.value = true;
}

async function addUser() {
    selectedUser.value = null;
    showUserModal.value = true;
}

async function patchUser(data: Partial<User>, updateArray = true) {
    try {
        const user = await $fetch("/api/users/" + data.id, {method: "PATCH", body: data, headers}) as User;
        if (updateArray) {
            users.splice(users.findIndex((oldUser) => oldUser.id === user.id), 1, user);
            toast.success("Die User wurde erfolgreich bearbeitet!");
        }
        return user;
    } catch (e) {
        toast.error("Die User konnte nicht bearbeitet werden!");
    }
}

async function postUser(data: Partial<User>) {
    try {
        const user = await $fetch("/api/users", {method: "POST", body: data, headers}) as User;
        users.push(user);
        toast.success("Die User wurde erfolgreich erstellt!");
        return user;
    } catch (e) {
        toast.error("Die User konnte nicht erstellt werden!");
    }
}
</script>
