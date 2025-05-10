pipeline {
    agent any
    stages {
        stage('Dependency-Check') {
            steps {
                dependencyCheck additionalArguments: '''--format HTML --enableExperimental --prettyPrint''',
                                odcInstallation: 'Default', // Tên bạn đặt ở bước 2
                                scanpath: '.',
                                outdir: 'dependency-check-report'
            }
        }
    }
    post {
        always {
            dependencyCheckPublisher pattern: 'dependency-check-report/dependency-check-report.xml'
        }
    }
}
