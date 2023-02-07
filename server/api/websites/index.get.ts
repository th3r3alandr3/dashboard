import * as Websites from '~/server/database/websites';
import { initializeDatabase } from "~/server/database/database";

export default defineEventHandler(async (event) => {
    const { databasePath } = useRuntimeConfig();
    const database = await initializeDatabase(databasePath);
    return Websites.list(database,  <User> event.context.user);
});
