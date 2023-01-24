import {DatabaseConnection, sql} from '@databases/sqlite';
import {randomUUID} from 'node:crypto';
import {createScreenshot} from './utils';
import {z} from 'zod';
import {Md5} from "ts-md5";

const websiteGetByIdInput = z.object({
    id: z.string(),
});


const websiteAddOptionsInput = z.object({
    url: z.string().max(255).url(),
    title: z.string().max(255),
});


const websiteDeleteOptionsInput = z.object({
    id: z.string()
});


const websiteModelSchema = z.object({
    id: z.string().max(100),
    title: z.string(),
    url: z.string(),
    img_light: z.string(),
    img_dark: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
})

const fromModelToWebsite = (model: WebsiteModel): Website => {
    const params = websiteModelSchema.parse(model);

    return {
        id: params.id,
        title: params.title,
        url: params.url,
        image: {
            light: params.img_light,
            dark: params.img_dark,
        },
        createdAt: new Date(params.created_at),
        updatedAt: new Date(params.updated_at),
    }
}

export async function getById(db: DatabaseConnection, options: WebsiteGetByIdOptions) {
    const params = websiteGetByIdInput.parse(options);
    const results: WebsiteModel[] = await db.query(sql`SELECT *
                                                       FROM websites
                                                       WHERE id = ${params.id}`);
    return fromModelToWebsite(results[0]);
}

export async function list(db: DatabaseConnection) {
    const results: WebsiteModel[] = await db.query(sql`SELECT *
                                                       FROM websites`);
    return results.map(fromModelToWebsite);
}

export async function add(db: DatabaseConnection, options: WebsiteAddOptions) {
    const params = websiteAddOptionsInput.parse(options);

    const fileName = Md5.hashStr(params.url)
    const {dark, light} = await createScreenshot(params.url, fileName)

    const website: WebsiteModel = {
        id: randomUUID(),
        url: params.url,
        title: params.title,
        img_dark: dark,
        img_light: light,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }

    await db.query(sql`
        INSERT INTO websites (id, url, title, img_dark, img_light, created_at, updated_at)
        VALUES (${website.id}, ${website.url}, ${website.title}, ${website.img_dark}, ${website.img_light},
                ${website.created_at}, ${website.updated_at});
    `)

    return getById(db, {id: website.id});
}

export async function deleteById(db: DatabaseConnection, options: WebsiteDeleteOptions) {
    const params = websiteDeleteOptionsInput.parse(options);
    await db.query(sql`DELETE
                       FROM websites
                       WHERE id = ${params.id}`);
    return true;
}
