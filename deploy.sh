//this is deploy.sh
SSH_KEY=$1
EC2_IP=$2 
APP_DIR=$3
# Step 1: Copy application files to EC2
# echo "Copying application files to EC2..."
# rsync -avz -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" \
# --exclude='node_modules' \
# --exclude='.git' \
# . ubuntu@$EC2_IP:$APP_DIR

# rsync -avz -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" \
# dist/ ubuntu@$EC2_IP:$APP_DIR

# rsync -avz -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" \
# package.json package-lock.json user@$EC2_IP:$APP_DIR

# # Step 2: SSH into EC2, install dependencies, and start the app
# echo "Installing dependencies and starting the application on EC2..."
# ssh -i $SSH_KEY -o StrictHostKeyChecking=no ubuntu@$EC2_IP "
#     cd $APP_DIR && \
#     npm install --production && \
#     pm2 start npm --name 'my-node-app' --start
# "

#!/bin/bash
# Sync files to EC2
rsync -avz --exclude 'node_modules' ./ user@18.191.139.143:/home/ubuntu/nodejsapp

# SSH into EC2 and install dependencies
ssh -i "$SSH_KEY" user@18.191.139.143 << 'EOF'
    cd /home/ubuntu/nodejsapp
    npm install --omit=dev
    # Start your application (e.g., using PM2 or npm start)
    pm2 start app.js
EOF
echo "Deployment completed successfully!"

