export default defineNuxtRouteMiddleware((to) => {
    const {status, signIn} = useSession()
    if (status.value === 'authenticated') {
        return
    }

    return signIn(undefined, {callbackUrl: to.path, redirect: false}) as ReturnType<typeof navigateTo>
})
