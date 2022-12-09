#!/usr/bin/env groovy

@Library('pipeline-library')_

import com.connexuscu.CICD

def backupSite(site) {    
    try {                            
        sh "git clone git@mkt-csrp01.connexuscu.org:ds/web/wpengineapis.git"
        dir('wpengineapis') {
            try {
                sh "npm i ."
                sh "node bin/wpengine.js requestBackup --name ${site} --description 'Pre ${env.JOB_NAME} - ${env.TAG_NAME || env.BUILD_NUMBER} Code Deploy' --emails 'matthewr@connexuscu.org' --creds 54f4df68-6314-4ea8-bcb0-a999acd0d7d1:FDW+g3lDsdDU7IwGN2a/aw=="
                deleteDir();
            } catch(Exception e) {
                emailext (
                subject: "Code Deploy FAIL - Job: '${env.JOB_NAME} [${env.BUILD_NUMBER}]' - Brand: ${TRGT}",
                body: """<p>Code Deploy FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                            <p>Error: ${e}</p>
                            <p>Check console output at "<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
                recipientProviders: [[$class: 'DevelopersRecipientProvider'],[$class: 'RequesterRecipientProvider']]
                )
                deleteDir();
            }
        }
    } catch(Exception e) {
        emailext (
        subject: "Code Deploy FAIL - Job: '${env.JOB_NAME} [${env.BUILD_NUMBER}]' - Brand: ${TRGT}",
        body: """<p>Code Deploy FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                    <p>Error: ${e}</p>
                    <p>Check console output at "<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
        recipientProviders: [[$class: 'DevelopersRecipientProvider'],[$class: 'RequesterRecipientProvider']]
        )
        deleteDir();
    }
}

def gitHubDeploy() {
    sh "git add ."
    sh "ls"
    sh "git commit -m '${env.BUILD_NUMBER} Updates'"
    sh "git push -v origin master"
    sh "git status"
}

pipeline {
    
    agent { node { label 'master' } }

    environment {
        //APP                             = 'adoutbound-automation'
        TRGT                             = CICD.DetectTargetFromBranchTag(this)
        
        //GIT_TARGET_URL                   = credentials("git-target-url-$TRGT");
        
        
        //DOCKER_REGISTRY_USR             = "devops"
        //DOCKER_REGISTRY_PWD_SECRET      = CICD.GetDockerRegistryPwdByTarget(this, TRGT)
        //DOCKER_REGISTRY_PWD             = credentials("$DOCKER_REGISTRY_PWD_SECRET");
        //DOCKER_REGISTRY_HOST            = CICD.GetDockerRegistryHostByTarget(this, TRGT)
        //DOCKER_TAG                      = "$DOCKER_REGISTRY_HOST/$JOB_NAME:$BUILD_NUMBER"
        //K8S_CICD_USER_HOST              = CICD.GetKubernetesCICDUserHostByTarget(this, TRGT)
        //DOCKER_DR                       = "$DOCKER_REGISTRY_HOST/$JOB_NAME"
        //DEPLOYMENT_NAME                 = 'adoutbound-automation'
        //CONTAINER_NAME                  = 'automation'
        //NAMESPACE                       = 'ad'
    }

    stages {
    
        stage('Init') {
        
            steps {
        
                echo "Init-Target: $TRGT"

                script {
                    echo "Configuring..."
                    //sh "ssh-keyscan -H github.com >> ~/.ssh/known_hosts"
                    sh "whoami"
                    sh "cat ~/.ssh/id_rsa"
                    sh "cat ~/.ssh/id_rsa.pub"
                    sh "cat ~/.ssh/known_hosts"
                }
          
            }
    
        }

        stage("Build") {

            steps {

                echo "Build-Target: $TRGT"

                script {
                    try {
                    } catch(Exception e) {
                        emailext (
                        subject: "Code Deploy FAIL - Job: '${env.JOB_NAME} [${env.BUILD_NUMBER}]' - Brand: ${TRGT}",
                        body: """<p>Code Deploy FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                                    <p>Error: ${e}</p>
                                    <p>Check console output at "<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
                        recipientProviders: [[$class: 'DevelopersRecipientProvider'],[$class: 'RequesterRecipientProvider']]
                        )
                    }
                }

            }
        }
        
        stage("Pre-Test") {

            steps {

                echo "Pre-Test-Target: $TRGT"

                script {
                    if (["dev","test","ops"].contains(TRGT) == true) {
                    }
                }

            }

        }

        stage("Deploy") {

            steps {

                echo "Deploy-Target: $TRGT"

                script {
                    echo "Deploying ${TRGT} - ${env.BRANCH_NAME}"
                    if (["dev"].contains(TRGT) == true) {
                        echo "dev deploy!"
                        //backupSite("cxcudev");
                        try {
                            sh "git clone git@github.com:RainvilleCXCU/CX-Atlas.git"
                            sh "rsync -r --exclude '${WORKSPACE}/CX-Atlas/*' ${WORKSPACE}/* ${WORKSPACE}/CX-Atlas"
                            dir('CX-Atlas') {
                                try {
                                    gitHubDeploy()
                                } catch(Exception e) {
                                    emailext (
                                    subject: "Code Deploy FAIL - Job: '${env.JOB_NAME} [${env.BUILD_NUMBER}]' - Brand: ${TRGT}",
                                    body: """<p>Code Deploy FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                                                <p>Error: ${e}</p>
                                                <p>Check console output at "<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
                                    recipientProviders: [[$class: 'DevelopersRecipientProvider'],[$class: 'RequesterRecipientProvider']]
                                    )
                                }
                            }
                        } catch(Exception e) {
                            emailext (
                            subject: "Code Deploy FAIL - Job: '${env.JOB_NAME} [${env.BUILD_NUMBER}]' - Brand: ${TRGT}",
                            body: """<p>Code Deploy FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                                        <p>Error: ${e}</p>
                                        <p>Check console output at "<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
                            recipientProviders: [[$class: 'DevelopersRecipientProvider'],[$class: 'RequesterRecipientProvider']]
                            )
                        }
                    }
                    
                    if (["test"].contains(TRGT) == true) {
                        /*echo "staging deploy!"
                        backupSite("cxcustage");
                        try {
                            sh "git clone git@git.wpengine.com:production/cxcustage.git"
                            sh "rsync -r --exclude 'cxcustage' ${WORKSPACE}/* ${WORKSPACE}/cxcustage"
                            dir('cxcustage') {
                                try {
                                    wpEngineDeploy()
                                } catch(Exception e) {
                                    emailext (
                                    subject: "Code Deploy FAIL - Job: '${env.JOB_NAME} [${env.BUILD_NUMBER}]' - Brand: ${TRGT}",
                                    body: """<p>Code Deploy FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                                                <p>Error: ${e}</p>
                                                <p>Check console output at "<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
                                    recipientProviders: [[$class: 'DevelopersRecipientProvider'],[$class: 'RequesterRecipientProvider']]
                                    )
                                }
                            }
                        } catch(Exception e) {
                            emailext (
                            subject: "Code Deploy FAIL - Job: '${env.JOB_NAME} [${env.BUILD_NUMBER}]' - Brand: ${TRGT}",
                            body: """<p>Code Deploy FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                                        <p>Error: ${e}</p>
                                        <p>Check console output at "<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
                            recipientProviders: [[$class: 'DevelopersRecipientProvider'],[$class: 'RequesterRecipientProvider']]
                            )
                        }*/
                    }

                    if (["ops"].contains(TRGT) == true) {
                        /*echo "prod deploy!"
                        backupSite("cxcu");
                        try {
                            sh "git clone git@git.wpengine.com:production/cxcu.git"
                            sh "rsync -r --exclude 'cxcu' ${WORKSPACE}/* ${WORKSPACE}/cxcu"
                            dir('cxcu') {
                                try {
                                    wpEngineDeploy()
                                } catch(Exception e) {
                                    emailext (
                                    subject: "Code Deploy FAIL - Job: '${env.JOB_NAME} [${env.BUILD_NUMBER}]' - Brand: ${TRGT}",
                                    body: """<p>Code Deploy FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                                                <p>Error: ${e}</p>
                                                <p>Check console output at "<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
                                    recipientProviders: [[$class: 'DevelopersRecipientProvider'],[$class: 'RequesterRecipientProvider']]
                                    )
                                }
                            }
                        } catch(Exception e) {
                            emailext (
                            subject: "Code Deploy FAIL - Job: '${env.JOB_NAME} [${env.BUILD_NUMBER}]' - Brand: ${TRGT}",
                            body: """<p>Code Deploy FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                                        <p>Error: ${e}</p>
                                        <p>Check console output at "<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
                            recipientProviders: [[$class: 'DevelopersRecipientProvider'],[$class: 'RequesterRecipientProvider']]
                            )
                        }*/
                    }
                    if (["dev", "test", "ops"].contains(TRGT) == true) {
                        emailext (
                        subject: "Code Deployed - Job: '${env.JOB_NAME} [${env.BUILD_NUMBER}]' - Environment: ${TRGT}",
                        body: """<p>Code Deployed to ${TRGT}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                                    <p>Check console output at "<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
                                recipientProviders: [[$class: 'DevelopersRecipientProvider'],[$class: 'RequesterRecipientProvider']]
                        )
                    }
                }
            }
        }

        stage('release') {
            when {
                tag 'release-*'
            }
            steps {
                echo "Building $BRANCH_NAME"
                echo "Building $TAG_NAME"
            }
        }
        
        stage("Post-Test") {

            steps {

                echo "Post-Test-Target: $TRGT"

                script {
                    if (["dev","test"].contains(TRGT) == true) {
                    }
                    if (["dev","test","ops"].contains(TRGT) == true) {
                    }
                }

            }

        }
    }
}
