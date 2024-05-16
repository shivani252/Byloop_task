import mongoose from "mongoose";
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
    trim: true,
  },
  profilePhoto: {
    type: String,
  },
  destination: {
    required: true,
    trim: true,
    type: String,
  },
  sector: {
    type: String,
    required: true,
    trim: true,
  },
});

export const Employee = mongoose.model("employee", employeeSchema);
