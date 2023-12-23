import express from "express";
import { Vendor } from "../models/vendors.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// Get all vendors
router.get("/getall", async (req, res) => {
  try {
    const vendors = await Vendor.find().select("-description");
    res.json(vendors);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Create a new vendor
router.post(
  "/create",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("vendorList").isArray({ min: 1 }).withMessage("Vendor list is required"),
    body("vendorList.*.vendorName").notEmpty().withMessage("Vendor name is required"),
    body("vendorList.*.varient").notEmpty().withMessage("Variant is required"),
    body("vendorList.*.number").notEmpty().withMessage("Number is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description, vendorList } = req.body;

      const newVendor = new Vendor({
        name,
        description,
        vendorList,
      });

      const vendor = await newVendor.save();
      res.json({ message: "Vendor created successfully", vendor });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// Get vendor by ID
router.get("/getvendor/:id", async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.json(vendor);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Update vendor by ID
router.put("/update/:id", async (req, res) => {
  try {
    const { name, description, vendorList } = req.body;

    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { name, description, vendorList },
      { new: true }
    );

    if (!updatedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.json({ message: "Vendor updated successfully", updatedVendor });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Delete vendor by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);

    if (!deletedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.json({ message: "Vendor deleted successfully", deletedVendor });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

export default router;
