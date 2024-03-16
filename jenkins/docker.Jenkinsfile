pipeline {
    agent any

    environment {
        registry = "riinavi/users-api"
        registryCredential = 'dockerhub-token'
        dockerImage = ''
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
        stage('Building our image') {
            steps{
                dir('app') {
                    script {
                        dockerImage = docker.build registry + ":latest"
                    }
                }
            }
        }
        stage('Deploy our image') {
                steps{
                    script {
                        docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Cleaning up') {
            steps{
                sh "docker rmi $registry:latest"
            }
        }
    }
}
