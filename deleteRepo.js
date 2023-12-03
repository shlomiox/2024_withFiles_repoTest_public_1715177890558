const { exec } = require('child_process');

const remoteNameToRemove = 'test_11'; // Replace with the remote name you want to remove

const removeRemote = () => {
    exec(`git remote rm ${remoteNameToRemove}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error removing remote '${remoteNameToRemove}': ${stderr}`);
        } else {
            console.log(`Remote '${remoteNameToRemove}' removed successfully.`);
        }
    });
};

removeRemote();