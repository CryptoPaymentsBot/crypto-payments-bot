-- CreateIndex
CREATE INDEX "Bot_telegramId_idx" ON "Bot"("telegramId");

-- CreateIndex
CREATE INDEX "Currency_code_idx" ON "Currency"("code");

-- CreateIndex
CREATE INDEX "Invoice_userId_productId_idx" ON "Invoice"("userId", "productId");

-- CreateIndex
CREATE INDEX "Product_botId_idx" ON "Product"("botId");

-- CreateIndex
CREATE INDEX "Token_name_nativeChain_symbol_idx" ON "Token"("name", "nativeChain", "symbol");

-- CreateIndex
CREATE INDEX "User_telegramId_idx" ON "User"("telegramId");
