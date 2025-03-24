import catchAsyncErrors from '../Middlewares/catchAsyncErrors.js';
import theProduct from '../Models/productModel.js'
import APIfilters from '../utils/apiFilters.js';
import { delete_file, upload_file } from '../utils/cloudinary.js';

// to use these function we go to routes / product .js 
// get all product ==> /api/v1/Products
export const getProducts = catchAsyncErrors(async (req, res) => {
  const resPerPage = 4;

  const apiFilters = new APIfilters(theProduct, req.query).search().filters();

  // Clone the query before pagination to count all filtered products
  let filteredProductsCount = await apiFilters.query.clone().countDocuments();

  // Apply pagination and then fetch paginated products

  let products = await apiFilters.query; 
  console.log(`Page: ${req.query.page}, Products returned: ${products.length}`);

  res.status(200).json({
    resPerPage,
    filteredProductsCount, // Now this correctly represents total filtered items
    products,
  });
});


export const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await theProduct.find();

  res.status(200).json({
    products,
  });
});


// create new product ==> /api/v1/admin/Products
export const newProduct = async (req, res) => {



   

    const product = await theProduct.create(req.body)
    res.status(200).json({

        product,


    });

}


// get a single product detail by its ide :
export const getProductById = async (req, res) => {



    const product = await theProduct.findById(req.params.id)

    if (!product) {
        return res.status(404).json({

            error: "product with such id is not found !"


        });
    }


    product.images = product.images || [];

    res.status(200).json({

        product,


    });

};



export const updateProduct = catchAsyncErrors(async (req, res) => {



    let product = await theProduct.findById(req.params.id)

    if (!product) {
        return res.status(404).json({

            error: "product with such id is not found !"


        });



    }

    product = await theProduct.findByIdAndUpdate(req?.params?.id, req.body, { new: true })




    res.status(200).json({

        product,


    });

});




// Delete product   =>  /api/v1/products/:id
export const deleteProduct = catchAsyncErrors(async (req, res) => {
  const product = await theProduct.findById(req?.params?.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Deleting image associated with product
  for (let i = 0; i < product?.images?.length; i++) {
    await delete_file(product?.images[i].public_id);
  }

  await product.deleteOne();

  res.status(200).json({
    message: "Product Deleted",
  });
});


export const createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req?.user?._id,
      rating: Number(rating),
      comment,
    };
  
    const product = await theProduct.findById(productId);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    const isReviewed = product?.reviews?.find(
      (r) => r.user.toString() === req?.user?._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((review) => {
        if (review?.user?.toString() === req?.user?._id.toString()) {
          review.comment = comment;
          review.rating = rating;
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });
  
  // Get product reviews   =>  /api/v1/reviews
  export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await theProduct.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    res.status(200).json({
      reviews: product.reviews,
    });
  });
  
  // Delete product review   =>  /api/v1/admin/reviews
  export const deleteReview = catchAsyncErrors(async (req, res, next) => {
    let product = await theProduct.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    const reviews = product?.reviews?.filter(
      (review) => review._id.toString() !== req?.query?.id.toString()
    );
  
    const numOfReviews = reviews.length;
  
    const ratings =
      numOfReviews === 0
        ? 0
        : product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          numOfReviews;
  
    product = await Product.findByIdAndUpdate(
      req.query.productId,
      { reviews, numOfReviews, ratings },
      { new: true }
    );
  
    res.status(200).json({
      success: true,
      product,
    });
  });



  export const canUserReview = catchAsyncErrors(async (req, res, next) => {
    const { productId } = req.query;
  
    if (!req.user) {
      return res.status(401).json({ canReview: false, message: "User not authenticated" });
    }
  
    const product = await theProduct.findById(productId);
  
    if (!product) {
      return res.status(404).json({ canReview: false, message: "Product not found" });
    }
  
    // Check if the user has already reviewed the product
    const isReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      return res.status(200).json({ canReview: false, message: "You have already reviewed this product" });
    }
  
    res.status(200).json({ canReview: true });
});


// Upload product images   =>  /api/v1/admin/products/:id/upload_images
export const uploadProductImages = catchAsyncErrors(async (req, res) => {
  let product = await theProduct.findById(req?.params?.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const uploader = async (image) => upload_file(image, "taswoqi/products");

  const urls = await Promise.all((req?.body?.images).map(uploader));

  product?.images?.push(...urls);
  await product?.save();

  res.status(200).json({
    product,
  });
});

// Delete product image   =>  /api/v1/admin/products/:id/delete_image
export const deleteProductImage = catchAsyncErrors(async (req, res) => {
  let product = await theProduct.findById(req?.params?.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const isDeleted = await delete_file(req.body.imgId);

  if (isDeleted) {
    product.images = product?.images?.filter(
      (img) => img.public_id !== req.body.imgId
    );

    await product?.save();
  }

  res.status(200).json({
    product,
  });
});
