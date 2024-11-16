const mongoose = require("../db/conn");
const { Schema } = mongoose;

const User = mongoose.model(
  "User",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      datetime: {
        type: String,
        required: true,
      },
      eventId: {
        type: Schema.Types.ObjectId,
        ref: "Event",
        required: true,
      },
      pix: {
        type: String,
        required: false,
      },
    },
    { timestamps: true }
  )
);

module.exports = User;
