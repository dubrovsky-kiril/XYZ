const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { google } = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

const credentialsFilePath = path.join(__dirname, 'credentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsFilePath));

const client = new google.auth.OAuth2(
  credentials.installed.client_id,
  credentials.installed.client_secret,
  credentials.installed.redirect_uris[0]
);

const accessTokenFilePath = path.join(__dirname, 'token.json');
const accessToken = JSON.parse(fs.readFileSync(accessTokenFilePath));

client.setCredentials(accessToken);

google.sheets({ version: "v4", auth: client });

module.exports = google.sheets({ version: "v4", auth: client });

