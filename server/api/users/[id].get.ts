import * as Users from '~/server/database/users';
import {initializeDatabase} from '~/server/database/database';

export default defineEventHandler(async (event) => {
    const {databasePath} = useRuntimeConfig();
    const database = await initializeDatabase(databasePath);
    return Users.getById(database, event.context.params);
});
