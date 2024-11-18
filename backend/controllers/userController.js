const User = require("../models/User");

module.exports = class userController {
  static async checkout(req, res) {
    const { phone, pix, datetime, location, eventId } = req.body;
    if (!phone || !pix || !datetime || !location || !eventId) {
      return res
        .status(422)
        .json({ message: "Todos os campos são obrigatórios!" });
    }
    try {
      const userExists = await User.findOne({ phone: phone });
      if (!userExists) {
        return res.status(422).json({
          message:
            "Telefone não encontrado, verifique se digitou corretamente!",
        });
      }

      userExists.pix = pix;
      userExists.datetimecheckout = datetime;
      userExists.locationcheckout = location;
      userExists.eventId = eventId;
      await userExists.save();
      res.status(200).json({ message: "Checkout realizado com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ocorreu um erro ao realizar o checkout." });
    }
  }

  static async register(req, res) {
    const { name, phone, location, datetime, eventId } = req.body;

    // Validações
    if (!name || !phone || !location || !datetime || !eventId) {
      return res
        .status(422)
        .json({ message: "Todos os campos são obrigatórios!" });
    }

    const user = new User({ name, phone, location, datetime, eventId });

    try {
      await user.save();
      res.status(200).json({ message: "Check in registrado!" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json({ users });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  static async getAllUsersByEvent(req, res) {
    const { eventId } = req.params;

    try {
      const users = await User.find({ eventId });
      res.status(200).json({ users });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
};
