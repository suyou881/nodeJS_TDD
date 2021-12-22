const Sequelize = require('sequelize');
let sequelize = new Sequelize('postgres', 'postgres', '0000', {
        host: 'localhost',
        dialect: 'postgres',
        port: 5432,
        logging:false //기본값은 console.log 함수와 바안딩이 되어잇다.
        // dialectOptions: {
        //     ssl: {
        //         rejectUnauthorized: false
        //     }
        // }
    }
);

const User = sequelize.define('User',{
    // id:{
    //     type: Sequelize.INTEGER,
    //     primaryKey: true, // use "project_id" as a primary key
    //     autoIncrement: true // automatically increment the value
    // },
    name:{
        type: Sequelize.STRING,
        unique: true
    }
}, {
    createdAt: false, // disable createdAt
    updatedAt: false // disable updatedAt
});

module.exports={Sequelize, sequelize, User};