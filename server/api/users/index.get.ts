import * as Users from '~/ts/users';
import { initializeDatabase } from "~/ts/database";
import {removePasswordFromUser} from "~/ts/utils";

export default defineEventHandler(async () => {
    const { databasePath } = useRuntimeConfig();
    const database = await initializeDatabase(databasePath);
    const users = await Users.list(database);
    return users.map((user) => removePasswordFromUser(user));
});
