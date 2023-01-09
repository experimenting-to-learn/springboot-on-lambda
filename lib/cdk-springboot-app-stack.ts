import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { Duration } from 'aws-cdk-lib';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { HttpApi, HttpMethod, MappingValue, ParameterMapping } from '@aws-cdk/aws-apigatewayv2-alpha';


export class CdkSpringbootAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const springBootAppFunc = new Function(this, 'SpringBootApp', {
      runtime: Runtime.JAVA_11,
      handler: 'org.springframework.cloud.function.adapter.aws.FunctionInvoker::handleRequest',
      code: Code.fromAsset('./spring-boot-app/build/libs/demo-0.0.1-SNAPSHOT-aws.jar'),
      timeout: Duration.minutes(5),
      memorySize: 512,
    })

    const httpApi = new HttpApi(this, 'ApiGw');

    httpApi.addRoutes(
      {
        path: '/some-api',
        methods: [ HttpMethod.GET ],
        integration: new HttpLambdaIntegration('Uppercase', springBootAppFunc, {
          parameterMapping: new ParameterMapping().appendHeader('path', MappingValue.requestPath())
        }),
      }
    )
  }
}
