pipeline {
    options {
        disableConcurrentBuilds()
        ansiColor('xterm')
    }
    agent {
        kubernetes {
            containerTemplate {
                name 'docker'
                image 'mcr.microsoft.com/playwright:v1.42.1-jammy'
                ttyEnabled true
            }
        }
    }
    tools {
        nodejs 'nodejs'
    }
    stages {
        stage('Test details') {
            steps {
                print '\033[35m------------ Create repos in Github  ----------------\033[0m'
            }
        }
        stage('Download Project') {
            steps {
                print '\033[35m------------ #2 Download & Run  ----------------\033[0m'
                ansiColor('css') {
                    git branch:'main',
                    changelog: false,
                    credentialsId: '386f455f-2b76-4aee-bcc3-1f9279aa868b',
                    poll: true , url: 'https://github.com/shlomiox/scripts.git'
                    sh label: '', script: '''#!/bin/bash
                 echo "\033[35m------------        Node version     -----------------\033[0m"
                 echo "Running this command:node -v"
                 node -v
                 echo "\033[35m------------        Run create   -----------\033[0m"
                 echo "Current path:"
                 pwd
                 node ${testName}.js
             '''
                }
            }
        }
    }
}
