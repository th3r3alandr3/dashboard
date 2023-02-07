export default defineNuxtRouteMiddleware((to) => {
    const { status, signIn, data } = useSession()
    const user = data.value?.user as User;
    if (status.value === 'authenticated' && user?.roles.includes('ADMIN')) {
        return
    }

    return signIn(undefined, { callbackUrl: to.path, redirect: false}) as ReturnType<typeof navigateTo>
})
