import { EventBridgeEvent } from "aws-lambda";

export type ConsumerEvent<TDetail> = EventBridgeEvent<string, TDetail>;
