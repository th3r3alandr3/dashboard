import { DatabaseConnection } from '@databases/sqlite';
import {sql} from './database';
export async function init(db: DatabaseConnection) {
    await up(db);
}

export async function destroy(db: DatabaseConnection) {
    await down(db);
}

export async function up(db: DatabaseConnection) {
    await db.query(sql`
    CREATE TABLE IF NOT EXISTS websites (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      img_light TEXT NOT NULL,
      img_dark TEXT NOT NULL,
      priority INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_DATE,
      updated_at DATETIME
    );
  `);
}

export async function down(db: DatabaseConnection) {
    await db.query(sql`DROP TABLE IF EXISTS websites`)
}
