pipeline {
agent any
//     agent {
//             docker { image 'riinavi/users-api:latest' }
//         }

    parameters {
            string(name: 'USER', defaultValue: 'ubuntu',  description: 'Username')
            string(name: 'SERVER_IP', defaultValue: '',  description: 'Server IP address')
            string(name: 'DESTINATION_PATH', defaultValue: '/home/ubuntu/app',  description: 'Server destination path')
        }
        stages {
            stage('Cloning our Git') {
                        steps {
                           checkout([$class: 'GitSCM',
                                     branches: [[name: '*/main']],
                                     userRemoteConfigs: [[url: 'git@github.com:RiinaVi/dev-ops-course-final-project.git',
                                                          credentialsId: 'github-credentials']]])
                        }
                    }
            stage('Build') {
                      agent {
                          docker {
                              image 'riinavi/users-api:latest'
                              reuseNode true
                          }
                      }
                      steps {
                         echo "Building app using Docker Image"
                      }
                  }
                  stage('Deploy the Application') {
                      steps {
                            script {
                                 sshagent(credentials: ['ec2-key']) {
                                        sh "ssh -o StrictHostKeyChecking=no ${USER}@${SERVER_IP} 'mkdir -p -m 777 ${DESTINATION_PATH}'"
                                         sh "scp -o StrictHostKeyChecking=no -r app/docker-compose.yml ${USER}@${SERVER_IP}:${DESTINATION_PATH}"
                                        sh "ssh -o StrictHostKeyChecking=no ${USER}@${SERVER_IP} 'cd ${DESTINATION_PATH} && docker-compose up'"
                                 }
                            }
                      }
                  }
        }

//     stages {
//
//         stage('Build') {
//             steps {
//                     script {
//                         sh 'docker-compose up'
//                     }
//             }
//             post {
//                 success {
//                     archiveArtifacts artifacts: 'app/build/'
//                 }
//             }
//         }
//
//         stage('Deploy') {
//             steps {
//                 script {
//                     sshagent(credentials: ['ec2-key']) {
//                         script {
//                             sh "ssh -o StrictHostKeyChecking=no ${USER}@${SERVER_IP} 'mkdir -p -m 777 ${DESTINATION_PATH}'"
//                             sh "scp -o StrictHostKeyChecking=no -r app/build/ app/package.json ${USER}@${SERVER_IP}:${DESTINATION_PATH}"
//                             sh "ssh -o StrictHostKeyChecking=no ${USER}@${SERVER_IP} 'cd ${DESTINATION_PATH} && npm install && sudo npm install forever -g && forever start build/index.js'"
//                         }
//                     }
//                 }
//             }
//         }
//     }
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
