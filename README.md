# Personal Blog API

API desenvolvida como projeto pessoal com foco em **boas práticas de engenharia de software**, arquitetura limpa, segurança e testes automatizados. O projeto simula o backend de um blog pessoal, com cadastro de usuários, autenticação e controle de acesso, servindo como base sólida para aplicações reais.

Este repositório foi utilizado também como **exercício técnico**, demonstrando domínio de backend moderno com Node.js/NestJS, testes, validação e organização de código.

---

## Funcionalidades

### Usuários
- Cadastro de usuários
- Validação de dados de entrada
- Prevenção de usuários duplicados
- Criptografia de senha

### Autenticação
- Login com usuário e senha
- Autenticação baseada em JWT
- Proteção de rotas

### Arquitetura
- Separação clara de camadas (Controller, Service, Repository)
- Uso de DTOs para entrada e saída de dados
- Validações com `class-validator`
- Padrões aplicados visando escalabilidade e manutenibilidade

### Testes
- Testes **end‑to‑end (E2E)** cobrindo os principais fluxos
- Testes automatizados com Jest e Supertest
- Ambiente de testes isolado com SQLite

---

## Tecnologias Utilizadas

- **Node.js**
- **NestJS**
- **TypeScript**
- **TypeORM**
- **JWT (Json Web Token)**
- **SQLite / MySQL**
- **Jest**
- **Supertest**

---

## Estrutura do Projeto

```
src/
├── app.module.ts
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── jwt.strategy.ts
├── usuarios/
│   ├── usuario.controller.ts
│   ├── usuario.service.ts
│   ├── usuario.entity.ts
│   └── dto/
├── common/
│   ├── guards
│   └── decorators
└── main.ts
```

---

## Como Executar o Projeto

### Pré‑requisitos
- Node.js 18+
- NPM ou Yarn

### Instalação

```bash
npm install
```

### Executar em ambiente de desenvolvimento

```bash
npm run start:dev
```

A aplicação estará disponível em:
```
http://localhost:3000
```

---

## Executar Testes

```bash
npm run test:e2e
```

Os testes validam:
- Cadastro de usuário
- Validações
- Fluxos de erro

---

## Objetivo do Projeto

Este projeto foi criado com o objetivo de:

- Consolidar fundamentos de backend
- Demonstrar organização e clareza de código
- Aplicar testes como parte essencial do desenvolvimento
- Servir como base para evoluções futuras (posts, comentários, perfis, etc.)

---

## Autor

Desenvolvido por **João Henrique** — Desenvolvedor de Software

> Código limpo, bem testado e com propósito.

