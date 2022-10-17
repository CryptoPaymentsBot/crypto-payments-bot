/*
  Warnings:

  - You are about to drop the column `balance` on the `Bot` table. All the data in the column will be lost.
  - You are about to drop the column `locale` on the `Bot` table. All the data in the column will be lost.
  - You are about to drop the column `recieveOption` on the `Bot` table. All the data in the column will be lost.
  - Added the required column `balances` to the `Bot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bot" DROP COLUMN "balance",
DROP COLUMN "locale",
DROP COLUMN "recieveOption",
ADD COLUMN     "balances" JSONB NOT NULL,
ADD COLUMN     "receiveOption" "ReceiveOptions" DEFAULT 'DM';
