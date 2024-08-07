import { DataTypes } from "sequelize"; // Importo los tipos de datos de sequelize
import { sequelize } from "./db.js"; // Importo la conexion a la base de datos
// ? Si en la base de datos la tabla en el campo ( id )
// ? Es AUTO_INCREMENT, en el modelo hay que especificar es verdadero
export const usersModel = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_address:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
  }
},
{
  // Esto desactiva la creación automática de las columnas createdAt y updatedAt
  timestamps: false 
});

