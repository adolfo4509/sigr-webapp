pipeline {
    agent any

    environment {
        SCANNER_HOME = tool 'sonar-scanner',
        REPO_URL = "https://github.com/adolfo4509/sigr-webapp"
    }

    stages {

        stage('Checkout') {
            steps {
                git url: 'https://github.com/adolfo4509/sigr-webapp', branch: 'main'
            }
        }

        stage('Instalar dependencias') {
            steps {
                bat 'cd backend && npm install'
                bat 'cd frontend && npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'cd backend && npm run build'
                bat 'cd frontend && npm run build'
            }
        }

        stage('Pruebas') {
            steps {
                bat 'cd backend && npm test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonarqube-local') {
                    bat """
                        ${SCANNER_HOME}/bin/sonar-scanner \
                        -Dsonar.projectKey=restaurante-nextjs \
                        -Dsonar.sources=./backend,./frontend \
                        -Dsonar.exclusions=**/node_modules/**,**/.next/** \
                        -Dsonar.javascript.lcov.reportPaths=backend/coverage/lcov.info
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

        stage('Docker Build') {
            steps {
                bat 'docker build -t restaurante/backend:1.0 backend'
                bat 'docker build -t restaurante/frontend:1.0 frontend'
            }
        }

        stage('Deploy Staging') {
            steps {
                bat 'docker compose -f docker-compose.staging.yml up -d --build'
            }
        }

        stage('Smoke Tests') {
            steps {
                bat 'curl -f http://localhost:3000/health'
            }
        }
    }
}
