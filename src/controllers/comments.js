import {commentsModel} from '../models/comments.js';

// ? Get all
export const list = async (req,res)=>{
    const list = await commentsModel.findAll();
    res.send({list})
};

export const BringLastComment = async (req, res) => {
  try {
      const lastComment = await commentsModel.findOne({
          order: [['id', 'DESC']] 
      });
      res.send({ lastComment });
  } catch (error) {
      res.status(500).send({ error: 'Ocurrió un error al obtener el último comentario.' });
  }
};

// ? Create
export const create = async (req,res)=>{
    const description = req.params.description ;
    const id_User = req.params.idUser ;
    const newComment = await commentsModel.create({
      description,
      id_User,
    })
    res.send({newComment})
};

// ? Edit
export const edit = async (req,res)=>{
  const {description, id_User} = req.body ;
    const editComment = await commentsModel.findByPk(req.params.id);
    if ( editComment )
      {
        editComment.description = description ;
        editComment.id_User = id_User;
        await editComment.save() ;
        res.send({ status: "OK", respuesta: "Comentario editado Correctamente"})
      } else{
        res.send({ status: "Error", respuesta: "Id no encontrado"})
      }
};

// ? Delete
export const destroy = async (req,res)=>{
    const deleteComment = await Comentario.findByPk(req.params.id);
    if ( deleteComment )
      {
        await deleteComment.destroy() ;
        res.send({ status: "OK", respuesta: "Eliminado Correctamente"})
      } else{
        res.send({ status: "Error", respuesta: "Id no encontrado"})
      }
};
