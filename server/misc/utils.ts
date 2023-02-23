import * as puppeteer from "puppeteer";
import {existsSync} from "fs";

export async function createScreenshot(url: string, fileName: string) {
    if (existsSync(`public/thumbnails/${fileName}.jpeg`)) {
        return {dark: `/${fileName}.jpeg`, light: `/${fileName}-light.jpeg`};
    }
    const { usePuppeteerOptions } = useRuntimeConfig();
    const puppeteerOptions = {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    };
    const browser = await puppeteer.launch(usePuppeteerOptions === 'true' ? puppeteerOptions : undefined);
    const page = await browser.newPage();
    await page.emulateMediaFeatures([{name: 'prefers-color-scheme', value: 'dark'}]);
    await page.setViewport({width: 1920, height: 1080});
    try {
        await page.goto(url, {waitUntil: 'networkidle2', timeout: 10000});
    } catch (e) {
        console.log(e);
    }
    await page.screenshot({
        path: `public/thumbnails/${fileName}.jpeg`,
        quality: 100,
        type: 'jpeg',
        fullPage: false
    });
    if (existsSync(`.output`)) {
        await page.screenshot({
            path: `.output/public/thumbnails/${fileName}.jpeg`,
            quality: 100,
            type: 'jpeg',
            fullPage: false
        });
    }
    await page.emulateMediaFeatures([{name: 'prefers-color-scheme', value: 'light'}]);
    await page.setViewport({width: 1920, height: 1080});
    try {
        await page.goto(url, {waitUntil: 'networkidle2', timeout: 10000});
    } catch (e) {
        console.log(e);
    }
    await page.screenshot({
        path: `public/thumbnails/${fileName}-light.jpeg`,
        quality: 100,
        type: 'jpeg',
        fullPage: false
    });
    if (existsSync(`.output`)) {
        await page.screenshot({
            path: `.output/public/thumbnails/${fileName}.jpeg`,
            quality: 100,
            type: 'jpeg',
            fullPage: false
        });
    }
    await browser.close();
    return {dark: `/${fileName}.jpeg`, light: `/${fileName}-light.jpeg`};
}

export async function wait(time: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

export function removePasswordFromUser(user: User): Partial<User> {
    const {password, ...rest} = user;
    return rest;
}
