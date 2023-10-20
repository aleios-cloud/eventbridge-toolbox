import { App } from 'aws-cdk-lib';

import { EventsStack } from '../lib/eventsStack';

const app = new App();
new EventsStack(app, 'EventsStack');
