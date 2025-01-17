pipeline {
    agent any
    
    tools {
        nodejs 'Nodejs' 
    }
    
    environment {
        SSH_KEY = credentials('jenkins-ssh-id')  
    }
    
    stages {
        
        stage('Test Node.js') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }
        
        stage('Checkout Git Repository') {
            steps {
                git url: 'https://github.com/amarkishan/Productsnodejs.git', branch: 'main'
            }
        }

        stage('Build') {
            steps {
                echo 'Building..'
                sh 'npm ci'
                echo 'Done installing'
            }
        }
        
        stage('Deploy to EC2') {
            steps {
                // Add a timeout to the deployment stage
                timeout(time: 10, unit: 'MINUTES') { // Adjust the time as needed
                    script {
                        try {
                            sh '''
                                # Copy the application files to the EC2 instance
                                rsync -avz -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" --exclude='node_modules' --exclude='.git' . ubuntu@18.118.217.86:/home/ubuntu/nodejsapp
                                
                                # SSH into the EC2 instance and install dependencies + start the app
                                ssh -i $SSH_KEY -o StrictHostKeyChecking=no ubuntu@18.118.217.86 "cd /home/ubuntu/nodejsapp && npm ci && pm2 start app.js --name 'my-node-app'"
                            '''
                        } catch (Exception e) {
                            echo "Deployment failed: ${e}"
                            // Optionally, kill any hanging processes
                            sh '''
                                # Kill any hanging SSH or rsync processes
                                pkill -f "ssh -i $SSH_KEY" || true
                                pkill -f "rsync -avz" || true
                            '''
                            error("Deployment stage failed") // Fail the pipeline
                        }
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo "Pipeline completed (successfully or with errors)."
        }
        failure {
            echo "Pipeline failed. Check the logs for details."
        }
    }
}
