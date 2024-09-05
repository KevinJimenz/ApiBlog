import { Router } from "express"; // Indico que se van a usar rutas
import multer from "multer"; // Importo el multer para el almacenamiento de las imagenes

import {
  list,
  create,
  edit,
  destroy,
  bringFile,
  validateCredentials,
  bringId,
} from "../controllers/users.js";
const users = Router();

// Configurar el almacenamiento con diskStorge
const almacenamiento = multer.diskStorage({
  // Configurar el directorio de destino para las imagenes
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  // Configura el nombre del archivo
  filename: function (req, file, cb) {
    // Se va guardar como ( users-fecha Actual-nombre del archivo)
    cb(null, "users" + "-" + Date.now() + "-" + file.originalname);
  },
});
// Configura multer con el almacenamiento personalizado
const upload = multer({ storage: almacenamiento });

users.get("/listar/users", list);
// ? Por el upload es por donde va a llegar el archivo, se llama 'photo' porque con ese identificador se envia
users.post("/crear/users/:name/:email/:pass", upload.single("photo"), create);
users.delete("/eliminar/users/:id", destroy);
users.put("/editar/users/:id", edit);
users.post("/traerImagen/users/:file", bringFile);
users.post("/traerIdUser/users/:email", bringId);
users.get("/validarCredenciales/users/:email/:pass", validateCredentials);

export { users };
