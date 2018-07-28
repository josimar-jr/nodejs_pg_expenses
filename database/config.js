const Sequelize = require('sequelize');

const config = {
    "server": "localhost",
    "driver": "postgres",
    "user": "postgres",
    "port": "5434",
    "database": "postgres",
    "password": "senha_postgres"
};

const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        host: config.server,
        port: config.port,
        dialect: 'postgres',
        isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
        pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
        }
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });