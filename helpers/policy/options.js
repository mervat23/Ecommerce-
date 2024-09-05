const roles=require("../roles")
const store=require("./store.policy")
const adminPolicy=require("./admin.policy")
const delivery=require("./delivery.policy")
const customer=require("./customer.policy")

const opts={
    [roles.DELIVERY]:{can:delivery},
    [roles.ADMIN]:{can:adminPolicy},
    [roles.STORE]:{can:store},
    [roles.CUSTOMER]:{can:customer},
}

module.exports=opts