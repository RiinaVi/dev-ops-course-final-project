pipeline {
    agent {
            docker { image 'riinavi/users-api:latest' }
        }

    parameters {
            string(name: 'USER', defaultValue: 'ubuntu',  description: 'Username')
            string(name: 'SERVER_IP', defaultValue: '',  description: 'Server IP address')
            string(name: 'DESTINATION_PATH', defaultValue: '/home/ubuntu/app',  description: 'Server destination path')
        }

    stages {

        stage('Build') {
            steps {
                    script {
                        sh 'docker-compose up'
                    }
            }
            post {
                success {
                    archiveArtifacts artifacts: 'app/build/'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sshagent(credentials: ['ec2-key']) {
                        script {
                            sh "ssh -o StrictHostKeyChecking=no ${USER}@${SERVER_IP} 'mkdir -p -m 777 ${DESTINATION_PATH}'"
                            sh "scp -o StrictHostKeyChecking=no -r app/build/ app/package.json ${USER}@${SERVER_IP}:${DESTINATION_PATH}"
                            sh "ssh -o StrictHostKeyChecking=no ${USER}@${SERVER_IP} 'cd ${DESTINATION_PATH} && npm install && sudo npm install forever -g && forever start build/index.js'"
                        }
                    }
                }
            }
        }
    }
//     post {
//         always {
//             mail to: 'riinavi86@gmail.com',
//                 // from is empty string because default value is 'address not configured yet', which looks weird
//                 from: '',
//                 subject: "Build: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
//                 body: "The build was completed. \n\nBuild URL: ${env.BUILD_URL}"
//
//         }
//         success {
//             telegramSend "Pipeline $env.JOB_NAME #$env.BUILD_NUMBER  $env.BUILD_URL"
//         }
//         failure {
//
//             telegramSend "Pipeline $env.JOB_NAME #$env.BUILD_NUMBER - failed, please check $env.BUILD_URL"
//         }
//     }
}
