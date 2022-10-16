/*
  Warnings:

  - A unique constraint covering the columns `[name,nativeChain,symbol]` on the table `Token` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Token_name_nativeChain_symbol_key" ON "Token"("name", "nativeChain", "symbol");
