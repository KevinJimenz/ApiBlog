import { Router } from "express"; // Indico que se van a usar rutas
import { 
    list,
    bringDetailPublication,
    create,
    edit,
    destroy }
     from "../controllers/detail_publication.js";
const detail_publication = Router();
// ? rutas con sus respectivas peticions http
detail_publication.get("/listar/detailPublication",list) ;
detail_publication.get("/TraerDetalle/detailPublication",bringDetailPublication) ;
detail_publication.post("/crear/detailPublication/:idComment/:idPublication",create) ;
detail_publication.delete("/eliminar/detailPublication/:id",destroy) ;
detail_publication.put("/editar/detailPublication/:id",edit) ;

export {detail_publication}