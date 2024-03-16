pipeline {
    agent any

    parameters {
        choice(name: 'STAGE_TO_EXECUTE', choices: ['Apply', 'Destroy'], description: 'Select action')
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

        stage('Terraform Apply') {
            when {
                expression { params.STAGE_TO_EXECUTE == 'Apply' }
            }
            steps {
                dir('terraform-app') {
                   withAWS(credentials: 'aws-credentials') {
                        sh 'terraform init'
                        sh 'terraform workspace select app || terraform workspace new app'
                        sh 'terraform apply -auto-approve -lock=false'
                    }
                }
            }
        }

        stage('Trigger Ansible Pipeline') {
            when {
                expression { params.STAGE_TO_EXECUTE == 'Apply' }
            }

            steps {
                dir('terraform-app') {
                   withAWS(credentials: 'aws-credentials') {
                        build job: 'ansible/ansible', parameters: [
                            string(name: 'SERVER_IP', value: sh(returnStdout: true, script: "terraform output server_ip"))
                        ], wait: false
                    }
                }


            }
        }

        stage('Terraform Destroy') {
            when {
                expression { params.STAGE_TO_EXECUTE == 'Destroy' }
            }
            steps {
                dir('terraform-app') {
                     withAWS(credentials: 'aws-credentials') {
                        sh 'terraform destroy -auto-approve -lock=false'
                    }
                }
            }
        }
    }
}
