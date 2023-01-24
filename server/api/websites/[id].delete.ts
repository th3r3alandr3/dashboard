import * as Websites from '~/ts/websites';
import {initializeDatabase} from '~/ts/database';

export default defineEventHandler(async (event) => {
    const {databasePath} = useRuntimeConfig();
    const database = await initializeDatabase(databasePath);
    const data = await readBody(event);
    return Websites.deleteById(database, event.context.params);
});
