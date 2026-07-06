# Controle de Gastos Residenciais 💰

O sistema permite o gerenciamento de pessoas e suas transações financeiras (receitas e despesas), gerando um relatório consolidado de totais.

## 🚀 Tecnologias Utilizadas

**Back-end:**
* .NET 10.0.109 (C#)
* Entity Framework Core
* PostgreSQL
* Arquitetura baseada em N-Tier (Controllers, Services, Repositories/Data)

**Front-end:**
* React + Vite
* TypeScript
* Axios

## 🧠 Decisões de Arquitetura e Boas Práticas

Durante o desenvolvimento, priorizei a qualidade e a legibilidade do código adotando as seguintes práticas:
* **Uso de DTOs (Data Transfer Objects):** Para evitar a exposição direta das entidades de banco de dados e garantir que apenas os dados necessários transitem pela rede.
* **Inversão de Dependência (SOLID):** Uso de Interfaces para os serviços no back-end, facilitando testes futuros e diminuindo o acoplamento.
* **Validações de Regra de Negócio no Back-end:** Regras de negócio, como o bloqueio de receitas para menores de 18 anos e a exclusão em cascata, estão garantidas na API e no banco de dados, protegendo a integridade do sistema.
* **Tipagem Estrita (TypeScript):** Espelhamento dos DTOs no Front-end para garantir previsibilidade e evitar erros em tempo de execução.

---

## 🛠️ Como rodar o projeto localmente

### Pré-requisitos
* [.NET 10.0.109 SDK](https://dotnet.microsoft.com/download)
* [Node.js](https://nodejs.org/) (versão 18 ou superior, versão usada no projeto: 24.13.0)
* [PostgreSQL](https://www.postgresql.org/) rodando localmente

### 1. Configurando e Rodando o Back-end
1. Navegue até a pasta do back-end:
   ```bash
   cd ControleGastosApi
   ```
   
2. Abra o arquivo `appsettings.json` e altere a string de conexão `DefaultConnection` com a senha do seu usuário do PostgreSQL.

3. Crie o banco de dados e as tabelas usando as migrations do EF Core:
    ```
    dotnet ef database update
    ```

4. Inicie o servidor:
    ```
    dotnet run
    ```
    Anote a porta em que a API está rodando (ex: http://localhost:5000).

### 2. Configurando e Rodando o Front-end
1. Abra um novo terminal e navegue até a pasta do front-end:
    ```
    cd controle-gastos-web
    ```

2. Instale as dependências do projeto:
    ```
    npm install
    ```

3. Verifique o arquivo {src/services/api.ts} e confirme se a {baseURL} aponta para a mesma porta em que o back-end está rodando.

4. Inicie a aplicação web:
    ```
    npm run dev
    ```

5. Acesse o link gerado no terminal (geralmente http://localhost:5173) no seu navegador.