pipeline {
    agent any
    environment {
        // Define environment variables for EC2 IP and app directory
        //SSH_KEY = credentials('jenkins-ssh-id')
        EC2_IP = '18.191.139.143'
        APP_DIR = '/home/ubuntu/nodejsapp'
    }
    stages {
        stage('Deploy to EC2') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    script {
                        try {
                            // Securely handle the SSH key using withCredentials
                            withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-ssh-id', keyFileVariable: 'SSH_KEY')]) {
                                sh """
                                    # Step 1: Sync files to EC2
                                    echo "Syncing files to EC2..."
                                    rsync -avz -e "ssh -i $SSH_KEY" --exclude 'node_modules' ./ ubuntu@$EC2_IP:$APP_DIR

                                    # Step 2: SSH into EC2 and install dependencies
                                    echo "Installing dependencies and starting the application on EC2..."
                                    ssh -i "$SSH_KEY" user@$EC2_IP << 'EOF'
                                        set -e # Stop if any command fails
                                        cd $APP_DIR
                                        npm install --omit=dev
                                        # Start your application (e.g., using PM2 or npm start)
                                        pm2 start app.js
                                    EOF

                                    echo "Deployment completed successfully!"
                                """
                            }
                        } catch (Exception e) {
                            // Handle errors gracefully
                            echo "Deployment failed: ${e.getMessage()}"
                            currentBuild.result = 'FAILURE'
                        }
                    }
                }
            }
        }
    }
}
