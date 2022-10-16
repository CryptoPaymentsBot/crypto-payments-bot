/*
  Warnings:

  - You are about to drop the column `baseCurrency` on the `Bot` table. All the data in the column will be lost.
  - You are about to drop the column `defaultCurrency` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isPremium` on the `User` table. All the data in the column will be lost.
  - Added the required column `balance` to the `Bot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baseCurrencyCode` to the `Bot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountFiat` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currencyCode` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requestList` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defaultCurrencyCode` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bot" DROP COLUMN "baseCurrency",
ADD COLUMN     "balance" JSONB NOT NULL,
ADD COLUMN     "baseCurrencyCode" TEXT NOT NULL,
ALTER COLUMN "isPremium" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "recieveOption" DROP NOT NULL,
ALTER COLUMN "requestList" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "amountFiat" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currencyCode" TEXT NOT NULL,
ADD COLUMN     "isConfirmed" BOOLEAN DEFAULT false,
ADD COLUMN     "lastPaymentCheck" TIMESTAMP(3),
ADD COLUMN     "payedAmount" TEXT,
ADD COLUMN     "payedAtCheck" TIMESTAMP(3),
ADD COLUMN     "payedTokenId" INTEGER,
ADD COLUMN     "requestList" JSONB NOT NULL,
ADD COLUMN     "responsesList" JSONB DEFAULT '[]';

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "defaultCurrency",
ADD COLUMN     "defaultCurrencyCode" TEXT NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isPremium",
ALTER COLUMN "createdAt" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Currency" (
    "code" TEXT NOT NULL,
    "namePlural" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "decimals" INTEGER NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nativeChain" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "contractAddress" TEXT,
    "iconEmoji" TEXT NOT NULL,
    "decimals" INTEGER NOT NULL,
    "externalIds" JSONB NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bot" ADD CONSTRAINT "Bot_baseCurrencyCode_fkey" FOREIGN KEY ("baseCurrencyCode") REFERENCES "Currency"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_defaultCurrencyCode_fkey" FOREIGN KEY ("defaultCurrencyCode") REFERENCES "Currency"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_currencyCode_fkey" FOREIGN KEY ("currencyCode") REFERENCES "Currency"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
