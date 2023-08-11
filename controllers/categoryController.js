import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({ message: "Name is required" })
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category already exists",
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: "New category created",
            category,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in category",
            error,
        })
    }
}




export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        const category = await categoryModel.findByIdAndUpdate(
            id, { name, slug: slugify(name) }, { new: true })

        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in updating category",
            error
        })
    }
}



export const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: "All Category found",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in displaying all the categories"
        })
    }
}



export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: "Single catgory has been displayed",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting single category name"
        })
    }
}




export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Categry Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while deleting category",
            error,
        });
    }
};