import { authenticator } from "otplib";

export function getOneTimePasswordCode() {
  return authenticator
    .generate(process.env.ONE_TIME_PASSWORD as string)
    .toString();
}
