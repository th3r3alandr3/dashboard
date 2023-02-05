<template>
  <div class="flex justify-center items-center">
    <form
      class="w-full md:w-1/2 xl:w-1/4 bg-white dark:bg-stone-900 rounded px-8 pt-6 pb-8 mb-4 border-rounded rounded-l shadow-xl"
      @submit.prevent="onLoginClick"
    >
      <p
        v-if="form.error"
        class="text-red-500 text-sm w-full mb-4"
      >
        {{ form.error }}
      </p>
      <div class="relative z-0 w-full mb-6 group">
        <input
          id="username"
          v-model="form.data.username"
          type="text"
          name="username"
          class="block py-2.5 px-0 w-full text-sm text-stone-900 bg-transparent border-0 border-b-2 border-stone-300 appearance-none dark:text-white dark:border-stone-600 dark:focus:border-lime-500 focus:outline-none focus:ring-0 focus:border-lime-600 peer"
          placeholder=" "
          required
        >
        <label
          for="username"
          class="peer-focus:font-medium absolute text-sm text-stone-500 dark:text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Benutzername</label>
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <input
          id="password"
          v-model="form.data.password"
          type="password"
          name="password"
          class="block py-2.5 px-0 w-full text-sm text-stone-900 bg-transparent border-0 border-b-2 border-stone-300 appearance-none dark:text-white dark:border-stone-600 dark:focus:border-lime-500 focus:outline-none focus:ring-0 focus:border-lime-600 peer"
          placeholder=" "
          required
        >
        <label
          for="password"
          class="peer-focus:font-medium absolute text-sm text-stone-500 dark:text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Passwort</label>
      </div>
      <button
        type="submit"
        class="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
      >
        Anmelden
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: "login",
    middleware: ['guest-only'],
})
const {signIn} = useSession();
const route = useRoute();
const callbackUrl = ref<string | undefined>(<string>route.query.callbackUrl || '/');


const form = reactive({
    data: {
        username: '',
        password: '',
    },
    error: '',
    pending: false,
})

const errors: Record<string, string> = {
    Signin: "Versuche, dich mit einem anderen Konto anzumelden.",
    OAuthSignin: "Versuche dich mit einem anderen Konto anzumelden.",
    OAuthCallback: "Versuche, dich mit einem anderen Konto anzumelden.",
    OAuthCreateAccount: "Versuche, dich mit einem anderen Konto anzumelden.",
    EmailCreateAccount: "Versuche, dich mit einem anderen Konto anzumelden.",
    Callback: "Versuche, dich mit einem anderen Konto anzumelden.",
    OAuthAccountNotLinked: "Um deine Identität zu bestätigen, melde dich mit demselben Konto an, das du ursprünglich benutzt hast.",
    EmailSignin: "Die E-Mail konnte nicht gesendet werden.",
    CredentialsSignin: "Die Anmeldung ist fehlgeschlagen. Überprüfe, ob die von dir angegebenen Daten korrekt sind.",
    SessionRequired: "Bitte melde dich an, um auf diese Seite zuzugreifen.",
    default: "Die Anmeldung ist fehlgeschlagen.",

}

const onLoginClick = async () => {
    const {username, password} = form.data;
    const {error, url} = await signIn('credentials', {username, password, callbackUrl: callbackUrl.value, redirect: false})
    if (error) {
        form.error = errors[error] || errors.default;
    } else {
        await navigateTo(url, {external: true});
    }
}
</script>
