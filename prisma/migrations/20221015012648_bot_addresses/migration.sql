/*
  Warnings:

  - Added the required column `addresses` to the `Bot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bot" ADD COLUMN     "addresses" JSONB NOT NULL;
