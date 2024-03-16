pipeline {
agent any
//     agent {
//             docker { image 'riinavi/users-api:latest' }
//         }

    parameters {
            string(name: 'USER', defaultValue: 'ubuntu',  description: 'Username')
            string(name: 'SERVER_IP', defaultValue: '',  description: 'Server IP address')
            string(name: 'DESTINATION_PATH', defaultValue: '/home/ubuntu/app',  description: 'Server destination path')
            string(name: 'PORT', defaultValue: '8080',  description: 'Server port')
            string(name: 'POSTGRES_USER', defaultValue: 'postgres',  description: 'Postgres user')
            string(name: 'POSTGRES_HOST', defaultValue: 'postgres',  description: 'Postgres host')
            string(name: 'POSTGRES_PORT', defaultValue: '5432',  description: 'Postgres port')
            string(name: 'POSTGRES_PASSWORD', defaultValue: '',  description: 'Postgres password')
            string(name: 'POSTGRES_DB', defaultValue: 'test',  description: 'Postgres db')
            string(name: 'S3_REGION', defaultValue: 'us-east-2',  description: 'S3 region')
            string(name: 'S3_BUCKET', defaultValue: '',  description: 'S3 bucket')
//             string(name: 'S3_API_KEY', defaultValue: '',  description: 'S3 API key', required: true)
//             string(name: 'S3_API_SECRET', defaultValue: '',  description: 'S3 API secret', required: true)
//             credentials(name: 'S3_API_KEY', description: 'A user to build with', defaultValue: '', credentialType: "Username with password", required: true )
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
//                             script {
                                 sshagent(credentials: ['ec2-key']) {
//                                     withAWS(credentials: 'aws-credentials') {
//                                         sh "echo ${credentials}"
//                                     withCredentials([[
//                                         $class: 'UsernamePasswordMultiBinding',
//                                          credentialsId: 'aws-credentials',
//                                          usernameVariable: 'S3_API_KEY',
//                                          passwordVariable: 'S3_API_SECRET',
//                                     ]]) {
                                        sh '''cat > .env << EOF
                                            PORT=${PORT}
                                            POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
                                            POSTGRES_DB=${POSTGRES_DB}
                                            POSTGRES_USER=${POSTGRES_USER}
                                            POSTGRES_PORT=${POSTGRES_PORT}
                                            S3_API_KEY=${S3_API_KEY}
                                            S3_API_SECRET=${S3_API_SECRET}
                                            S3_REGION=${S3_REGION}
                                            S3_BUCKET=${S3_BUCKET}
                                            POSTGRES_HOST=${POSTGRES_HOST}
EOF'''
                                        sh "ssh -o StrictHostKeyChecking=no ${USER}@${SERVER_IP} 'mkdir -p -m 777 ${DESTINATION_PATH}'"
                                        sh "scp -o StrictHostKeyChecking=no -r app/docker-compose.yml .env ${USER}@${SERVER_IP}:${DESTINATION_PATH}"
                                        sh "ssh -o StrictHostKeyChecking=no ${USER}@${SERVER_IP} 'cd ${DESTINATION_PATH} && docker-compose up -d '"
//                                     }

//                                  }
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
