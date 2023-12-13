import { page } from "./store";
import { ElementHandle } from "puppeteer";

export async function clearInput(inputSelector: string): Promise<void> {
  await page.focus(inputSelector);
  await page.keyboard.down("Control");
  await page.keyboard.press("A");
  await page.keyboard.up("Control");
  await page.keyboard.press("Backspace");
}

export async function findText(text: string, index: number): Promise<string> {
  const selector = `//*[contains(text(), '${text}')]`;
  await page.waitForXPath(selector, { visible: true });
  const foundElements = await page.$x(selector);
  return page.evaluate((el: any) => el.textContent, foundElements[index]);
}

export async function findButtonByText(text: string) {
  const selector = `//button[contains(text(), \'${text}\')]`;
  return (await page.waitForXPath(selector, {
    visible: true,
  })) as ElementHandle<Element>;
}

export async function findDivByText(text: string) {
  const selector = `//div[contains(text(), \'${text}\')]`;
  return (await page.waitForXPath(selector, {
    visible: true,
  })) as ElementHandle<Element>;
}

export async function findElementByText(text: string, element: string) {
  const selector = `//${element}[contains(text(), \'${text}\')]`;
  return (await page.waitForXPath(selector, {
    visible: true,
  })) as ElementHandle<Element>;
}

export async function isElementDisabled(
  element: ElementHandle,
): Promise<boolean> {
  return element.evaluate((el: Element) => el.hasAttribute("disabled"));
}

export async function sleep(time: number) {
  return setTimeout(() => {}, time);
}
