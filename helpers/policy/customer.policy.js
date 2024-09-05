const endPoints=require("../endPoints")


module.exports=[

endPoints.REGISTER,
endPoints.LOGIN,
endPoints.GET_USER_BY_ID,
endPoints.RESET_PASSWORD,   
endPoints.UPDATE_USER,
endPoints.DELETE_USER,
endPoints.UPLOAD_USER_IMAGE,
endPoints.DELETE_USER_IMAGE,


endPoints.GET_CART,
endPoints.ADD_ITEM,
endPoints.UPDATE_CART,
endPoints.DELETE_ITEM,
endPoints.FLUSH,

endPoints.GET_ALL_PRODUCTS,
endPoints.GET_PRODUCT_BY_ID,

endPoints.CHECK_OUT_ORDER,
endPoints.UPDATE_ORDER,
endPoints.GET_ORDER_BY_ID,
endPoints.CANCEL_ORDER,

endPoints.CREATE_REVIEW,
endPoints.GET_ALL_REVIEWS,
endPoints.GET_REVIEW_BY_ID,
endPoints.UPDATE_REVIEW,
endPoints.DELETE_REVIEW,

endPoints.ADD_PRODUCT_TO_WISHLIST,
endPoints.REMOVE_PRODUCT_FROM_WISHLIST,
endPoints.GET_WISHLIST_BY_ID,

]