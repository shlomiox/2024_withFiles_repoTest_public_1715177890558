
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const username = 'shlomiox';
const token = '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';
let i = Date.now();
    const createRepo = async () => {
        
        console.log(i);
        for (i;i<i+100;i++) {
            await sleep(1);
            const repoName = `2024_repoTest_public_${i}`;
                        
        const apiUrl = 'https://api.github.com/user/repos';
        try {

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer '46ffc30c-143d-438a-8526-e260c9c8f73f'`,
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

