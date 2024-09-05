import { Router } from "express"; // Indico que se van a usar rutas

import { 
    list,
    create,
    edit,
    destroy }
     from "../controllers/categories.js";
const categories = Router();
// ? rutas con sus respectivas peticions http
categories.get("/listar/categories",list) ;
categories.post("/crear/categories",create) ;
categories.delete("/eliminar/categories/:id",destroy) ;
categories.put("/editar/categories/:id",edit) ;

export {categories}