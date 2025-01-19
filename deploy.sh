SSH_KEY=$1
EC2_IP=$2 
APP_DIR=$3
# Step 1: Copy application files to EC2
echo "Copying application files to EC2..."
rsync -avz -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" \
--exclude='node_modules' \
--exclude='.git' \
. ubuntu@$EC2_IP:$APP_DIR


# Step 2: SSH into EC2, install dependencies, and start the app
echo "Installing dependencies and starting the application on EC2..."
ssh -i $SSH_KEY -o StrictHostKeyChecking=no ubuntu@$EC2_IP "
    cd $APP_DIR && \
    npm ci && \
    pm2 start app.js --name 'my-node-app'
"

echo "Deployment completed successfully!"

