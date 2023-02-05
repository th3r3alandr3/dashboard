import * as Users from '~/server/database/users';
import {initializeDatabase} from '~/server/database/database';

export default defineEventHandler(async (event) => {
    const {databasePath} = useRuntimeConfig();
    const database = await initializeDatabase(databasePath);
    const data = await readBody(event);
    return await Users.login(database, data);
});
