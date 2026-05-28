pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        REPO_URL = "https://github.com/adolfo4509/sigr-webapp"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '**']],
                    userRemoteConfigs: [[url: env.REPO_URL]]
                ])
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test --if-present'
            }
        }

        stage('Branch Info') {
            steps {
                echo "Rama actual: ${env.GIT_BRANCH}"
            }
        }
    }
}
