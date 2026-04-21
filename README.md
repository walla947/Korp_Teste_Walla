#  Korp Teste - Sistema de Emissão de Notas Fiscais

Sistema completo de emissão de notas fiscais desenvolvido como teste técnico para a Korp ERP.

##  Tecnologias utilizadas

### Frontend
- Angular 21
- Angular Material
- TypeScript
- RxJS

### Backend
- C# com ASP.NET Core 9
- Entity Framework Core
- Arquitetura de Microsserviços

### Banco de dados
- PostgreSQL (via Docker)

### Infraestrutura
- Docker e Docker Compose

##  Funcionalidades

- ✅ Cadastro de produtos com código, descrição e saldo
- ✅ Cadastro de notas fiscais com numeração sequencial
- ✅ Adição de múltiplos produtos em uma nota
- ✅ Impressão de notas fiscais com atualização de status
- ✅ Desconto automático do saldo dos produtos ao imprimir
- ✅ Tratamento de falhas entre microsserviços

## 🏗️ Arquitetura

O sistema é composto por dois microsserviços:

- **EstoqueService** (porta 5003) → gerencia produtos e saldos
- **FaturamentoService** (porta 5168) → gerencia notas fiscais e comunica com o EstoqueService

##  Como rodar

### Pré-requisitos
- Docker Desktop
- .NET 9 SDK
- Node.js 24+
- Angular CLI

### Passo a passo

1. Clone o repositório
2. Suba o banco de dados:
```bash
docker-compose up -d
```
3. Rodar o EstoqueService:
```bash
cd EstoqueService
dotnet run
```
4. Rodar o FaturamentoService:
```bash
cd FaturamentoService
dotnet run
```
5. Rodar o frontend:
```bash
cd frontend
ng serve
```
6. Acesse **http://localhost:4200**