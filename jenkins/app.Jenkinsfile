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
//         string(name: 'POSTGRES_PASSWORD', defaultValue: '',  description: 'Postgres password')
        string(name: 'POSTGRES_DB', defaultValue: 'test',  description: 'Postgres db')
        string(name: 'S3_REGION', defaultValue: 'us-east-2',  description: 'S3 region')
        string(name: 'S3_BUCKET', defaultValue: 'dev-ops-course-final-project-users-images-bucket',  description: 'S3 bucket')

        credentials(name: 'POSTGRES_PASSWORD', description: 'postgresql db password', defaultValue: 'postgres-password', credentialType: "String", required: true )
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
EOF'''
//                         sh "sleep 1"
                        sh "ssh -o StrictHostKeyChecking=no ${USER}@${SERVER_IP} 'sudo reboot'"
                        sh "sleep 10"
                        sh "ssh -o StrictHostKeyChecking=no ${USER}@${SERVER_IP} 'mkdir -p -m 777 ${DESTINATION_PATH}'"
                        sh "scp -o StrictHostKeyChecking=no -r app/docker-compose.yml .env ${USER}@${SERVER_IP}:${DESTINATION_PATH}"
                        sh "ssh -o StrictHostKeyChecking=no ${USER}@${SERVER_IP} 'cd ${DESTINATION_PATH} && docker-compose up -d --build'"
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
