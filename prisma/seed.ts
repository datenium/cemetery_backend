import { User } from "@prisma/client";
import { dbclient } from "../src/database";
import { faker } from "@faker-js/faker";
import { generateHash } from "../src/utils/helpers";
import { RoleNames } from "../src/generated/graphql";

async function seeder() {
  const user_role = await dbclient.role.findUnique({
    where: { name: RoleNames.User },
  });
  const client = await dbclient.client.findUnique({
    where: { name: "Datenium" },
  });
  const new_user = async (): Promise<User> =>
    await dbclient.user.create({
      data: {
        lastName: faker.name.lastName(),
        firstName: faker.name.firstName(),
        email: faker.internet.email(),
        password: await generateHash("Dragon123"),
        active: true,
        role: {
          connect: {
            id: user_role?.id,
          },
        },
        confirmed: true,
        client: {
          connect: {
            id: client?.id,
          },
        },
      },
    });

  for (let i = 0; i < 40; i++) {
    await new_user();
  }
}

seeder()
  .then(() => {
    console.log("done");
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await dbclient.$disconnect();
  });
