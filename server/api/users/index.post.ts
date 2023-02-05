import * as Users from '~/ts/users';
import {initializeDatabase} from '~/ts/database';

export default defineEventHandler(async (event) => {
    const {databasePath} = useRuntimeConfig();
    const database = await initializeDatabase(databasePath);
    const data = await readBody(event);
    return Users.add(database, data);
});
