import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config() // Configuraciond de las variables globales

// Instanciar la clase sequelize y le pasamos los parametros de conexion
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD, 
  {
  host: process.env.DB_HOST,
  dialect: "mysql" //ojo el dialecto define el gestor de base de datos, recordar descargar el driver
});

sequelize.authenticate()
  .then(() => {
    console.log("conexion exitosa");
  })
  .catch((error) => {
    console.log("error en la conexion", error);
  });
