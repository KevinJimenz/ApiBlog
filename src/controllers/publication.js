import { publicationModel } from "../models/publication.js";
import fs from 'fs';
import path from "path";
// ? Get all Publications
export const list = async (req, res) => {
  const list = await publicationModel.findAll();
  res.send({list});
};

// ? Get only the publication's photo
export const getPhoto = async (req, res ) => {
  const photo = req.params.file;
  const ruta_api = './uploads/publications/' + photo ;
  fs.access(ruta_api, (error) => {
    if (!error) {
      return res.sendFile(path.resolve(ruta_api));
    } else {
      res.status(404).send({
        status: "error",
        mensaje: "no existe la imagen",
        error
      });
    }
  });
}

// ? Crete a Publication
export const create = async (req, res) => {
  const title = req.params.title;
  const description = req.params.description;
  const category = req.params.id;
  const file = req.file.path;
  const newPublication = await publicationModel.create({
    title,
    description,
    photo: file,
    id_Category: category,
  });
  if (newPublication) {
    res.status(200).send({ message: "Publication Created" });
  } else {
    res.status(400).send({ message: "Error in the request" });
  }
};

// ? Edit a Publication
export const edit = async (req, res) => {
  const id = req.params.id;
  const title = req.params.title;
  const description = req.params.description;
  const idCategory = req.params.idCategory;
  const file = req.file.path;
  const editPublication = await publicationModel.findByPk(id);
  if (editPublication) {
    editPublication.title = title;
    editPublication.description = description;
    editPublication.photo = file;
    editPublication.id_Category = idCategory;
    await editPublication.save();
    res.send({ status: "OK", answer: "Publicacion Editada" });
  } else {
    res.send({ status: "Error", answer: "El id no se encuentra" });
  }
};

// ? Delete a Publication
export const destroy = async (req, res) => {
  const id = req.params.id;
  const deletePublication = await publicationModel.findByPk(id);
  if (deletePublication) {
    await deletePublication.destroy();
    res.send({ status: "OK", answer: "Publicacion Eliminada" });
  } else {
    res.send({ status: "Error", answer: "El id no existe" });
  }
};
