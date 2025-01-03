// backend/config/database.js
const config = require("./index");

module.exports = {
  development: {
    username: "root",
    password: "",
    database: "database_development",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    use_env_variable: "DATABASE_URL", 
    dialect: "mysql",
  },
//   production: {
//     // username: process.env.DB_USERNAME,
//     // password: process.env.DB_PASSWORD,
//     // database: process.env.DB_DATABASE,
//     // host: process.env.DB_HOST,
//     use_env_variable: "DATABASE_URL",
//     dialect: "mysql",
//   },


// production: {
//   use_env_variable: 'DATABASE_URL',
//   dialect: 'postgres',
//   seederStorage: 'sequelize',
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false
//     }
//   },
//   define: {
//     schema: process.env.SCHEMA
//   }
// }

};
