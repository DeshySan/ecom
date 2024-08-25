import slugify from "slugify";
import categoryModels from "../models/categoryModels.js";
const sluggy = (name) => {
  return name.replace(/\s/g, "-");
};
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(401).send({
        message: "Name is required",
      });
    }
    const existingCategory = await categoryModels.findOne({ name });
    if (existingCategory) {
      res.status(200).send({
        success: true,
        message: "Category Already exists",
      });
    }
    const category = await new categoryModels({
      name,
      slug: sluggy(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "Category created succesfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModels.findByIdAndUpdate(
      id,
      {
        name,
        slug: sluggy(name),
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category is Updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating the category",
    });
  }
};

//get all category

export const categoryController = async (req, res) => {
  try {
    const category = await categoryModels.find({});
    res.status(200).send({
      success: true,
      message: "All categories have been retireved",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting categories",
      errror,
    });
  }
};

export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModels.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get single category is succesful",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error getting single cvategory",
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModels.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Succesfully deleted",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "user is not authorised to access resource with explicit deny",
      error,
    });
  }
};
