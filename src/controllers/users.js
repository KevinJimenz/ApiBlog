import { usersModel } from "../models/users.js";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
// ? Get all
export const list = async (req, res) => {
  const list = await usersModel.findAll();
  res.send({ list });
};

// ? Crete
export const create = async (req, res) => {
  // Recibo los valores por parametros
  const name = req.params.name;
  const email_address = req.params.email;
  const pass = req.params.pass;
  // Este valor llega por el body
  const file = req.file.path; // Envio la path del archivo
  const password = encriptarPassword(pass); // Encripto la password
  const newUser = await usersModel.create({
    name,
    email_address,
    password,
    photo: file
  });
  if (newUser) {
    res.send({ message: "User Created" });
  } else {
    res.send({ message: "Error", error: newUser });
  }
};

// ? Edit
export const edit = async (req, res) => {
  const { name, email_address, password, photo } = req.body;
  const editUser = await usersModel.findByPk(req.params.id);
  if (editUser) {
    editUser.name = name;
    editUser.email_address = email_address;
    editUser.password = password;
    editUser.photo = photo;
    await editUser.save();
    res.send({ status: "OK", answer: "Usuario Editado" });
  } else {
    res.send({ status: "Error", answer: "El id no se encuentra" });
  }
};

// ? Delete
export const destroy = async (req, res) => {
  const deleteUser = await usersModel.findByPk(req.params.id);
  if (deleteUser) {
    await deleteUser.destroy();
    res.send({ status: "OK", answer: "Usuario Eliminado" });
  } else {
    res.send({ status: "Error", answer: "El id no existe" });
  }
};

// ? Allow enter
export const validateCredentials = async (req, res) => {
  const email = req.params.email;
  const pass = req.params.pass;
  const infoUser = await usersModel.findOne({
    where: { email_address: email },
  });
  const validatePassword = compararPassword(pass, infoUser.password);
  if (validatePassword) {
    res.send({ username: infoUser.name, rol: infoUser.rol, photo: infoUser.photo });
  } else {
    res.send({ message: "Incorrect Credentials" });
  }
};

// ? bring photo
export const bringFile = async (req, res) => {
  const photo = req.params.file;
  const ruta_api = './uploads/' + photo ;
  fs.access(ruta_api, (error) => {
    if (!error) {
      return res.sendFile(path.resolve(ruta_api));
    } else {
      res.status(404).send({
        status: "error",
        mensaje: "no existe la imagen",
        error,
        photo,
        ruta_api,
      });
    }
  });
};

/**
 * @param {string} pass, Ingresa la cadena de texto que el usuario usa como password
 * @returns retorna la cadena encriptada
 */
function encriptarPassword(pass) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(pass, salt);
}
/**
 * @param {string} pass, contraseña enviada por el usuario
 * @param {string} hashPass, contraseña hasheada que esta almacenada en la base de datos
 * @return true si la contraseña es correcta
 */
function compararPassword(pass, hashPass) {
  const isCorrectPass = bcrypt.compareSync(pass, hashPass);
  return isCorrectPass;
}
