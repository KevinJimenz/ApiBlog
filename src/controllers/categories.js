import {categoriesModel} from '../models/categories.js';

// ? Get All
export const list = async (req,res)=>{
  const list = await categoriesModel.findAll();
    res.send({list})
};

// ? Create Category
export const create = async (req,res)=>{
    const {description} = req.body ;
    const newCategory = await categoriesModel.create({
      description
    })
    res.send({newCategory})
};

// ? Edit
export const edit = async (req,res) =>{
  const {description} = req.body ;
  const editCategory = await categoriesModel.findByPk(req.params.id);
  if ( editCategory )
      {
          editCategory.description = description ;
          await editCategory.save();
          res.send({ status: "OK", answer: "Categoria Editada"});
      } else{
          res.send({ status: "Error", answer: "El id no se encuentra"});
      }
}

// ? Delete 
export const destroy = async (req,res)=>{
    // Todo: Primero se busca el id del rol y si se encuentra lo elimina
    // Todo: De lo contrario el id no fue encontrado
    const deleteCategory = await categoriesModel.findByPk(req.params.id);
    if ( deleteCategory )
      {
        await deleteCategory.destroy() ;
        res.send({ status: "OK", respuesta: "Eliminado Correctamente"})
      } 
    else
      {
        res.send({ status: "Error", respuesta: "Id no encontrado"})
      }
};