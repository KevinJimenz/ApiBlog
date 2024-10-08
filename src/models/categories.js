import { DataTypes } from "sequelize"; // Importo los tipos de datos de sequelize
import { sequelize } from "./db.js"; // Importo la conexion a la base de datos
// ? Si en la base de datos la tabla en el campo ( id )
// ? Es AUTO_INCREMENT, en el modelo hay que especificar es verdadero
export const categoriesModel = sequelize.define("categories",{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
    }
},
{
  // Esto desactiva la creación automática de las columnas createdAt y updatedAt
  timestamps: false 
});
