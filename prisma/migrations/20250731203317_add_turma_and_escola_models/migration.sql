-- CreateTable
CREATE TABLE "public"."escolas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT,
    "telefone" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "escolas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."turmas" (
    "id" TEXT NOT NULL,
    "escola_id" TEXT NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "serie" VARCHAR(50) NOT NULL,
    "periodo" VARCHAR(20) NOT NULL,
    "capacidade" INTEGER NOT NULL,
    "vagas_ocupadas" INTEGER NOT NULL DEFAULT 0,
    "ano_letivo" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "turmas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."aluno_turma" (
    "id" TEXT NOT NULL,
    "aluno_id" TEXT NOT NULL,
    "turma_id" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "data_matricula" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aluno_turma_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "aluno_turma_aluno_id_turma_id_key" ON "public"."aluno_turma"("aluno_id", "turma_id");

-- AddForeignKey
ALTER TABLE "public"."turmas" ADD CONSTRAINT "turmas_escola_id_fkey" FOREIGN KEY ("escola_id") REFERENCES "public"."escolas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."alunos" ADD CONSTRAINT "alunos_escola_id_fkey" FOREIGN KEY ("escola_id") REFERENCES "public"."escolas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."aluno_turma" ADD CONSTRAINT "aluno_turma_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "public"."alunos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."aluno_turma" ADD CONSTRAINT "aluno_turma_turma_id_fkey" FOREIGN KEY ("turma_id") REFERENCES "public"."turmas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
