/*
  Warnings:

  - Added the required column `nomePessoa` to the `Ingresso` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ingresso" (
    "id" TEXT NOT NULL,
    "nomeEvento" TEXT NOT NULL,
    "nomePessoa" TEXT NOT NULL,
    "pago" BOOLEAN NOT NULL,
    "dataExpiracao" TEXT NOT NULL,
    "valor" DECIMAL NOT NULL,
    "cpf" TEXT NOT NULL
);
INSERT INTO "new_Ingresso" ("cpf", "dataExpiracao", "id", "nomeEvento", "pago", "valor") SELECT "cpf", "dataExpiracao", "id", "nomeEvento", "pago", "valor" FROM "Ingresso";
DROP TABLE "Ingresso";
ALTER TABLE "new_Ingresso" RENAME TO "Ingresso";
CREATE UNIQUE INDEX "Ingresso_id_key" ON "Ingresso"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
