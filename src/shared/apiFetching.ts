import { google } from "googleapis";
import credentials from "../../client_secret_Drive_gmail.apps.googleusercontent.com.json";

const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
);

console.log('Visit the following URL to authorize:', redirect_uris[0]);

const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES
});

console.log('Authorize this app by visiting this url:', authUrl);

export async function getTokens(code) {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  console.log('Tokens acquired:', tokens);
}

export async function fetchLastTenEmails() {
  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  gmail.users.messages.list({
    userId: "me",
    maxResults: 10
  }, (err, res) => {
    if (err) return console.log("The API returned an error: " + err);

    if (res) {
      const messages = res.data.messages;
      if (messages && messages.length) {
        console.log("Messages:");
        messages.forEach((message) => {
          console.log(`- ${message.id}`);
        });
      } else console.log("No messages found.");

    }
  });
}
