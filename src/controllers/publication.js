import {publicationModel} from "../models/publication.js" ;

// ? Get all Publications 
export const list = async (req, res) =>{
    const list = await publicationModel.findAll();
    res.send({list})
}

// ? Crete a Publication
export const create = async (req,res) =>{
    const {title, description, photo, id_Category} = req.body;
    const newPublication = await publicationModel.create({
        title,
        description,
        photo,
        id_Category
    });
    res.send({newPublication});
}

// ? Edit a Publication
export const edit = async (req,res) =>{
    const {title, description, photo, id_Category} = req.body;
    const editPublication = await publicationModel.findByPk(req.params.id);
    if ( editPublication )
        {
            editPublication.title = title ;
            editPublication.description = description ;
            editPublication.photo = photo ;
            editPublication.id_Category = id_Category ;
            await editPublication.save();
            res.send({ status: "OK", answer: "Publicacion Editada"});
        } else{
            res.send({ status: "Error", answer: "El id no se encuentra"});
        }
}

// ? Delete a Publication
export const destroy = async (req,res) =>{
    const deletePublication = await publicationModel.findByPk(req.params.id);
    if ( deletePublication )
        {
            await deletePublication.destroy();
            res.send({ status: "OK", answer: "Publicacion Eliminada"});
        } else{
            res.send({ status: "Error", answer: "El id no existe"});
        }
}
