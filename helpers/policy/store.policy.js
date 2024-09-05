const endPoints=require("../endPoints")


module.exports=[
   endPoints.REGISTER,
   endPoints.LOGIN,
   endPoints.RESET_PASSWORD,
   endPoints.GET_ALL_USERS,
   endPoints.GET_USER_BY_ID,
   endPoints.UPDATE_USER,
   endPoints.DELETE_USER,
   endPoints.UPLOAD_USER_IMAGE,
   endPoints.DELETE_USER_IMAGE,
   endPoints.GET_CART_BY_USER_ID,


   endPoints.CREATE_PRODUCT,
   endPoints.GET_ALL_PRODUCTS,
   endPoints.GET_PRODUCT_BY_ID,
   endPoints.UPDATE_PRODUCT,
   endPoints.DELETE_PRODUCT,
   endPoints.UPLOAD_IMAGE,
   endPoints.ADD_IMAGES_TO_ARRAY,

   endPoints.GET_ALL_ORDERS,
   endPoints.GET_ORDER_BY_ID,

   endPoints.GET_ALL_REVIEWS,
   endPoints.GET_REVIEW_BY_ID,



]



