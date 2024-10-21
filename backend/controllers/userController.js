const User = require("../models/User");

module.exports = class userController {
  static async register(req, res) {
    // Colocando os valores enviado pelo forms em variáveis
    const { name, email, location, datetime } = req.body;

    // Fazendo validações
    if (!name) {
      res.status(422).json({ message: "O Nome é obrigatório!" });
      return;
    }
    if (!email) {
      res.status(422).json({ message: "O E-mail é obrigatório!" });
      return;
    }
    if (!location) {
      res.status(422).json({ message: "A localização é obrigatória!" });
      return;
    }
    if (!datetime) {
      res.status(422).json({ message: "A data e as horas são obrigatórias!" });
      return;
    }

    // Verificando se o usuário já existe
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(422).json({
        message: "E-mail já cadastrado, utilize outro",
      });
      return;
    }

    // Criando usuário
    const user = new User({
      name,
      email,
      location,
      datetime,
    });

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
};
