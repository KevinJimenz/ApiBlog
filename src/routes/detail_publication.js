// ? Indico que se van a usar rutas
import { Router } from "express";
// ? Llamo a los crud
import { 
    list,
    create,
    edit,
    destroy }
     from "../controllers/detail_publication.js";
const detail_publication = Router();
// ? se hacen las rutas con sus respectivas peticions http
detail_publication.get("/listar/detailPublication",list) ;
detail_publication.post("/crear/detailPublication/:idComment/:idPublication",create) ;
detail_publication.delete("/eliminar/detailPublication/:id",destroy) ;
detail_publication.put("/editar/detailPublication/:id",edit) ;
// ? Se exporta 
export {detail_publication}