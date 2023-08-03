---
sidebar_position: 2
title: Event Contract Basics
id: eventbridge-contracts
---

## Eventbridge Contracts

Within event-driven architectures, events facilitate communication between loosely connected services in an application. EventBridge is AWS's tool for implementing asynchronous event-driven workflows.

Event emitters are responsible for broadcasting events to event channels, while event consumers are responsible for executing business logic whenever they encounter a relevant event.

EventBridge contracts ensure a stable and reliable interaction emitters and consumers. These contract acts as a guiding agreement which guarantees that emitters' published events will consistently trigger the corresponding business logic on the consumer side.

## Creating an EventBridge contract

To create an EventBridge Contract, create a contract file and define the type of your contract. Import the type into your event producer. If the type of the contract does not match the shape of the event, then you will see an error.
