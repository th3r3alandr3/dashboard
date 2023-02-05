import { DatabaseConnection } from '@databases/sqlite';
import {sql} from './database';
import * as Users from "~/server/database/users";
import * as Websites from "~/server/database/websites";
export async function init(db: DatabaseConnection) {
    await up(db);
}

export async function destroy(db: DatabaseConnection) {
    await down(db);
}

export async function up(db: DatabaseConnection) {
    await Users.createTable(db);
    await Websites.createTable(db);
    await Users.init(db);
}

export async function down(db: DatabaseConnection) {
    await Websites.dropTable(db);
    await Users.dropTable(db);
}
