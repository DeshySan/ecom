import productModel from "../models/productModel.js";
import fs from "fs";
const sluggy = (name) => {
  return name.replace(/\s/g, "-");
};
export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({
          error: "Name is not supplied",
        });
      case !description:
        return res.status(500).send({
          error: "Description is not supplied",
        });
      case !price:
        return res.status(500).send({
          error: "Price is not supplied",
        });
      case !category:
        return res.status(500).send({
          error: "Category is not supplied",
        });
      case !quantity:
        return res.status(500).send({
          error: "Quantity is not supplied",
        });
      case !photo && photo.size > 10000:
        return res.status(500).send({
          error: "Photo is not supplied and must be less than 1 MB",
        });
    }
    const products = new productModel({
      ...req.fields,
      slug: sluggy(name),
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      messgae: "Products created successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messgae: "Something went wrong with the Product",
      error,
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total: product.length,
      message: "Products successfully retirved",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error retrieving Products",
      error,
    });
  }
};

export const singleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Product retrieved successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status({
      success: false,
      message: "Error creating signle Product",
      error,
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Cannot Provide you photo at the moment",
      error,
    });
  }
};

export const deletController = async (req, res) => {
  try {
    const { pid } = req.params;
    await productModel.findByIdAndDelete(pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "product deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Cannot connect tot he server",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({
          error: "Name is not supplied",
        });
      case !description:
        return res.status(500).send({
          error: "Description is not supplied",
        });
      case !price:
        return res.status(500).send({
          error: "Price is not supplied",
        });
      case !category:
        return res.status(500).send({
          error: "Category is not supplied",
        });
      case !quantity:
        return res.status(500).send({
          error: "Quantity is not supplied",
        });
      case !photo && photo.size > 10000:
        return res.status(500).send({
          error: "Photo is not supplied and must be less than 1 MB",
        });
    }
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: sluggy(name),
      },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      messgae: "Products created successfully",
      products,
    });
  } catch (error) {
    console.timeLog(error);
    res.status(200).send({
      success: false,
      message: "internal server error",
      error,
    });
  }
};
