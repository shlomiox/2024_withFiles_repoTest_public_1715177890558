
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const username = 'shlomiox';
const token = 'github_token_create_repos'
let i = Date.now();
let j = Date.now()+145;
console.log(`start to crreate repos from ${i} till ${j}`);
    const createRepo = async () => {
        
        console.log(i);
        for (i;i<j;i++) {
            await sleep(4000);
            const repoName = `2024_repoTest_public_${i}`;
                        
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
createRepo();

