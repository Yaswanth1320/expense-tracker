import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import db from "./db";
import { v4 as uuidv4 } from "uuid";

export const checkUser = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return null;
  }

  const dbUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (dbUser) {
    return dbUser;
  }

  const newUser = await db.user.create({
    data: {
      id: uuidv4(),
      clerkUserId: user.id,
      email: user.email || "",
      name: user.given_name + " " + user.family_name,
      imageUrl: user.picture,
    },
  });

  return newUser;
};
