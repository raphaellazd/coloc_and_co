import * as emailValidator from "email-validator";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { manageResponse } from "../controllerHelper/manageResponse.js";
import { colocationDataMapper, userDataMapper } from "../datamappers/index.js";
import colocationController from "./colocationController.js";

const userController = {
  loginUser: async (req, res) => {
    const { result, error } = await userDataMapper.getCredentials(req.body);
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Erreur Serveur" });
    }
    if (!error && !result) {
      return res
        .status(401)
        .json({ message: "L'email ou le mot de passe est incorrect." });
    }
    // const isPasswordValid = result.password === req.body.password;
    const isPasswordValid = bcrypt.compare(result.password, req.body.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "L'email ou le mot de passe est incorrect." });
    }
    // res.status(200).json(result);
    const token = jwt.sign(
      {
        userId: result.id,
        colocId: result.colocation_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );
    res.status(200).json({
      token,
      logged: true,
      user: {
        userId: result.id,
        colocId: result.colocation_id,
        firstname: result.firstname,
        lastname: result.lastname,
        birthdate: result.birthdate,
        phoneNumber: result.phone_number,
        email: result.email,
        description: result.description,
        emergencyName: result.emergency_name,
        emergencyLink: result.emergency_link,
        emergencyNumber: result.emergency_number,
        profession: result.profession,
        avatar_file: result.avatar_file,
      },
    });
  },

  // Create an user AND a new colocation group
  createUserAndColoc: async (req, res) => {
    try {
      console.log("ehufhueefduiheuf", req.body);
      const { groupName, email, password, confirmPassword } = req.body;
      const codeColoc = uuidv4().slice(0, 6);

      if (!groupName || !email || !password || !confirmPassword) {
        return res
          .status(401)
          .json({ message: "Veuillez renseignez tous les champs." });
      }
      // Check email with email-validator package
      if (!emailValidator.validate(email)) {
        return res.status(401).json("Cet email n'est pas valide");
      }
      // verifier si password correspond à password confirm
      if (password !== confirmPassword) {
        return res.status(401).json("Les mots de passe ne correspondent pas");
      }
      // bcrypt
      const saltRounds = Number(process.env.SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const response1 = await colocationDataMapper.createColoc(
        groupName,
        codeColoc
      );
      const colocId = response1.id;
      const response2 = await userDataMapper.createUser(
        email,
        hashedPassword,
        colocId
      );
      res.status(200).json({
        message: `L'utilisateur a bien créé la coloc '${groupName}'. Le code d'accès est ${codeColoc}.`,
        userId: response2.id,
        colocId,
        createdColocation: true,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Create an user AND join a colocation group
  createUserAndJoinColoc: async (req, res) => {
    try {
      console.log("ehufjheuhufe", req.body);
      const { codeColoc, email, password, confirmPassword } = req.body;

      if (!codeColoc || !email || !password || !confirmPassword) {
        return res
          .status(401)
          .json({ message: "Veuillez renseignez tous les champs." });
      }
      // Check email with the package email-
      if (!emailValidator.validate(email)) {
        return res.status(401).json("Cet email n'est pas valide");
      }
      // verifier si password correspond à password confirm
      if (password !== confirmPassword) {
        return res.status(401).json("Les mots de passe ne correspondent pas");
      }
      // bcrypt
      const saltRounds = Number(process.env.SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const response1 = await colocationDataMapper.getCodeOfColoc(codeColoc);
      if (!response1) {
        return res.status(401).json("Le code n'est pas valide");
      }
      const colocId = response1.id;
      const response2 = await userDataMapper.createUser(
        email,
        hashedPassword,
        colocId
      );
      res.status(200).json({
        message: `L'utilisateur a bien rejoint la coloc '${response1.group_name}'. Le code d'accès est ${codeColoc}.`,
        userId: response2.id,
        colocId,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Get all users registered in a colocation
  getAllUsersFromColoc: async (req, res, next) => {
    const { result, error } = await userDataMapper.getUsers(req.user.colocId);
    if (error) {
      console.log(error);
      next(error);
    } else {
      console.log("getAllUsersFromColoc =>", result);
      res.status(200).json({ result });
    }
  },

  getLoggedUser: async (req, res) => {
    console.log(req.user);
    const result = await userDataMapper.getLoggedUser(req.user.userId);
    // manageResponse(res, result, error, next);
    console.log("getLoggedUser =>", result);
    res.status(200).json(result);
  },

  // Get an user and its infos by its user id
  getUserFromColoc: async (req, res) => {
    // console.log(req.params);
    const result = await userDataMapper.getOneUserFromColoc(
      req.params.user_id,
      req.user.colocId
    );
    // manageResponse(res, result, error, next);
    res.status(200).json(result);
    console.log("getUserFromColoc =>", result);
  },

  updateUser: async (req, res) => {
    console.log("ehiuheuhfue", req.body);
    // pour l'id puisque pas connecté soit un
    // champs caché dans le body soit dans le header
    const { result, error } = await userDataMapper.updateProfile(
      req.body,
      req.user.userId
    );
    console.log(req.user.userId);
    if (error) {
      console.error(error);
    } else {
      console.log("Profile successfully updated!");
      res.status(200).json({ result, createdProfile: true });
    }
  },

  // Method to delete an user from DB
  deleteUser: async (req, res, next) => {
    // console.log(req.params);
    const { result, error } = await userDataMapper.deleteOneUser(
      req.params.user_id
    );
    res
      .status(204)
      .json({ message: `Élément d'id  ${req.params.user_id} supprimé` });

    manageResponse(error, next);
  },

  uploadAvatar: async (req, res) => {
    if (!req.file) {
      return res
        .status(413)
        .json({ message: "File not uploaded! Attach jpeg/png < 5mo" });
    }
    req.body.filePath = req.file.path;
    console.log(req.file.path);
    const { result, error } = await userDataMapper.updateProfile(
      req.body,
      req.user.userId
    );
    if (error) {
      console.log(error);
    } else {
      console.log("result =>", result);
      res.status(201).json({ message: "File uploaded successfully" });
    }
  },
};

export default userController;
