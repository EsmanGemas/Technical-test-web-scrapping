import { page } from "../../shared/store";
import { CREATE_AD } from "../../shared/static";

import createAdSel from "./createAd.sel";
import {clearInput, clickNextButton, findDivByText, findText} from "../../shared/utils";
import {getPercentageOfNumber, transformToNumber} from "./utils";

export default async function createAd(type: "buy" | "sell") {
  try {
    await page.goto(CREATE_AD);
    const highestOrderPrice = transformToNumber(await findText(createAdSel.ARS_TEXT, 1)) + 0.01;

    if (type === "buy") {
      await (await findDivByText(createAdSel.I_WANT_TO_BUY)).click()
      await page.waitForSelector(createAdSel.FIXED_PRICE_INPUT);
      await clearInput(createAdSel.FIXED_PRICE_INPUT);
      await page.type(createAdSel.FIXED_PRICE_INPUT, String(highestOrderPrice));

      await clickNextButton();
    }
    if (type === "sell") {
      await (await findDivByText(createAdSel.I_WANT_TO_SELL)).click()
      await page.waitForSelector(createAdSel.FIXED_PRICE_INPUT);
      await clearInput(createAdSel.FIXED_PRICE_INPUT);

      const onePercentOfBuy = getPercentageOfNumber(highestOrderPrice, 1)
      await page.type(createAdSel.FIXED_PRICE_INPUT, String(highestOrderPrice + onePercentOfBuy));

      await clickNextButton();
    }
  } catch (e) {
    console.log(e)
  }
}
