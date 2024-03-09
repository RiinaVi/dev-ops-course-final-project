pipeline {
    agent any

    parameters {
        string(name: 'SERVER_IP',  description: 'Server IP address')
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

        stage('Node.js configuration') {
            steps {
                dir('ansible') {
                    sshagent(credentials: ['ec2-key']) {
                        sh "ansible-playbook -i inventory.ini node-application-playbook.yml  -e 'ansible_host=${SERVER_IP}' "
                    }
                }
            }
        }

        stage('Trigger Application Pipeline') {

            steps {
                build job: 'application/nodejs', parameters: [
                    string(name: 'SERVER_IP', value: "${SERVER_IP}")
                ], wait: false
            }
        }
    }
}
