pipeline {
    agent any

    parameters {
            string(name: 'USER', defaultValue: 'ubuntu',  description: 'Username')
            string(name: 'SERVER_IP', defaultValue: '',  description: 'Server IP address')
            string(name: 'DESTINATION_PATH', defaultValue: '/home/ubuntu/app',  description: 'Server destination path')
        }

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM',
                          branches: [[name: '*/main']],
                          userRemoteConfigs: [[url: 'git@github.com:RiinaVi/dev-ops-course-final-project.git',
                                               credentialsId: 'github-credentials']]])
            }
        }

        stage('Build') {
            steps {
                dir('app') {
                    script {
                        sh 'npm install'
                        sh 'npm run build'
                    }
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
}
