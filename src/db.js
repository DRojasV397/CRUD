const { Sequelize } = require('sequelize')
const Usuario = require('./Entities/Users')

module.exports = connectDB = async() => {
    Usuario.sequelize.sync()
    .then(() => {
        console.log('Base de datos y tablas sincronizadas');
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos:', error);
    }); 
}



