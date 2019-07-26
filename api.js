const swagger = require("swagger-client");

async function createClient(host, token) {
  return swagger({
    url: `${host}/swagger.v1.json`,
    authorizations: {
      Token: token
    }
  });
}

async function fetchData(client, org) {
  let repos = await listOrgRepos(client, org);

  for (const repo of repos) {
    // Limit concurrent requests
    const issues = await listRepoIssues(client, org, repo.name);
    repo.issues = issues;

    for (const issue of issues) {
      const comments = await listIssueComments(
        client,
        org,
        repo.name,
        issue.number
      );

      issue.comments = comments;

      if (issue.pull_request !== null) {
        // Retrieve additional info (base, head branch)
        issue.pull_request = await getRepoPR(
          client,
          org,
          repo.name,
          issue.number
        );
      }
    }
  }

  return repos;
}

async function listOrgRepos(client, org) {
  console.log(`[listOrgRepos] org=${org}`);
  const { body: repos } = await client.apis.organization.orgListRepos({ org });
  return repos;
}

async function listRepoIssues(client, org, repo) {
  console.log(`[listRepoIssues] org=${org} repo=${repo}`);
  async function addIssuesWithState(state) {
    const issuesWithState = [];
    let page = 1;

    while (true) {
      console.log(
        `[addIssuesWithState] org=${org} repo=${repo} state=${state} page=${page}`
      );
      const { body: pagedIssues } = await client.apis.issue.issueListIssues({
        owner: org,
        repo,
        page,
        state
      });

      if (pagedIssues.length == 0) {
        break;
      }

      issuesWithState.push(...pagedIssues);
      page++;
    }

    return issuesWithState;
  }

  // Open
  const [openIssues, closedIssues] = await Promise.all([
    addIssuesWithState("open"),
    addIssuesWithState("closed")
  ]);

  return [...openIssues, ...closedIssues];
}

async function listIssueComments(client, org, repo, index) {
  console.log(`[listIssueComment] org=${org} repo=${repo} index=${index}`);
  const { body: comments } = await client.apis.issue.issueGetComments({
    owner: org,
    repo,
    index
  });

  return comments;
}

async function getRepoPR(client, org, repo, index) {
  console.log(`[getRepoPR] org=${org} repo=${repo} index=${index}`);
  const { body: pullRequest } = await client.apis.repository.repoGetPullRequest(
    {
      owner: org,
      repo,
      index
    }
  );

  return pullRequest;
}

module.exports = {
  createClient,
  fetchData
};
