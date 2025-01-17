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

        stage('Build')
        {
            steps
            {
                echo 'Building..'
                sh 'npm install'
                echo 'done installing'
            }
        }
        
        stage('Deploy to EC2') {
            steps {
                sh '''
                    # Copy the application files to the EC2 instance
                    rsync -avz -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" --exclude='node_modules' --exclude='.git' . ubuntu@3.149.249.99:/home/ubuntu/nodejsapp
                    
                    # SSH into the EC2 instance and install dependencies + start the app
                    ssh -i $SSH_KEY -o StrictHostKeyChecking=no ubuntu@3.149.249.99 "cd /home/ubuntu/nodejsapp && npm install && pm2 start app.js --name 'my-node-app'"
                '''
            }
        }
    }
}