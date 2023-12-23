import express from "express";
import { Varient } from "../models/varient.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// Get all varients
router.get("/getall", async (req, res) => {
  try {
    const varients = await Varient.find();
    res.json(varients);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Create a new varient
router.post(
  "/create",
  [
    body("varient").notEmpty().withMessage("Varient is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { varient } = req.body;

      const newVarient = new Varient({
        varient,
      });

      const createdVarient = await newVarient.save();
      res.json({ message: "Varient created successfully", varient: createdVarient });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// Get varient by ID
router.get("/getvarient/:id", async (req, res) => {
  try {
    const varient = await Varient.findById(req.params.id);

    if (!varient) {
      return res.status(404).json({ message: "Varient not found" });
    }

    res.json(varient);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Update varient by ID
router.put("/update/:id", async (req, res) => {
  try {
    const { varient } = req.body;

    const updatedVarient = await Varient.findByIdAndUpdate(
      req.params.id,
      { varient },
      { new: true }
    );

    if (!updatedVarient) {
      return res.status(404).json({ message: "Varient not found" });
    }

    res.json({ message: "Varient updated successfully", varient: updatedVarient });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Delete varient by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedVarient = await Varient.findByIdAndDelete(req.params.id);

    if (!deletedVarient) {
      return res.status(404).json({ message: "Varient not found" });
    }

    res.json({ message: "Varient deleted successfully", varient: deletedVarient });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

export default router;
