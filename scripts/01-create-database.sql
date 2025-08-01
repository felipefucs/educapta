-- Criação das tabelas principais do sistema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de escolas (multi-tenant)
CREATE TABLE escolas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18) UNIQUE,
    endereco TEXT,
    telefone VARCHAR(20),
    email VARCHAR(255),
    logo_url TEXT,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de usuários do sistema
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    escola_id UUID REFERENCES escolas(id),
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) DEFAULT 'secretaria', -- secretaria, direcao
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de turmas
CREATE TABLE turmas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    escola_id UUID REFERENCES escolas(id),
    nome VARCHAR(100) NOT NULL,
    serie VARCHAR(50) NOT NULL,
    periodo VARCHAR(20) NOT NULL, -- matutino, vespertino, integral
    capacidade INTEGER NOT NULL,
    vagas_ocupadas INTEGER DEFAULT 0,
    ano_letivo INTEGER NOT NULL,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de responsáveis
CREATE TABLE responsaveis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    escola_id UUID REFERENCES escolas(id),
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    rg VARCHAR(20),
    telefone VARCHAR(20),
    email VARCHAR(255),
    endereco TEXT,
    profissao VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de alunos
CREATE TABLE alunos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    escola_id UUID REFERENCES escolas(id),
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE,
    cpf VARCHAR(14),
    rg VARCHAR(20),
    endereco TEXT,
    telefone VARCHAR(20),
    email VARCHAR(255),
    necessidades_especiais TEXT,
    medicamentos TEXT,
    alergias TEXT,
    contato_emergencia TEXT,
    turma_id UUID REFERENCES turmas(id),
    status VARCHAR(50) DEFAULT 'captacao', -- captacao, pre_matricula, matriculado, inativo
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de relacionamento aluno-responsável
CREATE TABLE aluno_responsavel (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    aluno_id UUID REFERENCES alunos(id),
    responsavel_id UUID REFERENCES responsaveis(id),
    tipo VARCHAR(50) NOT NULL, -- pai, mae, responsavel_legal
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de contratos
CREATE TABLE contratos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    escola_id UUID REFERENCES escolas(id),
    aluno_id UUID REFERENCES alunos(id),
    numero_contrato VARCHAR(50) UNIQUE,
    conteudo TEXT,
    status VARCHAR(50) DEFAULT 'pendente', -- pendente, assinado, cancelado
    url_assinatura TEXT,
    data_assinatura TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de pagamentos
CREATE TABLE pagamentos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    escola_id UUID REFERENCES escolas(id),
    aluno_id UUID REFERENCES alunos(id),
    tipo VARCHAR(50) NOT NULL, -- matricula, mensalidade
    valor DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pendente', -- pendente, pago, vencido, cancelado
    data_vencimento DATE,
    data_pagamento TIMESTAMP,
    metodo_pagamento VARCHAR(50),
    referencia_externa VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de comunicações
CREATE TABLE comunicacoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    escola_id UUID REFERENCES escolas(id),
    destinatario_id UUID, -- pode ser aluno ou responsável
    tipo VARCHAR(50) NOT NULL, -- email, whatsapp, sms
    assunto VARCHAR(255),
    conteudo TEXT,
    status VARCHAR(50) DEFAULT 'pendente', -- pendente, enviado, erro
    data_envio TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de histórico de interações (CRM)
CREATE TABLE interacoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    escola_id UUID REFERENCES escolas(id),
    aluno_id UUID REFERENCES alunos(id),
    usuario_id UUID REFERENCES usuarios(id),
    tipo VARCHAR(50) NOT NULL, -- ligacao, email, visita, reuniao
    descricao TEXT,
    data_interacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX idx_alunos_escola_status ON alunos(escola_id, status);
CREATE INDEX idx_turmas_escola_ano ON turmas(escola_id, ano_letivo);
CREATE INDEX idx_pagamentos_status ON pagamentos(status, data_vencimento);
CREATE INDEX idx_comunicacoes_status ON comunicacoes(status, created_at);
