const request=require("supertest")
const app=require("../config/app")
const mongoDB=require("../config/database")
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTViMWJiMGVjMDcyYTA0NzFjYWViNWEiLCJOYW1lIjoibWVydmF0IGdvbWFhIiwiRW1haWwiOiJtZXJvQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwMTUyMTY0MSwiZXhwIjoxNzA0MTEzNjQxfQ.rxFL5Mr3knQ4o6cnRd2Acd_mw3ywIB0IZt_YTnzAaP8"
const tokenn="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTViMjliMmE1YjhlNWVhODEyNzNhMzUiLCJOYW1lIjoiaGFkeSBtb21lYW4iLCJFbWFpbCI6ImhhZHlAZ21haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzAwNTc2ODc1LCJleHAiOjE3MDMxNjg4NzV9.L59_a0KN4C5zOu7LSn2TYswRmbcw-E7c_4DGV4yCgis"



describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing Order App",()=>{

        describe("GET /getAllOrders",()=>{
           test("should read all orders",async()=>{
            const response=await request(app).get('/getAllOrders')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(200)
           })

           test("should handle get orders failure", async () => {
            const response = await request(app)
              .get("/getAllOrders")
              .set("Authorization", `bearer ${tokenn}`);
              expect(response.body.code).toBe(403);
     })
        })


        describe("POST /checkoutOrder?_id=655f7f1bd829d045ed60b8d0",()=>{
            let data={
            "user":"655f7f1bd829d045ed60b8d0"
            }
            test("should checkout an order",async()=>{
             const response=await request(app)
             .post('/checkoutOrder?_id=655f7f1bd829d045ed60b8d0').send(data)
             .set("Authorization", `bearer ${tokenn}`);
             expect(response.body.code).toBe(201)
            })

            test("should handle checkout order failure", async () => {
                const response = await request(app)
                  .post("/checkoutOrder?_id=655f7f1bd829d045ed60b8d0").send(data)
                  .set("Authorization", `bearer ${token}`);
                  expect(response.body.code).toBe(403);
         }) 

         test("should handle checkout order you can control your cart only", async () => {
            const response = await request(app)
              .post("/checkoutOrder?_id=656d94d478f087af173bd98c").send({
                "user":"655f7f1bd829d045ed60b8d0"
              })
              .set("Authorization", `bearer ${tokenn}`);
              expect(response.body.code).toBe(409);
         }) 

         test("should handle checkout order your cart is empty", async () => {
            const response = await request(app)
              .post("/checkoutOrder?_id=656ee7f0c785e7dbf79655c3").send({
                "user":"656ee7f0c785e7dbf79655c3"
              })
              .set("Authorization", `bearer ${tokenn}`);
              expect(response.body.code).toBe(400);
         }) 
         })



         describe("PUT /updateOrder/:id",()=>{
        let data={
            "_id" :"656de588b2d4f9db5e701b91",
             "total" : 20000,
             "user" :"6562f7475cb6ae7b3a1cfae9",
             "products" : [ 
           {
            "_id" :"655f7f1bd829d045ed60b8d0",
            "product" : {
                "_id" : "655f7f1bd829d045ed60b8d0",
                "name" : "phone ",
                "price" : 5000,
                "description" : "this is mobile",
                "Image" : [],
                "category_name" : "electronic devices",
                "availability" : true,
                "rate" : 3,
                "numOfReviews" : 9,
                "store" :"655b282073d1d64100212a0c"
            },
            "quantity" : 4,
            "total" : 20000
        }
    ],
     "store" :"655b282073d1d64100212a0c"
        }

        test("should update order",async()=>{
         const response=await request(app)
         .put('/updateOrder/656de588b2d4f9db5e701b91')
         .send(data)
         .set("Authorization", `bearer ${tokenn}`);
         expect(response.body.code).toBe(201)
        })
        test("should handle update order failure",async()=>{
            const response=await request(app)
            .put('/updateOrder/656de588b2d4f9db5e701b91')
            .send(data)
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)

     })
     test("should handle update order not found",async()=>{
        const response=await request(app)
        .put('/updateOrder/656b33c8d08c470912d4313e')
        .send(data)
        .set("Authorization", `bearer ${tokenn}`);
        expect(response.body.error).toBe("order not found")

 })
    })


     describe("DELETE /cancelOrder/:id",()=>{
        test("should cancel order",async()=>{
         const response=await request(app)
         .delete('/cancelOrder/656de588b2d4f9db5e701b91')
         .set("Authorization", `bearer ${tokenn}`);
         expect(response.body.code).toBe(200)
        })

        test("should handle cancel order failure",async()=>{
            const response=await request(app)
            .delete('/cancelOrder/656de588b2d4f9db5e701b91')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })

           test("should handle order not found",async()=>{
            const response=await request(app)
            .delete('/cancelOrder/656b33c8d08c470912d4313e')
            .set("Authorization", `bearer ${tokenn}`);
            expect(response.body.error).toBe("order not found")
    
     })
     })
    })


    afterAll(()=>{
        mongoDB.disconnect()
    })
})

