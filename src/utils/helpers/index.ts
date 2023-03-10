import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET, TOKEN_AGE } from "../../config";
import { User } from "@prisma/client";
import { dbclient } from "../../database/postgres";

export const validateToken = (token: string): JwtPayload | undefined => {
  return jwt.verify(token, SECRET) as JwtPayload;
};

export const generateHash = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const validateHash = async (
  recvString: string,
  hashedString: string
): Promise<Boolean> => {
  return await bcrypt.compare(recvString, hashedString);
};

export const createJwtToken = async (
  user: User,
  expires = TOKEN_AGE
): Promise<string> => {
  const { id, email, active, firstName, lastName, roleId, clientId } = user;
  try {
    const role = await dbclient.role.findUnique({ where: { id: roleId } });
    const client = await dbclient.client.findUnique({
      where: { id: clientId },
    });
    if (!role || !client) {
      return "";
    }
    return jwt.sign(
      {
        id,
        email,
        active,
        firstName,
        lastName,
        roleId,
        clientId,
        role: role,
        client: client,
      },
      SECRET,
      {
        expiresIn: expires,
      }
    );
  } catch (err) {
    console.log(err);
    return "";
  }
};
