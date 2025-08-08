import mongoose from "mongoose";
const { Schema, model } = mongoose;

const enquirySchema = new Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  phone:     { type: String },
  message:   { type: String, required: true },
  status:    { type: String, enum: ["new", "contacted", "closed"], default: "new" },
  assignedTo:{ type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });



mongoose.models = {}
// export default model("Enquiry", enquirySchema)
const enquiryModel = model("Enquiry", enquirySchema)

export default enquiryModel
