// ? Indico que se van a usar rutas
import { Router } from "express";
// ? Llamo a los crud
import { 
    list,
    create,
    edit,
    destroy }
     from "../controllers/comments.js";
const comments = Router();
// ? se hacen las rutas con sus respectivas peticions http
comments.get("/listar/comments",list) ;
comments.post("/crear/comments",create) ;
comments.delete("/eliminar/comments/:id",destroy) ;
comments.put("/editar/comments/:id",edit) ;
// ? Se exporta 
export {comments}