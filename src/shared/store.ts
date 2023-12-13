import { Browser, Page } from "puppeteer";

export let page: Page;
export const setPage = (value: Page) => (page = value);

export let browser: Browser;
export const setBrowser = (value: Browser) => (browser = value);

export let isLogging = false;
export const setIsLogging = (value: boolean) => isLogging = value;