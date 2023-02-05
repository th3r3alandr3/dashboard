import {getServerSession} from '#auth'

export default defineEventHandler(async (event) => {
    const url = event.node.req.url;
    if (!url?.startsWith('/api') || url?.startsWith('/api/auth') || url === '/api/users/login') {
        return;
    }

    const session = await getServerSession(event)
    if (!session) {
        throw createError({statusMessage: 'Unauthenticated', statusCode: 403})
    }

    const user = session.user as User;
    if(url?.startsWith('/api/users') && !user?.roles.includes('ADMIN')) {
        throw createError({statusMessage: 'Unauthenticated', statusCode: 403})
    }

    event.context.user = user;
})
