import { App } from 'aws-cdk-lib';

import { ProducerStack } from '../lib/producerStack';

const app = new App();
new ProducerStack(app, 'ProducerStack');
