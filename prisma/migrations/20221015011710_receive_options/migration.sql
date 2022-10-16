/*
  Warnings:

  - The `recieveOption` column on the `Bot` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ReceiveOptions" AS ENUM ('DM', 'webhook');

-- AlterTable
ALTER TABLE "Bot" DROP COLUMN "recieveOption",
ADD COLUMN     "recieveOption" "ReceiveOptions" DEFAULT 'DM';

-- DropEnum
DROP TYPE "RecieveOptions";
