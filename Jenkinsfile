pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                // Pulls the latest code triggered by your GitHub Webhook
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Installs Node packages and the required browser binaries
                bat 'npm ci'
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Execute Playwright Tests') {
            steps {
                // Runs the specific folder using the headless approach for stability
                // Note: We use 'all' status inside catchError so the report publishes even if tests fail
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    bat 'call npx playwright test tests/JenkinsPipelineExecution --project=chromium'
                
                }
            }
        }
    }

    post {
        always {
            // This step publishes the HTML report so you can visually see the runs
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report',
                reportTitles: 'Playwright Test Execution Results'
            ])
            
            // Also archives raw videos and screenshots as downloadable files
            archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
        }
    }
}
