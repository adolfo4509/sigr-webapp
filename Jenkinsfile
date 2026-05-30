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
                // Run tests with coverage so Sonar can pick up coverage report
                bat 'npm run test:coverage --if-present'
            }
        }

        stage('Branch Info') {
            steps {
                echo "Rama actual: ${env.GIT_BRANCH}"
            }
        }

        node {
  stage('SCM') {
    checkout scm
  }
  stage('SonarQube Analysis') {
    def scannerHome = tool 'SonarScanner';
    withSonarQubeEnv() {
      sh "${scannerHome}/bin/sonar-scanner"
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
