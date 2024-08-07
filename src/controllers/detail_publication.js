import {detail_publicationModel} from "../models/detail_publication.js" ;

// ? Get all  
export const list = async (req, res) =>{
    const list = await detail_publicationModel.findAll();
    res.send({list})
}

// ? Crete 
export const create = async (req,res) =>{
    const {id_Comment, id_Publication} = req.body;
    const newDetail_Publication = await detail_publicationModel.create({
        id_Comment,
        id_Publication,
    });
    res.send({newDetail_Publication});
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
