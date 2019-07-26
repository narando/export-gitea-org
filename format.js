const fs = require("fs").promises;
const path = require("path");
const mustache = require("mustache");

async function writeMarkdownFiles(rawData) {
  // Load templates
  const issueTpl = (await fs.readFile(
    path.join(__dirname, "issue.md.tpl")
  )).toString();

  for (repo of rawData) {
    const repoBasePath = `./exports/${repo.name}`;
    await fs.mkdir(repoBasePath, { recursive: true });

    for (issue of repo.issues) {
      const rendered = mustache.render(issueTpl, prepareIssue(repo, issue));

      await fs.writeFile(`${repoBasePath}/${issue.number}.md`, rendered);
    }
  }
}

function quoteBlock(text) {
  return text
    .split("\n")
    .map(line => `> ${line}`)
    .join("\n");
}

function prepareIssue(repo, issue) {
  return {
    ...issue,
    repo,
    body: quoteBlock(issue.body),
    comments: issue.comments
      .map(comment => ({
        ...comment,
        body: quoteBlock(comment.body)
      }))
      .sort((a, b) => a.created_at >= b.created_at)
  };
}

module.exports = {
  writeMarkdownFiles
};
