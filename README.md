# Sample de importação xlsx para controle financeiro
requisitos:

```
ter o node instalado
ter docker-compose instalado

Executar os comandos abaixo na pasta do projeto
    docker-compose up
    npm install 
    .\node_modules\.bin\sequelize.cmd db:create
    .\node_modules\.bin\sequelize.cmd db:create --env test
    .\node_modules\.bin\sequelize.cmd db:migrate
    .\node_modules\.bin\sequelize.cmd db:migrate --env test
    node app.js
```
Endpoint disponível `post /import`, `post /test`