# Spring Boot Application Running On AWS Lambda With CDK

This is a template project for Deploying Spring Boot Application on AWS Lambda Function using CDK with TypeScript.

## Requirements

- IAM User or IAM Role that has sufficient permissions.
- AWS CLI installed and configured
- AWS CDK installed
- AWS Serverless Application Model(SAM) installed

## Deployment Instructions

1. Clone this project in the directory you're going to be play:   
```bash
git clone https://github.com/Aquila-Hash/cdk-spring-boot-lambda.git
```

2. Change directory to:
```bash
cd cdk-spring-boot-lambda
```

3. Build Spring Boot Application:
```bash
cd spring-boot-app

./gradlew build

cd ..
```

4. Using cdk, synthesize CloudFormation template without copying assets(file) to the output directory(cdk.out):
```bash
cdk synth --no-staging
```



## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth -q --no-staging`       emits the synthesized CloudFormation template without copying assets

* Invoke Lambda Function in local through cdk-sam without event data
    ```bash
    sam local invoke SpringBootApp --no-event -t ./cdk.out/CdkSpringbootAppStack.template.json
    ```
