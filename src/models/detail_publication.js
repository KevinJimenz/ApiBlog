import { DataTypes } from "sequelize"; // Importo los tipos de datos de sequelize
import { sequelize } from "./db.js"; // Importo la conexion a la base de datos
// ? Si en la base de datos la tabla en el campo ( id )
// ? Es AUTO_INCREMENT, en el modelo hay que especificar es verdadero
export const detail_publicationModel = sequelize.define("detail_publication", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  id_Comment: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_Publication:{
    type: DataTypes.INTEGER,
    allowNull: false,
  }
},
{
  // Esto desactiva la creación automática de las columnas createdAt y updatedAt
  timestamps: false 
});;

