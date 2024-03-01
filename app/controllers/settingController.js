import bcrypt from "bcrypt";
import { colocationDataMapper, userDataMapper } from "../datamappers/index.js";

const settingController = {
  getSettings: async (req, res) => {
    const result1 = await userDataMapper.getLoggedUser(req.user.userId);
    const result2 = await colocationDataMapper.getColocInfo(req.user.colocId);
    const settingInfo = { userInfo: result1, colocInfo: result2 };
    console.log("setting Ifn ", settingInfo);
    res.json({ settingInfo });
  },

  setSettings: async (req, res) => {
    try {
      console.log("req.body", req.body.settingInfo.colocInfo);
      const response = await userDataMapper.updateProfile(
        req.body.settingInfo.userInfo,
        req.user.userId
      );
      const response1 = await colocationDataMapper.updateColoc(
        req.body.settingInfo.colocInfo,
        req.user.colocId
      );
      console.log("response1", response1);
      res.status(200).json({
        message: "Successfully updated!",
        userInfo: response,
        colocInfo: response1,
      });
    } catch (error) {
      console.log(error);
    }
  },

  changePassword: async (req, res) => {
    if (
      !req.body.password ||
      !req.body.confirmPassword ||
      !req.body.newPassword
    ) {
      return res.json({ message: "Veuillez renseigner tous les champs." });
    }
    const result = await userDataMapper.getLoggedUser(req.user.userId);
    const isPasswordValid = result.password === req.body.password;
    // const isPasswordValid = bcrypt.compare(result.password, req.body.password);
    if (req.body.password !== req.body.confirmPassword || !isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Les mots de passes sont incorrects." });
    }
    const saltRounds = Number(process.env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, saltRounds);
    const result1 = userDataMapper.changePassword(
      hashedPassword,
      req.user.userId
    );
    res.status(200).json({ message: "New password successfully registered!" });
  },
};

export default settingController;
