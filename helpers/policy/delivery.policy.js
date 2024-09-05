const endPoints=require("../endPoints")

//yes
module.exports=[
    endPoints.REGISTER,
    endPoints.LOGIN,
    endPoints.RESET_PASSWORD,
    endPoints.GET_USER_BY_ID,
    endPoints.UPDATE_USER,
    endPoints.DELETE_USER,
    endPoints.UPLOAD_USER_IMAGE,
    endPoints.GET_CART_BY_USER_ID,

    endPoints.GET_ALL_ORDERS,
    endPoints.GET_ORDER_BY_ID,

    endPoints.GET_REVIEW_BY_ID,
    endPoints.GET_ALL_REVIEWS,
]

