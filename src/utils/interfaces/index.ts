import type { RedisClientType } from "redis";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

interface XAuthToken {
  x_auth_token: string | undefined | string[];
  x_auth_id: string | undefined | string[];
}

export interface ServerContext {
  req: Request;
  res: Response;
  me: JwtPayload | undefined;
  x_auth_token_info: XAuthToken;
  dbclient: PrismaClient;
  redis: RedisClientType;
  pubsub: RedisPubSub;
}

export interface RedisCacheParams {
  me: JwtPayload | undefined;
  resource: string;
  id?: string | undefined;
}

export interface CachedOptions {
  store: string;
  path: string;
}

export interface RedisClientParams {
  clientId: string;
  params: CachedOptions;
}
