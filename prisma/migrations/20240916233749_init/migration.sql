-- CreateTable
CREATE TABLE "Ingresso" (
    "id" TEXT NOT NULL,
    "nomeEvento" TEXT NOT NULL,
    "pago" BOOLEAN NOT NULL,
    "dataExpiracao" TEXT NOT NULL,
    "valor" DECIMAL NOT NULL,
    "cpf" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Ingresso_id_key" ON "Ingresso"("id");
