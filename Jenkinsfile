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
        
        stage('Setup Backend') {
            steps {
                script {
                    // Cài đặt dependencies cho backend
                    dir('server') {
                        sh 'npm install'  // Cài đặt các thư viện Node.js cho server
                    }
                }
            }
        }
        
        stage('Setup and Build Frontend') {
    steps {
        script {
            dir('client') {
                sh 'rm -rf node_modules package-lock.json' // Xóa cache
                sh 'npm install'
                sh 'npm list react-app-rewired || true' // Debug
                sh 'npm run build'
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
                echo 'Security Test Stage - Optional'  // Placeholder cho bước kiểm thử bảo mật với OWASP ZAP
            }
        }
        
        stage('Deploy (Optional)') {
            steps {
                echo 'Deploy Stage - Optional'  // Placeholder cho bước deploy
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline finished.'
        }
        
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
