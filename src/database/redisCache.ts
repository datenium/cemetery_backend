import type { RedisClientType } from "redis";
import { CachedOptions } from "../utils/interfaces";

export const getCached = async <T>(
  redis: RedisClientType,
  options: CachedOptions
): Promise<T | null> => {
  const { store, path } = options;
  const result = await redis.json.get(store, { path });
  return result as T;
};

// export const getMultipleCache = async (
//   me: JwtPayload | undefined,
//   redis: Redis,
//   resource_name: string,
//   _cursor: number
// ) => {
//   if (!me) return Promise.resolve(["none", []]);
//   const { clientId } = me;
//   const query = `${clientId}:${resource_name}:*`;
//   const [cursor, elements] = await redis.scan(_cursor, "MATCH", query);
//   const result = [];
//   for (const val of await redis.mget(elements)) {
//     if (!val) continue;
//     result.push(JSON.parse(val));
//   }
//   return result;
// };

// export const setCache = async <T>(
//   me: JwtPayload | undefined,
//   redis: Redis,
//   resource_name: string,
//   resource_id: string,
//   data: T
// ): Promise<"OK" | null> => {
//   if (!me) return null;
//   const { clientId } = me;
//   // const query = `${clientId}:${resource_name}:${resource_id}`;
//   const path = `$.${resource_name}`;
//   return await redis.json_set(clientId, path, data);
// };
