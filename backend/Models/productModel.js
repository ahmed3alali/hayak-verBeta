import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({


    name: {

        type: String,
        required: [true, "Please enter a product name"],
        maxLenght: [200, "Product name cannot exceed 200 characters"]
    },


    price: {

        type: Number,
        required: [true, "Product price cannot be empty"],
        maxLenght: [5, "Product price cannot exceed 5 digits"]

    },

    description: {

        type: String,
        required: [true, "Please enter a product description"],


    },






    images: [{

        public_id: {

            type: String,
            required: true

        },

        url: {

            type: String,
            required: true,

        }

    }],
    category: {

        type: String,
        required: [true, "Please enter product category"],
        
        enum: {

            values:  ['Burger','Pastery','Coffee','Cold Drinks','Hot Drinks','Arabic Sweet'],
            message: 'Please select correct categories'


        }


    },











}, { timestamps: true });



export default mongoose.model("Product", productSchema);