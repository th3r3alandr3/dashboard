import * as Websites from '~/ts/websites';
import { initializeDatabase } from "~/ts/database";
import { getServerSession } from '#auth'
import {Session} from "next-auth";

export default defineEventHandler(async (event) => {
    const { databasePath } = useRuntimeConfig();
    const database = await initializeDatabase(databasePath);
    const session = await getServerSession(event) as Session;
    return Websites.list(database,  <User> session.user);
});
