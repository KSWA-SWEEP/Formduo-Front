
pipeline {
  agent any
    tools {
    nodejs 'npm'
    }

    environment {
        dockerHubRegistry = 'qkdrmsgh73/service-front'
        dockerHubRegistryCredential = '634c3ce0-9c39-469b-86f3-3836d26d2edf'
        dockerImageName = 'service-front'
        gitCredentialId = '6261fc8c-759c-4d26-b6ff-29666b2a5625'
        gitSrcUrl = 'git@github.com:KSWA-SWEEP/Formduo-Front.git'
        gitManifestUrl = 'git@github.com:KSWA-SWEEP/k8s-manifest.git'
    }


    stages {
        stage('Start') {
            agent any
            steps {
                slackSend (channel: '#jenkins', color: '#FFFF00', message: "STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
            }
        }

        stage('Checkout Application Git Branch') {
            steps {
                git credentialsId: "${gitCredentialId}",
                    url: "${gitSrcUrl}",
                    branch: 'main'
            }
            post {
                    failure {
                      slackSend (channel: '#jenkins', color: '#FF0000', message: "Repository Clone Failure !: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                      echo 'Repository clone failure !'
                    }
                    success {
                      echo 'Repository clone success !'
                    }
            }
        }

        stage('Docker Image Build') {
                steps {
                    sh 'cd /var/jenkins_home/workspace/frontend-service-deploy/'
                    sh "docker build . -t ${dockerHubRegistry}:${currentBuild.number}"
                    sh "docker build . -t ${dockerHubRegistry}:latest"
                }
                post {
                        failure {
                          slackSend (channel: '#jenkins', color: '#FF0000', message: "Docker Image Build Failure !: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                          echo 'Docker image build failure !'
                        }
                        success {
                          echo 'Docker image build success !'
                        }
                }
        }

        stage('Docker Image Push') {
                steps {
                    withDockerRegistry([ credentialsId: dockerHubRegistryCredential, url: "" ]) {
                                        sh "docker push ${dockerHubRegistry}:${currentBuild.number}"
                                        sh "docker push ${dockerHubRegistry}:latest"

                                        sleep 10 /* Wait uploading */
                                    }
                }
                post {
                        failure {
                          slackSend (channel: '#jenkins', color: '#FF0000', message: "Docker Image Push Failure !: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                          echo 'Docker Image Push failure !'
                          sh "docker rmi ${dockerHubRegistry}:${currentBuild.number}"
                          sh "docker rmi ${dockerHubRegistry}:latest"
                        }
                        success {
                          echo 'Docker image push success !'
                          sh "docker rmi ${dockerHubRegistry}:${currentBuild.number}"
                          sh "docker rmi ${dockerHubRegistry}:latest"
                        }
                }
        }

        stage('K8S Manifest Update') {
                steps {
                    git credentialsId: "${gitCredentialId}",
                        url: "${gitManifestUrl}",
                        branch: 'main'

                    sh "cd /var/jenkins_home/workspace/frontend-service-deploy"
                    sh "sed -i 's/${dockerImageName}:.*\$/${dockerImageName}:${currentBuild.number}/g' ./${dockerImageName}/deployment.yaml"
                    sh "git add ./${dockerImageName}/deployment.yaml"
                    sh "git config --global user.email 'panggeunho@gmail.com'"
                    sh "git config --global user.name 'banggeunho'"
                    sh "git commit -m '[UPDATE] ${dockerImageName} ${currentBuild.number} image versioning'"
                    sshagent(credentials: ["${gitCredentialId}"]) {
                        sh "git remote set-url origin ${gitManifestUrl}"
                        sh "git push -u origin main"
                     }
                }
                post {
                        failure {
                          slackSend (channel: '#jenkins', color: '#FF0000', message: "K8S Manifest Update Failure !: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                          echo 'K8S Manifest Update failure !'
                        }
                        success {
                          echo 'K8S Manifest Update success !'
                        }
                }
        }
        stage('End') {
            agent any
            steps {
                slackSend (channel: '#jenkins', color: '#4B89DC', message: "Build Suceessful!: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
            }
        }
    }
}
