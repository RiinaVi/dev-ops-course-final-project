pipeline {
    agent any

    parameters {
        string(name: 'USER', defaultValue: 'ubuntu',  description: 'Username')
        string(name: 'SERVER_IP', defaultValue: '',  description: 'Server IP address')
        string(name: 'DESTINATION_PATH', defaultValue: '/home/ubuntu/app',  description: 'Server destination path')
        string(name: 'PORT', defaultValue: '8080',  description: 'Server port')
        string(name: 'POSTGRES_USER', defaultValue: 'postgres',  description: 'Postgres user')
        string(name: 'POSTGRES_HOST', defaultValue: 'postgres',  description: 'Postgres host')
        string(name: 'POSTGRES_PORT', defaultValue: '5432',  description: 'Postgres port')
        string(name: 'S3_API_KEY', defaultValue: '',  description: 'S3 key')
        string(name: 'POSTGRES_DB', defaultValue: 'test',  description: 'Postgres db')
        string(name: 'S3_REGION', defaultValue: 'us-east-2',  description: 'S3 region')
        string(name: 'S3_BUCKET', defaultValue: 'dev-ops-course-final-project-users-images-bucket',  description: 'S3 bucket')
        string(name: 'LOG_GROUP', defaultValue: 'app-server-log-group',  description: 'log group')

        credentials(name: 'POSTGRES_PASSWORD', description: 'postgresql db password', defaultValue: 'postgres-password', credentialType: "String", required: true )
        credentials(name: 'S3_API_SECRET', description: 'aws secret key', defaultValue: '###', credentialType: "aws", required: true )
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
                   sshagent(credentials: ['ec2-key']) {
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
                            LOG_GROUP=${LOG_GROUP}
                            SERVER_IP=${SERVER_IP}
EOF'''
                        sh "sleep 10"
                        sh "ssh -o StrictHostKeyChecking=no ${USER}@${SERVER_IP} 'sudo reboot'"
                        sh "sleep 60"
                        sh "ssh -o StrictHostKeyChecking=no ${USER}@${SERVER_IP} 'mkdir -p -m 777 ${DESTINATION_PATH}'"
                        sh "scp -o StrictHostKeyChecking=no -r app/docker-compose.yml .env ${USER}@${SERVER_IP}:${DESTINATION_PATH}"
                        sh "ssh -o StrictHostKeyChecking=no ${USER}@${SERVER_IP} 'cd ${DESTINATION_PATH} && docker-compose up -d --build'"
                 }
             }
         }
         stage('aws creds test') {
                     steps {
                 withCredentials([[
                     $class: 'AmazonWebServicesCredentialsBinding',
                     credentialsId: "aws-credentials",
                     accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                     secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                 ]]) {
                     sh '''cat > .env << EOF
                         S3_API_KEY=${AWS_ACCESS_KEY_ID}
                         S3_API_SECRET=${AWS_SECRET_ACCESS_KEY}
 EOF'''

                     sh "scp -o StrictHostKeyChecking=no -r .env-test ${USER}@${SERVER_IP}:${DESTINATION_PATH}"
                 }
             }
         }
         stage('Return server url') {
            steps {
                echo "App has been started on http://${SERVER_IP}:${PORT}"
            }
         }
     }
}
