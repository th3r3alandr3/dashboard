import {DatabaseConnection, sql} from '@databases/sqlite';
import {randomUUID} from 'node:crypto';
import {z} from 'zod';
import {Md5} from "ts-md5";
import * as argon2 from "argon2";

const userGetByIdInput = z.object({
    id: z.string(),
});

const userGetByUsernameInput = z.object({
    username: z.string().max(255),
});


const userLoginOptionsInput = z.object({
    username: z.string().max(255),
    password: z.string().max(255),
});

const changePasswordOptionsInput = z.object({
    username: z.string().max(255),
    password: z.string().max(255),
    newPassword: z.string().max(255),
});


const userUpdateOptionsInput = z.object({
    id: z.string(),
    username: z.string().max(255).optional(),
    password: z.string().max(255).optional(),
    roles: z.array(z.string()),
});


const userAddOptionsInput = z.object({
    username: z.string().max(255),
    password: z.string().max(255),
    roles: z.array(z.string()),
});


const userDeleteOptionsInput = z.object({
    id: z.string()
});


const userTotalSchema = z.object({
    total: z.number()
});


const userModelSchema = z.object({
    id: z.string().max(100),
    username: z.string(),
    password: z.string(),
    roles: z.string(),
    session_id: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
})

const fromModelToUser = (model: UserModel, includePassword = false): User => {
    const params = userModelSchema.parse(model);


    return {
        id: params.id,
        username: params.username,
        password: includePassword ? params.password : undefined,
        sessionId: params.session_id,
        roles: JSON.parse(params.roles),
        createdAt: new Date(params.created_at),
        updatedAt: new Date(params.updated_at),
    }
}

export async function getById(db: DatabaseConnection, options: UserGetByIdOptions, includePassword = false) {
    const params = userGetByIdInput.parse(options);
    const results: UserModel[] = await db.query(sql`SELECT *
                                                    FROM users
                                                    WHERE id = ${params.id}`);
    return results.length > 0 ? fromModelToUser(results[0], includePassword) : null;
}

export async function getByUsername(db: DatabaseConnection, options: UserGetByUsernameOptions, includePassword = false) {
    const params = userGetByUsernameInput.parse(options);
    const results: UserModel[] = await db.query(sql`SELECT * FROM users WHERE username = ${params.username}`);
    return results.length > 0 ? fromModelToUser(results[0], includePassword) : null;
}

export async function list(db: DatabaseConnection, includePassword = false) {
    const results: UserModel[] = await db.query(sql`SELECT * FROM users;`);
    return results.map((user) => fromModelToUser(user, includePassword));
}

export async function count(db: DatabaseConnection) {
    const results = await db.query(sql`SELECT COUNT(*) AS total FROM users`);
    const params = userTotalSchema.parse(results[0]);
    return params.total;
}

export async function createTable(db: DatabaseConnection) {
    await db.query(sql`
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            roles TEXT,
            session_id TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_DATE,
            updated_at DATETIME
        );
    `);
}

export async function dropTable(db: DatabaseConnection) {
    await db.query(sql`DROP TABLE IF EXISTS users;`);
}

export async function init(db: DatabaseConnection) {
    const users = await count(db)
    if(users > 0) {
        return;
    }
    const user: UserModel = {
        id: randomUUID(),
        username: 'admin',
        password: await argon2.hash('admin'),
        roles: JSON.stringify(['ADMIN']),
        session_id: Md5.hashStr(randomUUID()),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }

    await db.query(sql`
        INSERT INTO users (id, username, password, session_id, created_at, updated_at, roles)
        VALUES (${user.id}, ${user.username}, ${user.password}, ${user.session_id}, ${user.created_at},
                ${user.updated_at}, ${user.roles});
    `)

    return getById(db, {id: user.id});
}

export async function add(db: DatabaseConnection, options: UserAddOptions) {
    const params = userAddOptionsInput.parse(options);

    const user: UserModel = {
        id: randomUUID(),
        username: params.username,
        password: await argon2.hash(params.password),
        roles: JSON.stringify(params.roles),
        session_id: Md5.hashStr(randomUUID()),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }

    await db.query(sql`
        INSERT INTO users (id, username, password, session_id, created_at, updated_at, roles)
        VALUES (${user.id}, ${user.username}, ${user.password}, ${user.session_id}, ${user.created_at},
                ${user.updated_at}, ${user.roles});
    `)

    return getById(db, {id: user.id});
}

export async function login(db: DatabaseConnection, options: UserLoginOptions) {
    const params = userLoginOptionsInput.parse(options);
    const user = await getByUsername(db, {username: params.username}, true);
    if(user && user.password && await argon2.verify(user.password, params.password)) {
        const {password, ...rest} = user;
        return rest;
    }
    return null;
}

export async function changePassword(db: DatabaseConnection, options: ChangePasswordOptions) {
    const params = changePasswordOptionsInput.parse(options);
    const user = await getByUsername(db, {username: params.username}, true);
    if(user && user.password && await argon2.verify(user.password, params.password)) {
        user.password = await argon2.hash(params.newPassword);
        await db.query(sql`
            UPDATE users
            SET password   = ${user.password},
                updated_at = ${new Date().toISOString()}
            WHERE id = ${user.id};
        `);

        return getById(db, {id: user.id});
    }
    return createError({statusMessage: 'Das Passwort war ungültig.', statusCode: 401,});
}

export async function update(db: DatabaseConnection, options: UserUpdateOptions) {
    const params = userUpdateOptionsInput.parse(options);
    const user = await getById(db, {id: params.id}, true);
    if(user === null) {
        return createError({statusMessage: 'User not found', statusCode: 404,});
    }
    let updated = false;

    if (params.username && params.username !== user.username) {
        user.username = params.username;
        updated = true;
    }

    if (params.password) {
        try {
            user.password = await argon2.hash(params.password);
            updated = true;
        } catch (err) {
            console.log(err)
        }
    }

    if (params.roles && params.roles !== user.roles) {
        user.roles = params.roles;
        updated = true;
    }

    if (updated) {
        await db.query(sql`
            UPDATE users
            SET username   = ${user.username},
                password   = ${user.password},
                updated_at = ${new Date().toISOString()},
                roles      = ${JSON.stringify(user.roles)}
            WHERE id = ${user.id};
        `);
    }

    const {password, ...rest} = user;
    return rest;
}

export async function deleteById(db: DatabaseConnection, options: UserDeleteOptions) {
    const params = userDeleteOptionsInput.parse(options);
    const user = await getById(db, {id: params.id});
    if(user === null) {
        return createError({statusMessage: 'User not found', statusCode: 404,});
    }
    await db.query(sql`DELETE
                       FROM users
                       WHERE id = ${user.id}`);
    return true;
}
