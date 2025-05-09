pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://gitlab.com/dohuyen1/Graduation_Thesis.git' // Thay bằng URL repo bạn
            }
        }

        stage('Install Server Dependencies') {
            steps {
                dir('server') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Client Dependencies') {
            steps {
                dir('client') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Client') {
            steps {
                dir('client') {
                    sh 'npm run build' // nếu có lệnh build
                }
            }
        }

        stage('Run Dependency Check') {
            steps {
                sh '''
                docker run --rm \
                -v "$PWD:/src" \
                -v "dependency-data:/usr/share/dependency-check/data" \
                -v "$PWD/odc-reports:/report" \
                owasp/dependency-check \
                --project "CoupleSocialNetwork" \
                --scan /src \
                --format "HTML" \
                --out /report \
                --enableExperimental \
                --prettyPrint
                '''
            }
        }

        stage('Security Test with ZAP (optional)') {
            steps {
                echo 'ZAP test sẽ được thêm nếu cần...'
            }
        }

        stage('Deploy (Optional)') {
            steps {
                echo 'Triển khai nếu cần'
            }
        }
    }
}
