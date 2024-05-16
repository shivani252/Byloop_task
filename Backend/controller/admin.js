import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { Admin } from "../modal/admin.js";
import Jwt from "../middleware/verification.js";
export const signIn = async (request, response, next) => {
  try {
    
    const { email, password } = request.body;
    const admin = await Admin.findOne({ email });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const payload = { subject: admin.email };
      const token = Jwt.sign(payload, 'demoCar');
      const adminData = { ...admin.toObject(), password: undefined, token };

      return response.status(200).json({ message: 'Sign in successful', status: true,  admin: adminData });
    } else {
      return response.status(401).json({ error: 'Unauthorized', message: 'Invalid email or password', status: false });
    }
  } catch (error) {
    console.log(error)
    return response.status(500).json({ error: 'Internal Server Error', message: 'Failed to sign in', status: false });
  }
};

export const signUp = async (request, response, next) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ error: "Bad request", status: false, errors: errors.array() });
      }
  
      const { name, email, password } = request.body;
      const alreadyExists = await Admin.findOne({ email });
      if (alreadyExists) {
        return response.status(200).json({ message: "Account already registered", status: true });
      }
 
      const saltKey = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, saltKey);
  
      const admin = await Admin.create({
        name,
        email,
        password: hashedPassword,
      });
  
      return response.status(200).json({ message: "Signup success", admin, status: true });
    } catch (error) {
      console.error("Error signing up:", error);
      return response.status(500).json({ error: "Internal Server Error", status: false });
    }
  };


