const User = require("../models/User");

module.exports = class userController {
  static async register(req, res) {
    const { name, email, location, datetime, eventId } = req.body;

    // Validações
    if (!name || !email || !location || !datetime || !eventId) {
      return res
        .status(422)
        .json({ message: "Todos os campos são obrigatórios!" });
    }

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res
        .status(422)
        .json({ message: "E-mail já cadastrado, utilize outro" });
    }

    const user = new User({ name, email, location, datetime, eventId });

    try {
      await user.save();
      res.status(200).json({ message: "Ponto registrado!" });
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
