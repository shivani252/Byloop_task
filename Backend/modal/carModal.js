import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    price:{
        type:String,
        required:true,
        trim: true
    },
    stock:{
        type:String,
        required:true,
        trim: true
    }
})

export const Car = mongoose.model("carData",carSchema);