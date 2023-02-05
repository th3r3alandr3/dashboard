import * as Users from '~/ts/users';
import {initializeDatabase} from '~/ts/database';

export default defineEventHandler(async (event) => {
    const {databasePath} = useRuntimeConfig();
    const database = await initializeDatabase(databasePath);
    return Users.deleteById(database, event.context.params);
});
