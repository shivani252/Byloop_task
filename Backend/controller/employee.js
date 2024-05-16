import { validationResult } from "express-validator";
import { Employee } from "../modal/employee.js";

export const addEmployee = async (request, response, next) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response
        .status(400)
        .json({ error: "Bad request", status: false, errors: errors.array() });
    }

    const requestData = request.body;
    const jsonData = JSON.stringify(requestData);
    const extractedObject = JSON.parse(jsonData);
    request.body=extractedObject
    console.log(request.body);
    const alreadyExists = await Employee.findOne({ email: request.body.email });
    if (alreadyExists) {
      return response
        .status(200)
        .json({ message: "Account already registered", status: true });
    }
    
    const { name, email, contact, destination, sector } = request.body;

    let profilePhoto = null;
    if (request.file) {
      profilePhoto = request.file.path;
    }

    const newEmployee = await Employee.create({
      name,
      email,
      contact,
      destination,
      sector,
      profilePhoto,
    });

    return response
      .status(200)
      .json({ message: "Registration success", employee: newEmployee, status: true });
  } catch (error) {
    console.log("rrrrrrrrrrrr", error);
    return response
      .status(500)
      .json({ error: "Internal Server Error", status: false });
  }
};
export const allEmployee = (request, response, next) => {
  Employee.find()
    .then((results) => {
      const sequreData = results.map((employee) => {
        const { password, ...sequreData } = employee.toObject();
        return sequreData;
      });

      return response.status(200).json({ result: sequreData, status: true });
    })
    .catch((err) => {
      return response.status(500).json({ err: "internal server error" });
    });
};

export const updateEmployee = async (request, response, next) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response
        .status(400)
        .json({ error: "Bad request", status: false, errors: errors.array() });
    }

    const { id, name, email, contact, destination, sector } = request.body;
    const updatedEmployeeData = {
      name,
      email,
      contact,
      destination,
      sector,
    };

    if (request.file) {
      updatedEmployeeData.profilePhoto = request.file.path;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      updatedEmployeeData,
      { new: true }
    );

    if (!updatedEmployee) {
      return response
        .status(404)
        .json({ message: "Employee not found", status: false });
    }

    return response.status(200).json({
      message: "Update successful",
      status: true,
      user: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    return response
      .status(500)
      .json({ message: "Internal Server Error", status: false });
  }
};

export const deleteEmployee = async (request, response, next) => {
  try {
    const { id } = request.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return response
        .status(404)
        .json({ message: "Employee not found", status: false });
    }

    return response
      .status(200)
      .json({ message: "Employee deleted successfully", status: true });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Internal Server Error", status: false });
  }
};
