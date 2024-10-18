/*
  Warnings:

  - You are about to drop the column `nomeEvento` on the `Ingresso` table. All the data in the column will be lost.
  - Added the required column `nomeEvento` to the `Ingressos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ingresso" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nomePessoa" TEXT NOT NULL,
    "pago" BOOLEAN NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "valor" DECIMAL NOT NULL,
    "ingressosId" TEXT NOT NULL,
    CONSTRAINT "Ingresso_ingressosId_fkey" FOREIGN KEY ("ingressosId") REFERENCES "Ingressos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ingresso" ("cpf", "email", "id", "ingressosId", "nomePessoa", "pago", "telefone", "tipo", "valor") SELECT "cpf", "email", "id", "ingressosId", "nomePessoa", "pago", "telefone", "tipo", "valor" FROM "Ingresso";
DROP TABLE "Ingresso";
ALTER TABLE "new_Ingresso" RENAME TO "Ingresso";
CREATE UNIQUE INDEX "Ingresso_id_key" ON "Ingresso"("id");
CREATE TABLE "new_Ingressos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codigo" INTEGER NOT NULL,
    "total" DECIMAL NOT NULL,
    "pago" BOOLEAN NOT NULL,
    "nomeEvento" TEXT NOT NULL
);
INSERT INTO "new_Ingressos" ("codigo", "id", "pago", "total") SELECT "codigo", "id", "pago", "total" FROM "Ingressos";
DROP TABLE "Ingressos";
ALTER TABLE "new_Ingressos" RENAME TO "Ingressos";
CREATE UNIQUE INDEX "Ingressos_id_key" ON "Ingressos"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
