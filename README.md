# Survey123 Reponse Webhook Provider
## Overview
This project is a small NodeJS service that integrates with Survey123 as a webhook to perform various automated tasks when a survey has been completed or edited.

This particular example puts respondants into a specific ArcGIS Online group based on the industry they work in, and sends them a custom email confirmation.

Feel free to clone this project and adapt the code to fit your needs.

## Getting Started
Clone the repository
```
git clone https://github.com/andrewctate/survey123-webhook-provider
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
Rename `.env-example` to `.env`
```
mv .env-example .env
```
Add the credentials for the ArcGIS Online user you want the service to act on behalf of.
```
AGO_USERNAME=<your username>
AGO_PASSWORD=<your password>
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

## Security Notes
As configured, the ArcGIS Online credentials will be supplied to your AWS Lambda function as environment variables. This means that anyone who has access to that Lambda function's configuration **will be able to see the password.**

We recommend creating a new AGO user for this service that has the minimum permissions possible to perform the tasks you set up.

If you need more security than that, look into AWS KMS.