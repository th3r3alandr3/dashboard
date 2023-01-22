import * as puppeteer from 'puppeteer';
import {Md5} from 'ts-md5';
import {existsSync} from 'fs';
import {createScreenshot} from "~/ts/utils";

export default defineEventHandler(async (event) => {
    try {
        const url = decodeURIComponent(event.context.params.url as string);
        const fileName = Md5.hashStr(url)

        return {status: 200, src: await createScreenshot(url, fileName)};
    } catch (error) {
        return {status: 400, error};
    }
});
