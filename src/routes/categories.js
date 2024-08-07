// ? Indico que se van a usar rutas
import { Router } from "express";
// ? Llamo a los crud
import { 
    list,
    create,
    edit,
    destroy }
     from "../controllers/categories.js";
const categories = Router();
// ? se hacen las rutas con sus respectivas peticions http
categories.get("/listar/categories",list) ;
categories.post("/crear/categories",create) ;
categories.delete("/eliminar/categories/:id",destroy) ;
categories.put("/editar/categories/:id",edit) ;
// ? Se exporta 
export {categories}