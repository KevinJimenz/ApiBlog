// ? Indico que se van a usar rutas
import { Router } from "express";
// ? Llamo a los crud
import { 
    list,
    create,
    edit,
    destroy }
     from "../controllers/publication.js";
const publication = Router();
// ? se hacen las rutas con sus respectivas peticions http
publication.get("/listar/publication",list) ;
publication.post("/crear/publication",create) ;
publication.delete("/eliminar/publication/:id",destroy) ;
publication.put("/editar/publication/:id",edit) ;
// ? Se exporta 
export {publication}