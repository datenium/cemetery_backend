import "./env";
import { settings } from "./config";
import { initializeServer } from "./server";
import { dbclient } from "./database/postgres";
import logger from "./utils/logger";

async function startServer(): Promise<void> {
  const { PORT, GQL_FULL_PATH, SUB_FULL_PATH } = settings;
  const server = await initializeServer();
  server.listen({ port: PORT }, () => {
    console.log(
      `🚀 Http server ready at:            🚀 Subscriptions ready at: \n ${GQL_FULL_PATH}      ${SUB_FULL_PATH}`
    );
  });

  server.on("error", (err) => {
    logger.error(err);
    // process.exit(1);
  });

  server.on("close", async () => {
    await dbclient
      .$disconnect()
      .then(() => logger.info("Database disconnected"))
      .catch(async (err) => {
        logger.error(err);
        await dbclient.$disconnect();
        process.exit(1);
      });
  });
}

void startServer();
