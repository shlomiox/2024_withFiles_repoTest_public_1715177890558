
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const username = 'shlomiox';
const token = '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';
    const createRepo = async () => {
        for (let i=155;i<160;i++) {
            await sleep(6000);
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
            }
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }
    };
createRepo();

