const mongoose = require("../db/conn");
const { Schema } = mongoose;

const User = mongoose.model(
  "User",
  new Schema(
    {
      name: {
        type: String,
        required: false,
      },
      phone: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: false,
      },
      datetime: {
        type: String,
        required: false,
      },
      datetimecheckout: {
        type: String,
        required: false,
      },
      locationcheckout: {
        type: String,
        required: false,
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
