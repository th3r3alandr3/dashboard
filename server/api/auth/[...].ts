import CredentialsProvider from 'next-auth/providers/credentials'
import {NuxtAuthHandler} from '#auth'
import {initializeDatabase} from "~/server/database/database";
import * as Users from "~/server/database/users";

export default NuxtAuthHandler({
    secret: 'qr2+WOdAfavxkX13ieii7w==',
    session: {
        strategy: 'jwt'
    },
    debug: true,
    jwt: {
        maxAge: 60 * 60 * 24 * 30,
    },
    callbacks: {
        jwt: ({token, account, user}: any) => {
            if (account && user) {
                token.accessToken = account.access_token
                token.user = user
            }

            return token
        },
        session: ({token, session}: any) => {
            if (token) {
                session.user = token.user
                session.accessToken = token.accessToken
            }
            return session
        },
    },
    pages: {
        signIn: '/login',
        signOut: '/login'
    },
    providers: [
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        CredentialsProvider.default({
            id: 'credentials',
            name: 'Credentials',
            profile(profile: User) {
                return {
                    id: profile.id,
                    username: profile.username,
                    roles: profile.roles,
                }
            },
            credentials: {
                username: {label: 'Username', type: 'text'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials: Record<string, string>) {
                try {
                    const { databasePath } = useRuntimeConfig();
                    const database = await initializeDatabase(databasePath);
                    const user = await Users.login(database, {username: credentials.username, password: credentials.password});
                    if (user) {
                        return {id: user.id, username: user.username, roles: user.roles};
                    }
                } catch (e) {
                    console.error(e);
                    return null;
                }

                return null;
            }
        })
    ]
})
