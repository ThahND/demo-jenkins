def isProduction
pipeline {
    agent any
    stages {
        stage("make build") {
            sh 'npm install && npm run build'
        }
    }
    post {
        always {
            slackSend color: "warning", message: "[HRM-V2-Server] finished", channel: "#HRM"
        }
        success {
            slackSend color: "good", message: "[HRM-V2-Server] success", channel: "#HRM"
        }
        failure {
            slackSend color: "danger", message: "[HRM-V2-Server] failure", channel: "#HRM"
        }
        unstable {
            slackSend color: "danger", message: "[HRM-V2-Server] unstable", channel: "#HRM"
        }
    }
}
