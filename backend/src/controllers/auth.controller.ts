import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";
import {
  loginValidation,
  registerValidation,
} from "../validations/auth.validation";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = registerValidation.parse(req.body);

    const result = await registerUser(validatedData);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Registration failed",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = loginValidation.parse(req.body);

    const result = await loginUser(validatedData);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    });
  }
};