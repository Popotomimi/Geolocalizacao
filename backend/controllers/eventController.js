const Event = require("../models/Event");

module.exports = class eventController {
  static async createEvent(req, res) {
    const { title, date, location, description } = req.body;

    // Validações
    if (!title || !date || !location) {
      return res
        .status(422)
        .json({
          message: "Todos os campos obrigatórios devem ser preenchidos!",
        });
    }

    const event = new Event({ title, date, location, description });

    try {
      await event.save();
      res.status(201).json({ message: "Evento criado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllEvents(req, res) {
    try {
      const events = await Event.find();
      res.status(200).json({ events });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getEventById(req, res) {
    const { id } = req.params;

    try {
      const event = await Event.findById(id);
      if (!event) {
        return res.status(404).json({ message: "Evento não encontrado!" });
      }
      res.status(200).json({ event });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateEvent(req, res) {
    const { id } = req.params;
    const { title, date, location, description } = req.body;

    try {
      const updatedEvent = await Event.findByIdAndUpdate(
        id,
        { title, date, location, description },
        { new: true }
      );
      if (!updatedEvent) {
        return res.status(404).json({ message: "Evento não encontrado!" });
      }
      res
        .status(200)
        .json({ message: "Evento atualizado com sucesso!", updatedEvent });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteEvent(req, res) {
    const { id } = req.params;

    try {
      const deletedEvent = await Event.findByIdAndDelete(id);
      if (!deletedEvent) {
        return res.status(404).json({ message: "Evento não encontrado!" });
      }
      res.status(200).json({ message: "Evento deletado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
