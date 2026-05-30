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

        stage('SonarQube Analysis') {
             steps {
                withSonarQubeEnv('sonarqube-local') {
            bat """
                sonar-scanner ^
                -Dsonar.projectKey=SGPR-RESTAURANTE ^
                -Dsonar.sources=src ^
                -Dsonar.host.url=http://localhost:9000 ^
                -Dsonar.login=%SONAR_AUTH_TOKEN%
            """
                 }
            }
        }

        stage('Quality Gate') {
        steps {
        timeout(time: 2, unit: 'MINUTES') {
            waitForQualityGate abortPipeline: true
        }
                }
        }

        

    }
   
}
