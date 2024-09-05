import { Router } from "express"; // Indico que se van a usar rutas
import multer from "multer"; // Importo el multer para el almacenamiento de las imagenes

import { 
    list,
    getPhoto,
    create,
    edit,
    destroy }
     from "../controllers/publication.js";

const publication = Router();

// Configurar el almacenamiento con diskStorge
const almacenamiento = multer.diskStorage({
    // Configurar el directorio de destino para las imagenes
    destination: function(req, file, cb)  {
      cb(null, "uploads/publications")
    },
    // Configura el nombre del archivo
    filename: function(req, file, cb) {
      // Se va guardar como ( users-fecha Actual-nombre del archivo)
      cb(null, "publications" + '-' + Date.now() + '-' + file.originalname)
    },
  });
  
// Configura multer con el almacenamiento personalizado
const upload = multer({ storage: almacenamiento });

// ? rutas con sus respectivas peticions http
publication.get("/listar/publication",list) ;
publication.post("/traerFoto/publication/:file", getPhoto )
publication.post("/crear/publication/:title/:description/:id", upload.single("photo"),create) ;
publication.delete("/eliminar/publication/:id",destroy) ;
publication.put("/editar/publication/:id/:title/:description/:idCategory", upload.single("photo"),edit) ;
export {publication}