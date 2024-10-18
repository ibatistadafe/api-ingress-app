/*
  Warnings:

  - You are about to drop the column `dataExpiracao` on the `Ingresso` table. All the data in the column will be lost.
  - Added the required column `email` to the `Ingresso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingressosId` to the `Ingresso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `Ingresso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Ingresso` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Ingressos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "total" DECIMAL NOT NULL,
    "pago" BOOLEAN NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ingresso" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nomeEvento" TEXT NOT NULL,
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
INSERT INTO "new_Ingresso" ("cpf", "id", "nomeEvento", "nomePessoa", "pago", "valor") SELECT "cpf", "id", "nomeEvento", "nomePessoa", "pago", "valor" FROM "Ingresso";
DROP TABLE "Ingresso";
ALTER TABLE "new_Ingresso" RENAME TO "Ingresso";
CREATE UNIQUE INDEX "Ingresso_id_key" ON "Ingresso"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Ingressos_id_key" ON "Ingressos"("id");
