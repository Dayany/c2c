import { Schema, model, models } from "mongoose";

const PartSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  owner: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  carMake: {
    type: String,
    required: true,
  },
  partNumber: {
    type: String,
    required: true,
  },
  sold: {
    type: Boolean,
    default: false,
  },
  soldTo: {
    type: String,
    required: false,
  },
  soldDate: {
    type: Date,
    required: false,
  },
});

const Parts = models.Parts || model("Parts", PartSchema);

export default Parts;
