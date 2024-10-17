const User = require("../models/User");

module.exports = class userController {
  static async register(req, res) {
    // Colocando os valores enviado pelo forms em variáveis
    const { name, email, location, dateTime } = req.body;

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
    if (!dateTime) {
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
  }
};
