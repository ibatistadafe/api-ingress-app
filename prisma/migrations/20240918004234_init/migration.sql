/*
  Warnings:

  - Added the required column `imagemUrl` to the `Evento` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Evento" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "valor" DECIMAL NOT NULL DEFAULT 0,
    "data" TEXT NOT NULL,
    "imagemUrl" BLOB NOT NULL
);
INSERT INTO "new_Evento" ("data", "descricao", "id", "localizacao", "nome", "valor") SELECT "data", "descricao", "id", "localizacao", "nome", "valor" FROM "Evento";
DROP TABLE "Evento";
ALTER TABLE "new_Evento" RENAME TO "Evento";
CREATE UNIQUE INDEX "Evento_id_key" ON "Evento"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
