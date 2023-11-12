const { Sequelize } = require("sequelize");
const { DB_HOST, DB_DB, DB_NAME, DB_PASSWORD, DB_PORT } = require("../config");
require('../config')

const sequelize = new Sequelize(DB_DB, DB_NAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    ssl: false,
    sync:false,
    logging: false,
    port: Number(DB_PORT)
});

module.exports = sequelize