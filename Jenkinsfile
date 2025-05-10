pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS_14'  // Tên đã cấu hình trong Global Tool Configuration
    }
    
    environment {
        NODE_ENV = 'production'  // Ví dụ biến môi trường
    }
    
    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm  // Lấy mã nguồn từ Git
            }
        }
        
        stage('Install Server Dependencies') {
            steps {
                script {
                    // Cài đặt các dependencies của server
                    dir('server') {
                        sh 'npm install'  // Cài đặt các thư viện Node.js cho server
                    }
                }
            }
        }
        
        stage('Install Client Dependencies') {
            steps {
                script {
                    // Cài đặt các dependencies của client
                    dir('client') {
                        sh 'npm install'  // Cài đặt các thư viện Node.js cho client
                    }
                }
            }
        }
        
        stage('Build Client') {
            steps {
                script {
                    // Xây dựng ứng dụng client
                    dir('client') {
                        sh 'npm start'  // Xây dựng ứng dụng
                    }
                }
            }
        }
        
        stage('Run Dependency Check') {
            steps {
                script {
                    // Kiểm tra các dependencies của dự án
                    sh './dependency-check.sh'  // Đảm bảo có script dependency-check.sh trong dự án
                }
            }
        }
        
        stage('Security Test with ZAP (Optional)') {
            steps {
                // Đây là một bước kiểm thử bảo mật (optional)
                echo 'Security Test Stage - Optional'  // Placeholder cho bước kiểm thử bảo mật với OWASP ZAP
            }
        }
        
        stage('Deploy (Optional)') {
            steps {
                // Đây là một bước deploy (optional)
                echo 'Deploy Stage - Optional'  // Placeholder cho bước deploy
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
