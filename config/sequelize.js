let Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'db_challenge', //DB
    'root', // USER
    '', //PASSWORD
    {
        dialect: 'mysql',
        host : 'localhost',
        logging: console.log,
        define: {
            timestamps: false
        }
    }
);
module.exports = sequelize;