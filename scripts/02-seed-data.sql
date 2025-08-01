-- Dados iniciais para desenvolvimento
INSERT INTO escolas (id, nome, cnpj, endereco, telefone, email) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Colégio Exemplo', '12.345.678/0001-90', 'Rua das Flores, 123 - São Paulo/SP', '(11) 3456-7890', 'contato@colegioexemplo.com.br');

INSERT INTO usuarios (escola_id, nome, email, senha_hash, tipo) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Maria Silva', 'maria@colegioexemplo.com.br', '$2b$10$example', 'direcao'),
('550e8400-e29b-41d4-a716-446655440000', 'João Santos', 'joao@colegioexemplo.com.br', '$2b$10$example', 'secretaria');

INSERT INTO turmas (escola_id, nome, serie, periodo, capacidade, ano_letivo) VALUES 
('550e8400-e29b-41d4-a716-446655440000', '1º Ano A', '1º Ano', 'matutino', 25, 2024),
('550e8400-e29b-41d4-a716-446655440000', '2º Ano A', '2º Ano', 'matutino', 25, 2024),
('550e8400-e29b-41d4-a716-446655440000', '3º Ano A', '3º Ano', 'vespertino', 30, 2024);
