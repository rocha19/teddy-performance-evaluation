-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShortenedUrl" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "originalUrl" TEXT,
    "shortUrl" TEXT,
    "clickCount" INTEGER DEFAULT 0,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "userId" TEXT NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "ShortenedUrl_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ShortenedUrl" ("clickCount", "createdAt", "deletedAt", "id", "originalUrl", "shortUrl", "updatedAt", "userId") SELECT "clickCount", "createdAt", "deletedAt", "id", "originalUrl", "shortUrl", "updatedAt", "userId" FROM "ShortenedUrl";
DROP TABLE "ShortenedUrl";
ALTER TABLE "new_ShortenedUrl" RENAME TO "ShortenedUrl";
CREATE UNIQUE INDEX "ShortenedUrl_shortUrl_key" ON "ShortenedUrl"("shortUrl");
CREATE UNIQUE INDEX "ShortenedUrl_id_userId_key" ON "ShortenedUrl"("id", "userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
