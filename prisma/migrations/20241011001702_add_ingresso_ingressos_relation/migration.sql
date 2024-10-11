/*
  Warnings:

  - Added the required column `codigo` to the `Ingressos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ingressos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codigo" INTEGER NOT NULL,
    "total" DECIMAL NOT NULL,
    "pago" BOOLEAN NOT NULL
);
INSERT INTO "new_Ingressos" ("id", "pago", "total") SELECT "id", "pago", "total" FROM "Ingressos";
DROP TABLE "Ingressos";
ALTER TABLE "new_Ingressos" RENAME TO "Ingressos";
CREATE UNIQUE INDEX "Ingressos_id_key" ON "Ingressos"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
