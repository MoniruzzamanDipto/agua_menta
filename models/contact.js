import { model, models, Schema } from "mongoose";

const ContactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  date: { type: Date, default: Date.now },
});

export default models.Contact || model("Contact", ContactSchema);