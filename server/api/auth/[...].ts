import CredentialsProvider from 'next-auth/providers/credentials'
import {NuxtAuthHandler} from '#auth'
import {Session} from "next-auth";
import axios from "axios";

export default NuxtAuthHandler({
    secret: process.env.SECRET_KEY,
    session: {
        strategy: 'jwt'
    },
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
            async authorize(credentials: Record<string, Record<string, string>>) {
                try {
                    const response = await axios.post(`${process.env.BASE_URL}/api/users/login`, {username: credentials.username, password: credentials.password})
                    const user = response.data as User;
                    if (user) {
                        return {id: user.id, username: user.username, roles: user.roles};
                    }
                } catch (e) {
                    return null;
                }

                return null;
            }
        })
    ]
})
