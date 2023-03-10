import { PrismaClient, User } from "@prisma/client";
import { RoleNames } from "../generated/graphql";
import { generateHash } from "../utils/helpers";
import logger from "../utils/logger";

let dbclient: PrismaClient;
let isReady: boolean = false;

async function seedNewDb() {
  const roles = Object.values(RoleNames).map((name) => ({ name }));

  await dbclient.role.createMany({
    data: roles,
  });
  const admin = await dbclient.role.findUnique({
    where: {
      name: RoleNames.SuperAdmin,
    },
  });

  // add own address
  const address = await dbclient.address.create({
    data: {
      city: "Magdeburg",
      country: "Germany",
      zip_code: "39104",
      street: "Schönebecker Straße",
      house_number: "48",
    },
  });

  const client = await dbclient.client.create({
    data: {
      description: "Datenium GmbH",
      name: "Datenium",
      client_type: "COMPANY",
      address: {
        connect: {
          id: address.id,
        },
      },
    },
  });

  const user: User = await dbclient.user.create({
    data: {
      role: {
        connect: {
          id: admin?.id,
        },
      },
      email: "mylifenp@yahoo.com",
      active: true,
      confirmed: true,
      firstName: "Admin",
      lastName: "Datenium",
      password: await generateHash("Dragon123"),
      client: {
        connect: {
          id: client.id,
        },
      },
    },
  });
}

async function connectDb(): Promise<PrismaClient> {
  if (!isReady) {
    dbclient = new PrismaClient({
      log: [
        { level: "info", emit: "event" },
        { level: "error", emit: "event" },
      ],
    });
    await dbclient
      .$connect()
      .then(() => {
        isReady = true;
        logger.info("Connected to database");
      })
      .catch((e) => {
        isReady = false;
        logger.error(e);
      });
  }
  // const dbclient = new PrismaClient();

  if (process.env.FIRSTRUN === "true") {
    logger.info("Seeding database...");
    seedNewDb().catch((e) => {
      logger.error(e);
    });
  }

  return dbclient;
}

export { dbclient };
export default connectDb;
