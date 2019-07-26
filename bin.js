#!/usr/bin/env node

const { createClient, fetchData } = require("./api");
const { writeMarkdownFiles } = require("./format");

async function exportGiteaOrg() {
  const token = process.env["GITEA_TOKEN"];
  const host = process.env["GITEA_HOST"];

  const org = process.env["ORGANIZATION"];

  const client = await createClient(host, token);

  const rawData = await fetchData(client, org);

  await writeMarkdownFiles(rawData);
}

exportGiteaOrg().catch(err => {
  console.error("Error during export", err);
  process.exitCode = 1;
});
