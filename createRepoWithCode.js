const { Octokit } = require('@octokit/rest');
const simpleGit = require('simple-git');
const fs = require('fs');

const octokit = new Octokit({
    auth: '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', // Replace with your GitHub personal access token
});

const repoName = 'repoTest_public_30';
const folderPath = 'code1'; // Replace with the path to your local folder

const createRepoAndAddFolder = async () => {
    try {
        // Step 1: Create a new public repository on GitHub
        const createRepoResponse = await octokit.repos.createForAuthenticatedUser({
            name: repoName,
            private: false,
        });

        console.log(`Repository '${repoName}' created successfully. URL: ${createRepoResponse.data.html_url}`);

        // Step 2: Initialize a local Git repository
        const git = simpleGit(folderPath);
        await git.init();

        // Step 3: Add all files in the folder to the local Git repository
        await git.add('.');

        await git.add('README.md');
        // Step 4: Commit the changes with an initial commit message
        await git.commit('Initial commit');

        // // Step 5: Add the GitHub repository as a remote
        // await git.addRemote('origin', createRepoResponse.data.clone_url);

        // Step 6: Push the changes to the GitHub repository
        await git.push('origin', 'main');

        console.log(`Folder added to the repository.`);
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
};

createRepoAndAddFolder();