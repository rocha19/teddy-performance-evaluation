/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `ShortenedUrl` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ShortenedUrl_id_userId_key" ON "ShortenedUrl"("id", "userId");
