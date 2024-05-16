import { validationResult } from "express-validator";
import { Car } from "../modal/carModal.js";
import { request, response } from "express";

export const CarAdd = async (request, response, next) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response
        .status(422)
        .json({ error: "Validation Failed", status: false, errors: errors.array() });
    }
    const { name, brand, price, stock } = request.body;
    const newCar = await Car.create({
      name, brand, price, stock
    });
    return response
      .status(200)
      .json({ message: "Car Add successfully", car: newCar, status: true });
  } catch (error) {
    return response
      .status(500)
      .json({ error: "Internal Server Error", status: false });
  }
};

export const CarShow = (request, response, next) => {
  Car.find()
    .then((results) => {
      const sequreData = results.map((car) => {
        const { password, ...sequreData } = car.toObject();
        return sequreData;
      });
      return response.status(200).json({ result: sequreData, status: true });
    })
    .catch((err) => {
      return response.status(500).json({ err: "internal server error" });
    });
};

export const CarEdit = async (request, response, next) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response
        .status(422)
        .json({ error: "Validation Failed", status: false, errors: errors.array() });
    }
    const { _id, name, brand, price, stock } = request.body;
    const updatedCarData = {
      name, brand, price, stock
    };
    const updatedCar = await Car.findByIdAndUpdate(
      _id,
      updatedCarData,
      { new: true }
    );
    if (!updatedCar) {
      return response
        .status(404)
        .json({ message: "Car not found", status: false });
    }
    return response.status(200).json({
      message: "Car update successfully",
      status: true,
      user: updatedCar,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Internal Server Error", status: false });
  }
};

export const CarDelete = async (request, response, next) => {
  try {
    const { _id } = request.params;
    const deletedEmployee = await Car.findByIdAndDelete(_id);
    if (!deletedEmployee) {
      return response
        .status(404)
        .json({ message: "Car not found", status: false });
    }
    return response
      .status(200)
      .json({ message: "Car deleted successfully", status: true });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Internal Server Error", status: false });
  }
};

export const FilterBySearch = async (request, response, next) => {
  try {
    const { searchKey } = request.params;
    let filteredCars;

    if (!searchKey || searchKey === "") { 
      filteredCars = await Car.find(); 
    } else {
      filteredCars = await Car.find({ 
        $or: [
          { name: { $regex: new RegExp(searchKey, "i") } },
          { brand: { $regex: new RegExp(searchKey, "i") } },
          { price: { $regex: new RegExp(searchKey, "i") } },
          { stock: { $regex: new RegExp(searchKey, "i") } }
        ]
      });
    }

    return response.json({ status: true, data: filteredCars });
  } catch (err) {
    console.error("Error filtering cars:", err);
    return response.status(500).json({ message: "Internal Server Error", status: false });
  }
};

