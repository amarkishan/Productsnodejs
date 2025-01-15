pipeline {
    agent any
    tools {
        nodejs "node"
    }
    environment {
        EC2_INSTANCE = credentials('EC2_INSTANCE_CREDENTIAL')
        EC2_SSH_KEY = credentials('EC2_SSH_KEY_CREDENTIAL')
        DEPLOY_DIR = '/path/to/deployment/directory'
        GIT_REPO = 'https://github.com/amarkishan/Productsnodejs.git'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                git branch: 'main', url: "${env.GIT_REPO}"
                bat 'npm install'
                bat 'npm build'
            }
        }
        
        stage('Test') {
            steps {
                echo 'testing..'
                bat 'npm test'
                echo 'testing completed'
            }
        }
        
        stage('Deploy to EC2') {
            steps {
                script {
                    // Package the application
                    
                    
                    // Transfer files to EC2
                    bat "scp -i ${EC2_SSH_KEY} -r ./* ${EC2_INSTANCE}:${DEPLOY_DIR}"
                    
                    // SSH into EC2 and restart the application
                    bat "ssh -i ${EC2_SSH_KEY} ${EC2_INSTANCE} 'cd ${DEPLOY_DIR} && npm install && pm2 restart app.js'"
                }
            }
        }
    }
}
