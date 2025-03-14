import express from 'express'
import { canUserReview, createProductReview, deleteProduct, deleteProductImage, getAdminProducts, getProductById, getProductReviews, getProducts, newProduct, updateProduct, uploadProductImages } from '../Controllers/ProductController.js'
import { authorizeRoles, isAuthenticatedUser } from '../Middlewares/authChecker.js'
const router =express.Router()

router.route("/products").get(getProducts)
router.route("/admin/products").post(isAuthenticatedUser ,authorizeRoles('Admin'),newProduct)
router.route("/admin/products").get(isAuthenticatedUser ,authorizeRoles('Admin'),getAdminProducts)
router.route("/products/:id").get(getProductById)
router.route("/admin/products/:id").put(isAuthenticatedUser ,authorizeRoles('Admin'),updateProduct)
router.route("/admin/products/:id/upload_images").put(isAuthenticatedUser ,authorizeRoles('Admin'),uploadProductImages)
router.route("/admin/products/:id/delete_image").put(isAuthenticatedUser ,authorizeRoles('Admin'),deleteProductImage)
 
router.route("/admin/products/:id").delete(isAuthenticatedUser ,authorizeRoles('Admin'),deleteProduct)

router.route("/reviews").put(isAuthenticatedUser,createProductReview)
router.route("/reviews").get(isAuthenticatedUser,getProductReviews)
router.route("/can_review").get(isAuthenticatedUser, canUserReview);


export default router;