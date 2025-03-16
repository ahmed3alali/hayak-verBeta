import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000/api/v1';


export const productApi = createApi({

    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    keepUnusedDataFor: 30,

    tagTypes: ["Product", "AdminProducts"],
    endpoints: (builder) => ({
      getProducts: builder.query({
        query: ({ page, keyword, min, max, category, ratings }) => {
          let url = `/products`;
          if (keyword) url += `&keyword=${keyword}`;
          if (min) url += `&price[gte]=${min}`;
          if (max) url += `&price[lte]=${max}`;
          if (category) url += `&category=${category}`;
          if (ratings) url += `&ratings[gte]=${ratings}`; // Ratings are usually a minimum filter
      
          console.log("Final API Request URL:", url); // Debugging output
          return url;
        },
      }),
      
      
      
        getProductsDetails: builder.query({

            query: (id) => `/products/${id}`,


        }),

        submitReview: builder.mutation({
            query(body) {
              return {
                url: "/reviews",
                method: "PUT",
                body,
              };
            },
            invalidatesTags: ["Product"],
          }),
          canUserReview: builder.query({
            query: (productId) => `/can_review/?productId=${productId}`,
          }),

          getProductReviews: builder.query({
            query: (productId) => `/reviews?id=${productId}`,
          }),


          getAdminProducts: builder.query({
            query: () => `/admin/products`,
          }),

          deleteProductImage: builder.mutation({
            query({ id, body }) {
              return {
                url: `/admin/products/${id}/delete_image`,
                method: "PUT",
                body,
              };
            },
            invalidatesTags: ["Product"],
          }),
          deleteProduct: builder.mutation({
            query(id) {
              return {
                url: `/admin/products/${id}`,
                method: "DELETE",
              };
            },
            invalidatesTags: ["AdminProducts"],
          }),



          createProduct: builder.mutation({
            query(body) {
              return {
                url: "/admin/products",
                method: "POST",
                body,
              };
            },
            invalidatesTags: ["AdminProducts"],
          }),

          updateProduct: builder.mutation({
            query({ id, body }) {
 console.log("id is : " ,id);
              return {
           
                url: `/admin/products/${id}`,
                method: "PUT",
                body,
              };
            },
            invalidatesTags: ["Product", "AdminProducts"],
          }),

          uploadProductImages: builder.mutation({
            query({ id, body }) {
              return {
                url: `/admin/products/${id}/upload_images`,
                method: "PUT",
                body,
              };
            },
            invalidatesTags: ["Product"],
          }),
          deleteProductImage: builder.mutation({
            query({ id, body }) {
              return {
                url: `/admin/products/${id}/delete_image`,
                method: "PUT",
                body,
              };
            },
            invalidatesTags: ["Product"],
          }),

          
     

       
          deleteReview: builder.mutation({
            query({ productId, id }) {
              return {
                url: `/admin/reviews?productId=${productId}&id=${id}`,
                method: "DELETE",
              };
            },
            invalidatesTags: ["Reviews"],
          }),
        }),
     
   
});



export const { useGetProductsQuery, useGetProductsDetailsQuery, useSubmitReviewMutation, useCanUserReviewQuery , useGetProductReviewsQuery , useGetAdminProductsQuery, useDeleteProductImageMutation, useDeleteProductMutation,useCreateProductMutation, useUpdateProductMutation,useUploadProductImagesMutation ,useDeleteReviewMutation,useLazyGetProductReviewsQuery} = productApi;