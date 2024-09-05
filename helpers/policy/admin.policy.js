const endPoints=require("../endPoints")


module.exports=[
    endPoints.REGISTER,
    endPoints.LOGIN,
    endPoints.GET_ALL_USERS,
    endPoints.GET_USER_BY_ID,
    endPoints.UPDATE_USER,
    endPoints.DELETE_USER,
    endPoints.UPLOAD_USER_IMAGE,
    endPoints.DELETE_USER_IMAGE,
    endPoints.RESET_PASSWORD,


    endPoints.GET_ALL_ITEMS,
    endPoints.GET_CART,

    endPoints.GET_ALL_ORDERS,
    endPoints.GET_ORDER_BY_ID,
    
    endPoints.CREATE_PRODUCT,
    endPoints.GET_ALL_PRODUCTS,
    endPoints.GET_PRODUCT_BY_ID,
    endPoints.UPDATE_PRODUCT,
    endPoints.DELETE_PRODUCT,
    endPoints.UPLOAD_IMAGE,
    endPoints.ADD_IMAGES_TO_ARRAY,
    endPoints.DELETE_IMAGE,
    endPoints.REMOVE_IMAGES_FROM_ARRAY,

    endPoints.GET_ALL_REVIEWS,
    endPoints.GET_REVIEW_BY_ID,
    endPoints.CREATE_REVIEW,
    endPoints.UPDATE_REVIEW,
    endPoints.DELETE_REVIEW,


    endPoints.GET_ALL_WISHLISTS,
    endPoints.GET_WISHLIST_BY_ID,
     
]

