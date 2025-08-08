#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { DemoawspipelineStack } from '../lib/demoawspipeline-stack';

const app = new cdk.App();
new DemoawspipelineStack(app, 'DemoawspipelineStack', {
 env: { account: '654654189852', region: 'us-east-1' }
});