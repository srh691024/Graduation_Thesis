pipeline {
    agent any
    tools {
        // Đảm bảo rằng tên công cụ NodeJS bạn đã cấu hình là "NodeJS_14"
        nodejs 'NodeJS_14'  // Tên đã cấu hình trong Global Tool Configuration 
    }
    environment {
        // Các biến môi trường khác (nếu cần)
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
                    // Chuyển đến thư mục server và cài đặt các dependencies của server
                    dir('server') {
                        sh 'npm install'  // Sử dụng NodeJS đã cài đặt từ Jenkins
                    }
                }
            }
        }
        stage('Install Client Dependencies') {
            steps {
                script {
                    // Chuyển đến thư mục client và cài đặt các dependencies của client
                    dir('client') {
                        sh 'npm install'
                    }
                }
            }
        }
        stage('Build Client') {
            steps {
                script {
                    // Build client ứng dụng
                    dir('client') {
                        sh 'npm run build'
                    }
                }
            }
        }
        stage('Run Dependency Check') {
            steps {
                // Kiểm tra các dependencies
                script {
                    sh './dependency-check.sh'
                }
            }
        }
        stage('Security Test with ZAP (Optional)') {
            steps {
                // Nếu có, bạn có thể thực hiện test bảo mật ở đây
            }
        }
        stage('Deploy (Optional)') {
            steps {
                // Nếu có, thực hiện deploy ở đây
            }
        }
    }
    post {
        always {
            // Các hành động luôn thực hiện sau khi pipeline kết thúc, ví dụ: dọn dẹp, báo cáo
            echo 'Pipeline finished.'
        }
        failure {
            // Nếu pipeline thất bại, thực hiện hành động ở đây
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
