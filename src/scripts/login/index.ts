import { LOGIN_PAGE } from "../../shared/static";
import { getOneTimePasswordCode } from "./utils";

import loginSel from "./login.sel";
import {page, setIsLogging} from "../../shared/store";
import { clickNextButton, submitButton } from "../../shared/utils";

export default async function loginBinance() {
  setIsLogging(true);

  await page.goto(LOGIN_PAGE);

  await page.waitForSelector(loginSel.emailInput);
  await page.type(loginSel.emailInput, process.env.EMAIL as string);
  await clickNextButton();

  await page.waitForSelector(loginSel.passwordInput);
  await page.type(loginSel.passwordInput, process.env.PASSWORD as string);
  await clickNextButton();

  await page.waitForSelector(loginSel.authAppInput);
  await page.type(loginSel.authAppInput, getOneTimePasswordCode());
  await submitButton();

  setTimeout(() => {
    setIsLogging(false);
  }, 5_000);
}
