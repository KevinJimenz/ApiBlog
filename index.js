import express from 'express'
import cors from 'cors'
import dotenv from "dotenv" // Hace la configuracion de las variables globales para toda la aplicacion

// Modelos
import { detail_publicationModel } from './src/models/detail_publication.js'
import { commentsModel } from './src/models/comments.js'
import { publicationModel } from './src/models/publication.js'
import {sequelize} from "./src/models/db.js" // Conexion a base de datos

// Rutas
import {categories} from './src/routes/categories.js'
import {comments} from './src/routes/comments.js'
import {detail_publication} from './src/routes/detail_publication.js'
import {publication} from './src/routes/publication.js'
import {users} from './src/routes/users.js'

const app = express()

// Configuracion cors para evitar el "Cross-Origin Request Blocked" 'http://localhost:5173'
const corsOptions = {
  origin: '*', // Especifico la direccion de origen de la peticion
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Indico que peticiones http se van usar
  allowedHeaders: ['Content-Type', 'Authorization'], // Autoriza a los headers
  exposedHeaders: ['Access-Control-Allow-Origin'] // Expone el header Access-Control-Allow-Origin
};

// Configuracions App
dotenv.config();
app.use(cors(corsOptions)); // Indico que la app va a usar cors y al cors le paso la configuracion
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Primero toma la variable que tenemos definida en el archivo .ENV
 * Sino no hay un puerto por defecto toma el 3000
*/
const port = process.env.PORT || 3000;

// Relaciones 
detail_publicationModel.belongsTo(commentsModel, { foreignKey: 'id_Comment' })
commentsModel.hasMany(detail_publicationModel, { foreignKey: 'id_Comment' })

detail_publicationModel.belongsTo(publicationModel, { foreignKey: 'id_Publication' })
publicationModel.hasMany(detail_publicationModel, { foreignKey: 'id_Publication' })

// Rutas que la aplicacion va a usar 
app.use(categories); 
app.use(comments);
app.use(detail_publication);
app.use(publication);
app.use(users);

app.listen(port, () => {
  console.log(`Servidor encendido en puerto: ${port}`);
});

// sincronizacion de schemes y orm
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("sincronizacion ok!");
  })
  .catch((error) => {
    console.log(`error en la sincronizacion: ${error}`);
  });