export default defineNuxtRouteMiddleware(() => {
    const {status, signIn} = useSession()
    if (status.value === 'authenticated') {
        return navigateTo({name: 'index'})
    }

    return
})
