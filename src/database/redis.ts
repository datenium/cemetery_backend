import { RedisClientOptions, RedisClientType, createClient } from "redis";
import { REDIS_URL } from "../config";
import logger from "../utils/logger";

interface RetryOptions {
  error: {
    code: string;
  };
  total_retry_time: number;
  attempt: number;
}

let client: RedisClientType;
let isReady: boolean = false;

const cacheOptions = {
  url: REDIS_URL,
  retry_strategy: function (options: RetryOptions) {
    if (options.error && options.error.code === "ECONNREFUSED") {
      // If redis refuses the connection or is not able to connect
      return new Error("The server refused the connection");
    }
    // if (options.total_retry_time > 1000 * 60 * 60) {
    if (options.total_retry_time > 3000) {
      // End reconnection after the specified time limit
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  },
};

async function RedisCache(): Promise<RedisClientType> {
  if (!isReady) {
    client = createClient(cacheOptions);

    client.on("error", (err) => logger.error(`Redis Error: ${err}`));
    client.on("connect", () => logger.info("Redis connected"));
    client.on("reconnecting", () => logger.warn("Redis reconnecting"));
    client.on("ready", () => {
      isReady = true;
      logger.info("Redis ready!");
    });
    await client.connect();
  }

  return client;
}

RedisCache()
  .then((connection) => (client = connection))
  .catch((err) => logger.error({ err }));

export default RedisCache;
