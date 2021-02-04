# Survey123 Reponse Webhook Provider
## Overview
This project is a small NodeJS service that integrates with Survey123 as a webhook to perform various automated tasks when a survey has been completed or edited.

This particular example puts respondants into a specific ArcGIS Online group based on the industry they work in, and sends them a custom email confirmation.

Feel free to clone this project and adapt the code logic to fit your needs.

## Getting Started
Clone the repository
```
git clone
```
Change current directory
```
cd survey123-webhook-provider
```
Install dependencies
```
npm i
```
Install Serverless
```
npm i -g serverless
```

### Local Development
Run Serverless locally
```
serverless offline
```

### Cloud Deployment
Provide Serverless with AWS credentials ([more directions here](https://www.serverless.com/framework/docs/providers/aws/cli-reference/config-credentials/) - can use other platforms, but only tested with AWS)
```
serverless config credentials --provider aws --key key --secret secret`
```
Deploy to your cloud
```
serverless deploy
```