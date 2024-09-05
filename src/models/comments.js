import { DataTypes } from "sequelize"; // Importo los tipos de datos de sequelize
import { sequelize } from "./db.js"; // Importo la conexion a la base de datos
// ? Si en la base de datos la tabla en el campo ( id )
// ? Es AUTO_INCREMENT, en el modelo hay que especificar es verdadero
export const commentsModel = sequelize.define("comments",{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_User:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id'
          }
    }
},
{
  // Esto desactiva la creación automática de las columnas createdAt y updatedAt
  timestamps: false 
});
