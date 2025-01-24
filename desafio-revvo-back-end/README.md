# Back-End

## Pré-requisitos
- **PHP**: v8.4.3
- **Composer**: Deve estar instalado na máquina para gerenciar as dependências do projeto.
- **PostgreSQL**: Deve estar instalado na máquina para o controle de dados.

Certifique-se de que a versão do PHP, PostgreSQL e o Composer estão corretamente configurados antes de prosseguir.

## Instalação
1. No terminal, navegue até o diretório do projeto.
2. Execute o comando abaixo para instalar as dependências:
   ```bash
   composer install
3. Navegue até a pasta `assets` para localizar o dump do banco de dados e restaure-o no banco de dados. (ex.: `pg_restore` para PostgreSQL).
4. Edite o arquivo `Database.php` para configurar as credenciais e o nome do banco de dados desejado. *(Observação: Um arquivo `.ENV` não foi utilizado para simplificar o projeto.)*

## Rodar o Projeto
1. Execute o comando `php -S localhost:8000 -t public`
