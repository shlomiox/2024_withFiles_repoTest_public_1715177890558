
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const github = 'https://github.com/';
const username = 'shlomiox';
const token = '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';
let i = Date.now();
let j = Date.now()+ 100;
const folderPath = "./single";
let simpleGit = require('simple-git');
const { exec } = require('child_process');
let url;

// import simpleGit from 'simple-git';
console.log(`start to crreate repos from ${i} till ${j}`);
    
    const createRepo = async () => {
        
        console.log(i);
        for (i;i<j;i++) {
            await sleep(2000);
            const repoName = `2024_withFiles_repoTest_public_${i}`;
                        
        const apiUrl = 'https://api.github.com/user/repos';
        try {
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: repoName,
                    private: false,
                    readme: true,
                }),
            });
           
            if (response.ok) {
                    const data = await response.json();
                    console.log(`Repository '${repoName}' created successfully. URL: ${data.html_url} time: ${new Date().toLocaleTimeString()}`);
                    url = `${github}${username}/${repoName}.git`;
                    // console.log(url);
                    addFiles(url,repoName);

            } else {
                const errorData = await response.json();
                console.error(`Failed to create repository: ${errorData.message}`);
                console.log("break")
                break;
                console.log("exit")
                exit(1);
            }
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }
    };
    const addFiles = async () => {
        const git = simpleGit(folderPath);
        await git.init();

        // Step 3: Add all files in the folder to the local Git repository
        await git.add('.');
        // Step 4: Commit the changes with an initial commit message
        await git.commit('Initial commit');

        // // Step 5: Add the GitHub repository as a remote
        await git.addRemote('origin', url);

        // Step 6: Push the changes to the GitHub repository
        await git.push('origin', 'main');

        console.log(`Folder added to the repository: ${repoName}`);
    }
    
    const getRepo = async () => {
    exec('gh --version', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${error.message}`);
          return;
        }
        console.log(`gh version: ${stdout}`);
      });
      
      exec('gh repo list | wc -l', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${error.message}`);
          return;
        }
        console.log(`Number of repositories: ${stdout.trim()}`);
      });
    }

    createRepo();

    
