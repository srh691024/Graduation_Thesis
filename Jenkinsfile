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
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    dir('client') {
                        sh 'npm install'  // Cài đặt dependencies cho frontend
                        sh 'npm run build'  // Nếu lỗi, vẫn tiếp tục pipeline
                    }
                }
            }
        }
        
        stage('Run Dependency Check') {
            steps {
                dependencyCheck additionalArguments: '''--format HTML --enableExperimental --prettyPrint''',
                                odcInstallation: 'Default', // Tên bạn đã đặt ở bước 2 trong Global Tool Configuration
                                scanpath: '.',
                                outdir: 'dependency-check-report'
            }
        }
        
        stage('Security Test with ZAP (Optional)') {
            steps {
                echo 'Security Test Stage - Optional'  // Placeholder cho bước kiểm thử bảo mật với OWASP ZAP
                // Thực hiện kiểm thử bảo mật với OWASP ZAP
                // Ví dụ:
                // sh 'zap-cli start'
                // sh 'zap-cli active-scan --url http://localhost:8080'
                // sh 'zap-cli report -o zap_report.html'
            }
        }
        
        stage('Deploy (Optional)') {
            steps {
                echo 'Deploy Stage - Optional'  // Placeholder cho bước deploy
                // Cài đặt các bước deploy vào đây (có thể dùng Docker, Kubernetes, hoặc môi trường cụ thể)
                // Ví dụ:
                // sh 'kubectl apply -f deployment.yaml'
                // sh 'docker-compose up -d'
            }
        }
    }
    
    post {
        always {
            // Xuất báo cáo Dependency-Check sau khi pipeline hoàn thành
            dependencyCheckPublisher pattern: 'dependency-check-report/dependency-check-report.xml'
            echo 'Pipeline finished.'
        }
        
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
