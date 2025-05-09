pipeline {
    agent any
    tools {
        nodejs 'NodeJS_14'  // Tên đã cấu hình trong Global Tool Configuration 
    }
    environment {
        // Nếu có các biến môi trường cần thiết, bạn có thể khai báo ở đây
        NODE_ENV = 'production'  // Ví dụ biến môi trường
    }
    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }
        stage('Install Server Dependencies') {
            steps {
                script {
                    // Cài đặt các dependencies của server
                    dir('server') {
                        sh 'npm install'  // Sử dụng NodeJS đã cài đặt từ Jenkins
                    }
                }
            }
        }
        stage('Install Client Dependencies') {
            steps {
                script {
                    // Cài đặt các dependencies của client
                    dir('client') {
                        sh 'npm install'
                    }
                }
            }
        }
        stage('Build Client') {
            steps {
                script {
                    // Xây dựng ứng dụng client
                    dir('client') {
                        sh 'npm run build'
                    }
                }
            }
        }
        stage('Run Dependency Check') {
            steps {
                script {
                    // Kiểm tra các dependencies
                    sh './dependency-check.sh'
                }
            }
        }
        stage('Security Test with ZAP (Optional)') {
            steps {
                // Nếu có thể thực hiện test bảo mật ở đây
                echo 'Security Test Stage - Optional'
            }
        }
        stage('Deploy (Optional)') {
            steps {
                // Nếu có thể thực hiện deploy ở đây
                echo 'Deploy Stage - Optional'
            }
        }
    }
    post {
        always {
            // Các hành động luôn thực hiện sau khi pipeline kết thúc
            echo 'Pipeline finished.'
        }
        failure {
            // Nếu pipeline thất bại, thực hiện hành động ở đây
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
