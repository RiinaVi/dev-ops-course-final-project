// Файл конфігурації пайплайнів

pipelineJob('docker/docker') {
    definition {
        cpsScm {
            scm {
                git {
                    remote {
                        url('git@github.com:RiinaVi/dev-ops-course-final-project.git')
                        credentials('github-credentials')
                    }
                    branch('*/main')
                    extensions { }
                }
            }
            scriptPath('jenkins/docker.Jenkinsfile')
            lightweight(true)
        }
    }
     triggers {
        githubPush()
    }
}

pipelineJob('infrastructure/terraform') {
    definition {
        cpsScm {
            scm {
                git {
                    remote {
                        url('git@github.com:RiinaVi/dev-ops-course-final-project.git')
                        credentials('github-credentials')
                    }
                    branch('*/main')
                    extensions { }
                }
            }
            scriptPath('jenkins/inf.Jenkinsfile')
            lightweight(true)
        }
    }
}


pipelineJob('ansible/ansible') {
    definition {
        cpsScm {
            scm {
                git {
                    remote {
                        url('git@github.com:RiinaVi/dev-ops-course-final-project.git')
                        credentials('github-credentials')
                    }
                    branch('*/main')
                    extensions { }
                }
            }
            scriptPath('jenkins/config.Jenkinsfile')
            lightweight(true)
        }
    }
}

pipelineJob('application/nodejs') {
    definition {
        cpsScm {
            scm {
                git {
                    remote {
                        url('git@github.com:RiinaVi/dev-ops-course-final-project.git')
                        credentials('github-credentials')
                    }
                    branch('*/main')
                    extensions { }
                }
            }
            scriptPath('jenkins/app.Jenkinsfile')
            lightweight(true)
        }
    }
}
