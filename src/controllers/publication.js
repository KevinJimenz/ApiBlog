import { publicationModel } from "../models/publication.js";
import fs from "fs";
import path from "path";

// ? Get all Publications
export const list = async (req, res) => {
  const list = await publicationModel.findAll();
  res.send({list});
};

// ? Get only the photos
export const listPhotos = async (req, res) => {
  const list = await publicationModel.findAll();
  const images = list.map((element) => {
    const nombreFoto = element.photo.replace(/^.*[\\/]/, ""); // Solo uso el nombre con el que se guardó la imagen
    const ruta_api = path.join("./uploads/publications/", nombreFoto); // Construye la ruta completa de la imagen
    // Verificar si el archivo existe en la ruta especificada
    if (fs.existsSync(ruta_api)) {
      // Si el archivo existe, devuelve la ruta relativa para acceder a la imagen
      return `/uploads/publications/${nombreFoto}`;
    } 
    else 
    {
      // Si el archivo no existe, devuelve un objeto de error con el nombre de la foto
      return { status: "error", nombreFoto };
    }
  });
    res.send(images);
};

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
  const { title, description, photo, id_Category } = req.body;
  const editPublication = await publicationModel.findByPk(req.params.id);
  if (editPublication) {
    editPublication.title = title;
    editPublication.description = description;
    editPublication.photo = photo;
    editPublication.id_Category = id_Category;
    await editPublication.save();
    res.send({ status: "OK", answer: "Publicacion Editada" });
  } else {
    res.send({ status: "Error", answer: "El id no se encuentra" });
  }
};

// ? Delete a Publication
export const destroy = async (req, res) => {
  const deletePublication = await publicationModel.findByPk(req.params.id);
  if (deletePublication) {
    await deletePublication.destroy();
    res.send({ status: "OK", answer: "Publicacion Eliminada" });
  } else {
    res.send({ status: "Error", answer: "El id no existe" });
  }
};
