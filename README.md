# eventbridge-toolbox

Eventbridge Toolbox is a lightweight eventbridge adapter that can help you enforce good practicies in your event driven architectures.

## Eventbridge Contracts

Within event-driven architectures, events facilitate communication between loosely connected services in an application. EventBridge is AWS's tool for implementing asynchronous event-driven workflows.

Event emitters are responsible for broadcasting events to event channels, while event consumers are responsible for executing business logic whenever they encounter a relevant event.

EventBridge contracts ensure a stable and reliable interaction emitters and consumers. These contract acts as a guiding agreement which guarantees that emitters' published events will consistently trigger the corresponding business logic on the consumer side.

## Creating an EventBridge contract

To create an EventBridge Contract, create a contract file and define the type of your contract. If the type of the contract does not match the shape of the event which is received by the producer, then you will see an error.

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

Full docs are available at ...

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
