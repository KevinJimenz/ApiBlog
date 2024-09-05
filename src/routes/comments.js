import { Router } from "express"; // Indico que se van a usar rutas

import { list, create, edit, destroy } from "../controllers/comments.js";
const comments = Router();

// ? rutas con sus respectivas peticions http
comments.get("/listar/comments", list);
comments.post("/crear/comments/:description/:idUser", create);
comments.delete("/eliminar/comments/:id", destroy);
comments.put("/editar/comments/:id", edit);

export { comments };
