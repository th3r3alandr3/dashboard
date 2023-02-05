import * as Users from '~/server/database/users';
import { initializeDatabase } from "~/server/database/database";
import {removePasswordFromUser} from "~/server/misc/utils";

export default defineEventHandler(async () => {
    const { databasePath } = useRuntimeConfig();
    const database = await initializeDatabase(databasePath);
    const users = await Users.list(database);
    return users.map((user) => removePasswordFromUser(user));
});
