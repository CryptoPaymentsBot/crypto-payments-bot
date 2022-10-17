import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();

process.on("SIGTERM", () => prismaClient.$disconnect());
