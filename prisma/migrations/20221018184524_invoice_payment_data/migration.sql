/*
  Warnings:

  - Added the required column `paymentDeadline` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "paymentAmount" TEXT,
ADD COLUMN     "paymentDeadline" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "paymentTokenId" INTEGER;
