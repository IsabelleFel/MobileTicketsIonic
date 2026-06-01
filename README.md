# MobileTicketsIonic

Aplicativo mobile de **controle de atendimento em filas**, desenvolvido com **Ionic + Angular** e Capacitor. Simula o fluxo completo de um laboratório médico — da emissão da senha pelo cliente até o atendimento no guichê.

# Funcionalidades

-Emissão de senhas (SP, SE, SG) com numeração automática no padrão 'YYMMDD-PPSQ'
-Painel de chamadas com as 5 últimas senhas chamadas
-Interface do atendente para acionar o próximo da fila
-Relatórios diários e mensais de atendimento

# Relatórios Gerados

- Quantidade de senhas emitidas e atendidas (geral e por tipo)
- Detalhamento por senha: número, tipo, horário de emissão, horário de atendimento e guichê
- Tempo médio de atendimento por tipo de senha
- Senhas descartadas (abandono ou fim de expediente).

# Regras de Negócio

- Expediente: **07h00 às 17h00** — senhas restantes são descartadas ao encerrar
- Qualquer guichê atende qualquer tipo de senha
- O painel exibe apenas as **5 últimas senhas chamadas**

# Tecnologias Utilizadas

Ionic Framework, Angular, Typescript e Node.js.

# Como Executar o Projeto
# Pré-requisitos:
Instalar dependências com:
npm install
Node.js e Ionic CLI;

Configurando e Rodando o Frontend (Ionic) Abra um novo terminal na pasta raiz do projeto MobileTicketsIonic. Inicie a aplicação no navegador com: ionic serve

# Estrutura do Projeto
src/
├── app/
│   ├── pages/        # Telas do app (totem, painel, atendente, relatórios)
│   ├── services/     # Lógica de negócio e gerenciamento de filas
│   └── models/       # Interfaces e tipos (Senha, Atendimento, etc.)
├── assets/
└── environments/

