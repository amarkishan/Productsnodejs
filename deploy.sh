#!/bin/bash

# Stop the script if any command fails
set -e

# Assign arguments to variables
SSH_KEY=$1
EC2_IP=$2
APP_DIR=$3

# Step 1: Sync files to EC2
echo "Syncing files to EC2..."
rsync -avz -e "ssh -i $SSH_KEY" --exclude 'node_modules' ./ user@$EC2_IP:$APP_DIR

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
