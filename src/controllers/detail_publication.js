import {detail_publicationModel} from "../models/detail_publication.js" ;
// Modelos relacionados
import {commentsModel} from '../models/comments.js'
import { publicationModel } from "../models/publication.js";
// ? Get all  
export const list = async (req, res) =>{
    const list = await detail_publicationModel.findAll();
    res.send({list})
}

export const bringDetailPublication = async (req, res) =>{
    const list = await detail_publicationModel.findAll({
        // Creo un arreglo de objetos el cual va a tener los modelos relacionados
        include: [
            {
                model: commentsModel,
                required: true,  // Esto asegura que traiga la informacion que este asociada
            },
            {
                model: publicationModel,
                required: true,  
            }
        ]
    });
    res.send({list})
}

// ? Crete 
export const create = async (req,res) =>{
    try {
        const idComment = req.params.idComment;
        const idPublication = req.params.idPublication;
        const newDetail_Publication = await detail_publicationModel.create({
            id_Comment: idComment,
            id_Publication: idPublication,
        });
        res.send({ status: "OK" , message: "Detail publication created"});
    }
    catch(error){
        res.send({ status: "Error" , message: error});
    }
}

// ? Edit 
export const edit = async (req,res) =>{
    const {id_Comment, id_Publication} = req.body;
    const editDetail_publication = await detail_publicationModel.findByPk(req.params.id);
    if ( editDetail_publication )
        {
            editDetail_publication.id_Comment = id_Comment ;
            editDetail_publication.id_Publication = id_Publication ;
            await editDetail_publication.save();
            res.send({ status: "OK", answer: "Detalle publicacion Editado"});
        } else{
            res.send({ status: "Error", answer: "El id no se encuentra"});
        }
}

// ? Delete 
export const destroy = async (req,res) =>{
    const deleteDetail_publication = await detail_publicationModel.findByPk(req.params.id);
    if ( deleteDetail_publication )
        {
            await deleteDetail_publication.destroy();
            res.send({ status: "OK", answer: "Detalle publicacion Eliminado"});
        } else{
            res.send({ status: "Error", answer: "El id no existe"});
        }
}
