 # MobileTicketsIonic

Aplicativo mobile de **controle de atendimento em filas**, desenvolvido com **Ionic + Angular** integrado via Capacitor e um servidor construído em Node.js, Simula o fluxo completo de um laboratório médico — da emissão da senha pelo cliente até o atendimento no guichê.

## Funcionalidades

-Emissão de senhas (SP, SE, SG) com numeração automática no padrão `YYMMDD-PPSQ`
-Painel de chamadas com as 5 últimas senhas chamadas
-Interface do atendente para acionar o próximo da fila
-Relatórios diários e mensais de atendimento

Tecnologias Utilizadas

Frontend: Ionic Framework, Angular e TypeScript. Backend: Node.js.

Como Executar o Projeto Localmente Pré-requisitos: Node.js e Ionic CLI instalados.

# Instalar dependências
npm install

# Rodar no navegador
ionic serve

## Estrutura do Projeto
src/
├── app/
│   ├── pages/        # Telas do app (totem, painel, atendente, relatórios)
│   ├── services/     # Lógica de negócio e gerenciamento de filas
│   └── models/       # Interfaces e tipos (Senha, Atendimento, etc.)
├── assets/
└── environments/

## Imagens

![Teçao]
