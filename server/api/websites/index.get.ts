import * as Websites from '~/server/database/websites';
import { initializeDatabase } from "~/server/database/database";
import { getServerSession } from '#auth'
import {Session} from "next-auth";

export default defineEventHandler(async (event) => {
    const { databasePath } = useRuntimeConfig();
    const database = await initializeDatabase(databasePath);
    const session = await getServerSession(event) as Session;
    return Websites.list(database,  <User> session.user);
});
