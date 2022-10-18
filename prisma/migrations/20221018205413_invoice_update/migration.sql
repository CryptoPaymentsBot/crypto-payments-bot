/*
  Warnings:

  - You are about to drop the column `payedAtCheck` on the `Invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "payedAtCheck",
ADD COLUMN     "payedAt" TIMESTAMP(3);
