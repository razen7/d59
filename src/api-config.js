const { Octokit } = require("@octokit/core");

const octokit = new Octokit({ auth: `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` });

async function getGitRepo(owner, repo) {
    let response = await octokit.request('GET /repos/{owner}/{repo}', {
        owner: owner,
        repo: repo
    })
    // console.log(response);
    return response;
}
// getGitRepo('angular', 'angular'); // testing

export default getGitRepo;