pipeline {
    agent any

    environment {
        // Thêm biến môi trường nếu cần, ví dụ cho PATH, API keys...
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Checkout mã nguồn từ GitLab
                checkout scm
            }
        }

        stage('Install Server Dependencies') {
            steps {
                // Sử dụng Docker với Node.js image
                script {
                    dir('server') {
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Install Client Dependencies') {
            steps {
                // Sử dụng Docker với Node.js image
                script {
                    dir('client') {
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Build Client') {
            steps {
                // Sử dụng Docker với Node.js image để build client
                script {
                    dir('client') {
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Run Dependency Check') {
            steps {
                // Run OWASP Dependency-Check using Docker container
                script {
                    sh '''
                    docker run --rm \
                    -v "$(pwd)/server:/src" \
                    -v "$(pwd)/odc-reports:/report" \
                    owasp/dependency-check \
                    --project "Graduation_Thesis" \
                    --scan /src \
                    --format "HTML" \
                    --out /report \
                    --enableExperimental \
                    --prettyPrint
                    '''
                }
            }
        }

        stage('Security Test with ZAP (Optional)') {
            steps {
                // Optional step for ZAP security testing
                script {
                    echo 'Running security tests with OWASP ZAP...'
                    // Cấu hình và chạy ZAP (nếu cần)
                }
            }
        }

        stage('Deploy (Optional)') {
            steps {
                script {
                    echo 'Deploying application...'
                    // Lệnh deploy ứng dụng của bạn (Heroku, Docker, Kubernetes,...)
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }

        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
