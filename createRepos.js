// import fetch from 'node-fetch';
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
for (let i=10;i<12;i++) {
// const fetch = require('node-fetch'); // Make sure to install the 'node-fetch' package

    const username = 'shlomiox';
    const token = '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';
    const repoName = `repoTest_public_${i}`;

    const apiUrl = 'https://api.github.com/user/repos';

    const createRepo = async () => {
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
                console.log(`Repository '${repoName}' created successfully. URL: ${data.html_url}`);
            } else {
                const errorData = await response.json();
                console.error(`Failed to create repository: ${errorData.message}`);
            }
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    };


    createRepo();
}
