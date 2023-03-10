export const REDIS_HOST = process.env.REDIS_HOST ?? "localhost";
export const REDIS_PORT = Number(process.env.REDIS_PORT) ?? 6379;
export const SECRET = process.env.SECRET ?? "this is not a good secret";
export const TOKEN_AGE = process.env.TOKEN_AGE ?? "10h";

export const settings = {
  HOST: process.env.HOST ?? "localhost",
  PORT: process.env.PORT ?? 8080,
  GQL_FULL_PATH: `${process.env.HTTP ?? "http://"}${
    process.env.HOSTNAME ?? "localhost"
  }:${process.env.PORT ?? 8080}${process.env.GQL_PATH ?? "/graphql"}`,
  SUB_FULL_PATH: `${process.env.WS ?? "ws://"}${
    process.env.HOSTNAME ?? "localhost"
  }:${process.env.PORT ?? 8080}${process.env.WS_PATH ?? "/subscriptions"}`,
  GQL_PATH: process.env.GQL_PATH ?? "/graphql",
  WS_PATH: process.env.WS_PATH ?? "/subscriptions",
};

export const REDIS_URL = `redis://${REDIS_HOST}:${REDIS_PORT}`;
