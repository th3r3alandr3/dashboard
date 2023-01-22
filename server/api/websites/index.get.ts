import * as Websites from '~/ts/websites';
import { initializeDatabase } from "~/ts/database";

export default defineEventHandler(async () => {
    const { databasePath } = useRuntimeConfig();
    const database = await initializeDatabase(databasePath);
    return Websites.list(database);
});
