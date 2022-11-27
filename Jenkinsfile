pipeline {
    agent any

    environment {
        dockerHubRegistry = 'jongleur6596/frontend-msa'
        dockerHubRegistryCredential = 'jongleur6596'
        dockerImageName = 'frontend-msa'
        serviceName = 'service-front'
        gitCredentialId = '6261fc8c-759c-4d26-b6ff-29666b2a5625'
        gitSrcUrl = 'git@github.com:KSWA-SWEEP/Form-Duo.git'
        gitManifestUrl = 'git@github.com:KSWA-SWEEP/k8s-manifest.git'
    }

     stages {
        stage('Checkout Application Git Branch') {
            steps {
                git credentialsId: '6261fc8c-759c-4d26-b6ff-29666b2a5625',
                    url: 'git@github.com:KSWA-SWEEP/Form-Duo.git',
                    branch: 'msa-front'
            }
            post {
                    failure {
                      echo 'Repository clone failure !'
                    }
                    success {
                      echo 'Repository clone success !'
                    }
            }
        }
        stage("Build") {
            steps {
                sh "npm install"
                sh "npm run build"
            }
            post {
                    failure {
                      echo 'npm build failure !'
                    }
                    success {
                      echo 'npm build success !'
                    }
            }
        }
        stage('Docker Image Build') {
                steps {
                    sh "docker build . -t ${dockerHubRegistry}:${currentBuild.number}"
                    sh "docker build . -t ${dockerHubRegistry}:latest"
                }
                post {
                        failure {
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
                 
                sh "sed -i 's/${dockerImageName}:.*\$/${dockerImageName}:${currentBuild.number}/g' ./${serviceName}/deployment.yaml"
                sh "git add ./${serviceName}/deployment.yaml"
                sh "git config --global user.email 'panggeunho@gmail.com'"
                sh "git config --global user.name 'banggeunho'"
                sh "git commit -m '[UPDATE] config-service ${currentBuild.number} image versioning'"
                sshagent(credentials: ["${gitCredentialId}"]) {
                    sh "git remote set-url origin ${gitManifestUrl}"
                    sh "git push -u origin msa-front"
                }
            }
            post {
                    failure {
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