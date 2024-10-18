/*
  Warnings:

  - You are about to drop the column `pago` on the `Ingresso` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `Ingresso` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ingresso" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nomePessoa" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "ingressosId" TEXT NOT NULL,
    CONSTRAINT "Ingresso_ingressosId_fkey" FOREIGN KEY ("ingressosId") REFERENCES "Ingressos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ingresso" ("cpf", "email", "id", "ingressosId", "nomePessoa", "telefone", "tipo") SELECT "cpf", "email", "id", "ingressosId", "nomePessoa", "telefone", "tipo" FROM "Ingresso";
DROP TABLE "Ingresso";
ALTER TABLE "new_Ingresso" RENAME TO "Ingresso";
CREATE UNIQUE INDEX "Ingresso_id_key" ON "Ingresso"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
