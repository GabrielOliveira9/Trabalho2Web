# Trabalho2Web
Segundo trabalho do primeiro bimestre da matéria de Programação Avançada para WEB. 

Implementação de um sistema de agenda, com funcionalidades de CRUD (Create, Read, Update, Delete).

# Rotas e funcionalidades implementadas:
* **GET `/registers`:** Retorna a lista de registros existentes.
* **POST `/registers`:** Cria um novo registro.
* **PUT `/registers/:id`:** Atualiza os dados de um registro específica.
* **DELETE `/registers/:id`:** Remove um registro específico.
* **POST `/auth`:** Cria um novo usuário autenticado.
# Validação e testagem
Foram implementadas funcionalidades de validação e testagem. Na pasta _/hooks/functions/schedule_ e no arquivo _test_, respectivamente.
# Instalação
Após abrir a pasta na IDE, digite a seguintes linha no terminal ara instalar todas as bibliotecas, frameworks e plugins:
```
npm install
```
# Configuração
O arquivo _.env.sample_ deve ser renomeado para _.env_ e suas propriedades devem ser alteradas para que estejam de acordo com as que você irá usar.
# Inicialização
O comando a seguir deve ser digitado no terminal para inicializar o ambiente:
```
npm run dev
```
# Testagem
## Criação dos registros
Para executar os testes, devem ser criadas no banco de dados as entradas representadas nos arquivos `dositio.categories.json` e `dositio.products.json`.
## Execução dos testes
Para executar a sequência de testes, o comando a seguir deve ser digitado no terminal:
```
npm run test
```
## Repetição da testagem
Para realizar uma nova testagem, deve garantir-se de que os registros estão novamente iguais ao seu respectivo arquivo JSON. 
