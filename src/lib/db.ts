import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// Create the accelerated client
const prismaClient = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : [],
}).$extends(withAccelerate());

declare global {
  var prisma: typeof prismaClient | undefined;
}

export const db = globalThis.prisma || prismaClient;

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

export default db;
