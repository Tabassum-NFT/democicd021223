import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {CodePipeline, CodePipelineSource, ShellStep} from 'aws-cdk-lib/pipelines';
import { PipelineAppStage } from './demoawspipeline-app-stack';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class DemoawspipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    //AWS CI_CD Pipeline

    const democicdpipeline = new CodePipeline(this, 'demopipeline', {
       synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('Tabassum-NFT/democicd021223', 'main', {
          authentication: cdk.SecretValue.secretsManager('github-token')
        }),
       commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
      }),
    });

    
    const testingStage = democicdpipeline.addStage(new PipelineAppStage(this, 'test' , {
      env: { account: '654654189852', region: 'us-east-1' }
    }));

    testingStage.addPost(new ManualApprovalStep('ManualApproval'));

    const productionStage = democicdpipeline.addStage(new PipelineAppStage(this, 'prod', {
      env: { account: '654654189852', region: 'us-east-1' }
    }));


  }
    // example resource
    // const queue = new sqs.Queue(this, 'DemoawspipelineQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
}
