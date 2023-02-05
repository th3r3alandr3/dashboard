import * as Websites from '~/server/database/websites';
import {initializeDatabase} from '~/server/database/database';

export default defineEventHandler(async (event) => {
    const {databasePath} = useRuntimeConfig();
    const database = await initializeDatabase(databasePath);
    const data = await readBody(event);
    return Websites.update(database, {...data, ...event.context.params}, event.context.user);
});
