pipeline {
    agent any

    // This trigger enables Jenkins to listen for GitHub Webhook push events
    triggers {
        githubPush()
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Clones your code automatically from the repository defined in the job
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building your code...'
                // For example, use: sh 'mvn clean package' or sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running automated tests...'
                // For example, use: sh 'mvn test' or sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
