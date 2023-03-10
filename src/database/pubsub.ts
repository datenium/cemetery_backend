import { RedisPubSub } from "graphql-redis-subscriptions";
import { REDIS_HOST, REDIS_PORT } from "../config";
import Redis from "ioredis";

const options = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  retryStrategy: (times: number) => {
    return Math.min(times * 50, 2000);
  },
};

const dateReviver = (key: string, value: string) => {
  const isISO8601Z =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
  if (typeof value === "string" && isISO8601Z.test(value)) {
    const tempDateNumber = Date.parse(value);
    if (!isNaN(tempDateNumber)) {
      return new Date(tempDateNumber);
    }
  }
  return value;
};

const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
  messageEventName: "messageBuffer",
  pmessageEventName: "pmessageBuffer",
  reviver: dateReviver,
});

export default pubsub;
