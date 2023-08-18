# eventbridge-toolbox

Eventbridge Toolbox is a lightweight eventbridge adapter that can help you enforce good practicies in your event driven architectures.

## Eventbridge Contracts

Within event-driven architectures, events facilitate communication between loosely connected services in an application. EventBridge is AWS's tool for implementing asynchronous event-driven workflows.

Event emitters are responsible for broadcasting events to event channels, while event consumers are responsible for executing business logic whenever they encounter a relevant event.

EventBridge contracts ensure a stable and reliable interaction emitters and consumers. These contract acts as a guiding agreement which guarantees that emitters' published events will consistently trigger the corresponding business logic on the consumer side.

## Creating an EventBridge contract

To create an EventBridge Contract, define a type for your contract. Your contract type must extend the interface `Contract`, with `Contract` being importable from the eventbridge-toolbox package. This typing will force you to add an event version to your contract. If you ever alter your contract (for instance, to add a new field), please create a copy of the contract in a new file, and give it a version number higher that you previous version of your contract. The `detailType` field stays consistent, and allows you to link together all versions of your contract.

Create an Contract type:

```typescript
export interface PersonRegisteredContractV1 extends Contract {
  version: 1;
  detailType: "PersonRegisteredContract";
  detail: {
    firstName: string;
    lastName: string;
  };
}
```

As `version` and `detailType` are set as constants in the type, when we create an object of type PersonRegisteredContractV1, the `version` and `detailType` must match what is defined here otherwise you will see an error.

Create an Contract type:

```typescript
const ourEvent: PersonRegisteredContractV1 = {
  version: 1;
  detailType: "PersonRegisteredContract";
  detail: {
    firstName: 'testFirstName';
    lastName: 'testLastName';
  };
}
```

## Creating an Event

The Event class bakes in a lot of best practices. To instantiate an eventbridge-toolbox event, create a new Event and pass in your event detail and event detail type.

You can see an example below:

```typescript
import Event from "@eventbridge-toolbox";

const loggedInData: LoggedInContractV1 = {
  version: 1;
  detailType: "LoggedInContract";
  detail: {
    firstName: "Lucy",
    lastName: "Example",
    timeLoggedIn: "2023-01-01T13:00:00.000Z",
  };
}


const myEvent = new Event(loggedInData);

//equal to the 'loggedInData' object
const myEventDetail = myEvent.getDetail();

//equal to 'loggedIn'
const myEventDetailType = myEvent.getDetailType():

```

You can then publish your event by calling the `publish` function, passing in the ARN of the EventBus which you want to publish your event to and your event source.

You can see an example below for the scenario where the event source is a lambda:

```typescript
const EVENT_BUS_ARN = getEnvVariable("EVENT_BUS_ARN");

await myEvent.publish(EVENT_BUS_ARN, "lambda.amazonaws.com");
```

## Key Features

- An event construct
- Contracts to enforce types between producers and consumers
- Event versioning

## Getting Started

### Prerequisites

### Installation

With npm:

```
npm install --save-dev eventbridge-toolbox
```

With yarn:

```
yarn add -D eventbridge-toolbox
```

With pnpm:

```
pnpm add -D eventbridge-toolbox
```

### Usage

## User Documentation

You can create a documentation website based on [eventcatalog.dev](https://www.eventcatalog.dev/) and generate docs directly from your event contracts.

1. Set up an event catalog site and give it a name:

```
npx @eventcatalog/create-eventcatalog@latest <name your event catalog>
```

2. Edit `event-catalog/eventcatalog.config.js` with your details

3. Remove the example events from the `event-catalog/events` folder

4. Install `eventbridge-toolbox-schema-generator`:

With npm:

```
npm install --save-dev @aleios-cloud/eventbridge-toolbox-schema-generator
```

With yarn:

```
yarn add -D @aleios-cloud/eventbridge-toolbox-schema-generator
```

With pnpm:

```
pnpm add -D @aleios-cloud/eventbridge-toolbox-schema-generator
```

5. Run `eventbridge-toolbox-schema-generator` with the following arguments:

- The path from the root to your event contracts
- The path from the root to the event catalog events folder

```
npx schema-generator <path from root to your event contracts> <path from root to event catalog events>
```

6. You can start a local development server by running:

```
cd event-catalog
npm run dev
```

7. You can find out more about how to deploy your documentation site in the [event catalog docs](https://www.eventcatalog.dev/docs/guides/deployment)

## Contributors

<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td valign="top"><a href="https://github.com/lukey-aleios"><img src="https://avatars.githubusercontent.com/u/93375669?v=4" width="100px;" alt="Luke Yianni"/><br /><sub><b>Luke Yianni</b></sub></a></td>
      <td valign="top"><a href="https://github.com/april-bates-aleios"><img src="https://avatars.githubusercontent.com/u/124585201?v=4" width="100px;" alt="April Bates"/><br /><sub><b>April Bates</b></sub></a></td>
      <td valign="top"><a href="https://github.com/RyanT5"><img src="https://avatars.githubusercontent.com/u/22382958?v=4" width="100px;" alt="Ryan Schuller"/><br /><sub><b>Ryan Schuller</b></sub></a></td>
    </tr>
  </tbody>
</table>
<!-- markdownlint-restore -->
