import Admin from "../Model/AdminModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../../config";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }
    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
      },
      config.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
