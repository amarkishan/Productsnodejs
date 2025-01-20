pipeline {
    agent any
    
    tools {
        nodejs 'Nodejs' 
    }
    
    environment {
        SSH_KEY = credentials('jenkins-ssh-id')  
        EC2_IP = '18.189.185.51' // Or use a Jenkins credential for this
        APP_DIR = '/home/ubuntu/nodejsapp'
    }
    
    stages {
        stage('Test Node.js') {
            steps {
                sh 'node -v && npm -v'
            }
        }
        
        stage('Checkout Git Repository') {
            steps {
                git url: 'https://github.com/amarkishan/Productsnodejs.git', branch: 'main'
            }
        }

        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm ci'
                sh 'npm run build'
            }
        }
        
        stage('Deploy to EC2') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    script {
                      try {
                        // Call the deployment script and pass parameters
                        sh """
                            # Step 1: Make the deployment script executable
                            # chmod +x adds execute permissions to the script so it can be run
                        
                            chmod +x deploy.sh &&\
                            
                            # Step 2: Run the deployment script with parameters
                            # ./deploy.sh executes the script, passing the SSH key, EC2 IP, and app directory as arguments

                            ./deploy.sh $SSH_KEY $EC2_IP $APP_DIR
                         """
                        }  catch (Exception e) {
                            echo "Deployment failed: ${e}"
                            // Clean up hanging processes
                            sh 'pkill -f "ssh -i $SSH_KEY" || true'
                            sh 'pkill -f "rsync -avz" || true'
                            error("Deployment stage failed")
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