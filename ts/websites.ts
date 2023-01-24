import {DatabaseConnection, sql} from '@databases/sqlite';
import {randomUUID} from 'node:crypto';
import {createScreenshot} from './utils';
import {z} from 'zod';
import {Md5} from "ts-md5";

const websiteGetByIdInput = z.object({
    id: z.string(),
});

const websiteUpdateOptionsInput = z.object({
    id: z.string(),
    url: z.string().max(255).url().optional(),
    title: z.string().max(255).optional(),
    priority: z.number().int().min(0).optional(),
});


const websiteAddOptionsInput = z.object({
    url: z.string().max(255).url(),
    title: z.string().max(255),
});


const websiteDeleteOptionsInput = z.object({
    id: z.string()
});

const websiteSortOptionsInput = z.object({
    id: z.string(),
    newPriority: z.number().int().min(0),
    oldPriority: z.number().int(),
});


const websiteTotalSchema = z.object({
    total: z.number()
});


const websiteModelSchema = z.object({
    id: z.string().max(100),
    title: z.string(),
    url: z.string(),
    priority: z.number(),
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
        priority: params.priority,
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
                                                       FROM websites
                                                       ORDER BY priority ASC`);
    return results.map(fromModelToWebsite);
}

export async function count(db: DatabaseConnection) {
    const results = await db.query(sql`SELECT COUNT(*) AS total
                                       FROM websites`);
    const params = websiteTotalSchema.parse(results[0]);
    console.log(results, params);
    return params.total;
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
        priority: await count(db),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }

    await db.query(sql`
        INSERT INTO websites (id, url, title, img_dark, img_light, created_at, updated_at, priority)
        VALUES (${website.id}, ${website.url}, ${website.title}, ${website.img_dark}, ${website.img_light},
                ${website.created_at}, ${website.updated_at}, ${website.priority});
    `)

    return getById(db, {id: website.id});
}

export async function update(db: DatabaseConnection, options: WebsiteUpdateOptions) {
    const params = websiteUpdateOptionsInput.parse(options);
    const website = await getById(db, {id: params.id});
    let updated = false;

    if (params.url && params.url !== website.url) {
        website.url = params.url;
        const fileName = Md5.hashStr(params.url)
        const {dark, light} = await createScreenshot(params.url, fileName)
        website.image.dark = dark;
        website.image.light = light;
        updated = true;
    }

    if (params.title) {
        website.title = params.title;
        updated = true;
    }

    console.log(params, params.priority, website.priority);
    if (params.priority !== undefined && params.priority !== website.priority) {
        await updatePriority(db, {id: website.id, newPriority: params.priority, oldPriority: website.priority});
        updated = true;
    }

    if (updated) {
        await db.query(sql`
            UPDATE websites
            SET url        = ${website.url},
                title      = ${website.title},
                img_dark   = ${website.image.dark},
                img_light  = ${website.image.light},
                updated_at = ${new Date().toISOString()}
            WHERE id = ${website.id};
        `);
    }

    return getById(db, {id: website.id});
}

export async function updatePriority(db: DatabaseConnection, options: WebsiteSortOptions) {
    const prams = websiteSortOptionsInput.parse(options);
    console.log(prams);
    if (prams.newPriority === prams.oldPriority)
        return true;
    if (prams.newPriority < prams.oldPriority) {
        await db.query(sql`UPDATE websites
                           SET priority = case
                                              when id = ${prams.id} then ${prams.newPriority}
                                              when priority >= ${prams.newPriority} then priority + 1
                                              else priority end`);
    } else {
        await db.query(sql`UPDATE websites
                           SET priority = case
                                              when id = ${prams.id} then ${prams.newPriority}
                                              when priority <= ${prams.newPriority} and priority > ${prams.oldPriority}  then priority - 1
                                              else priority end`);
    }
    return true;
}

export async function deleteById(db: DatabaseConnection, options: WebsiteDeleteOptions) {
    const params = websiteDeleteOptionsInput.parse(options);
    const website = await getById(db, {id: params.id});
    await db.query(sql`DELETE
                       FROM websites
                       WHERE id = ${website.id}`);
    await db.query(sql`UPDATE websites
                       SET priority = case when priority > ${website.priority} then priority - 1 else priority end`);
    return true;
}
