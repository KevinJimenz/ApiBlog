import { error } from "console";
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
  const images = []
  await Promise.all(
    list.map(async (element) => {
      const nombreFoto = element.dataValues.photo.replace(/^.*[\\/]/, ""); // Solo uso el nombre con el que se guardó la imagen
      const ruta_api = "./uploads/publications/" + nombreFoto; // Construye la ruta completa de la imagen
      try {
        await fs.promises.access(ruta_api); // Verifica si el archivo existe
        images.push(path.resolve(ruta_api)); // Guarda la ruta en el arreglo de imágenes
      } catch (error) {
        return res.status(404).send({ error: error.message });
      }
    })
  );
  res.status(200).send({images})
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
