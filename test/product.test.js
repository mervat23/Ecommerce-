const request=require("supertest")
const app=require("../config/app")
const mongoDB=require("../config/database")
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTViMjgyMDczZDFkNjQxMDAyMTJhMGMiLCJOYW1lIjoidGFyZWsgbW9oc2VuIiwiRW1haWwiOiJ0YXJla0BnbWFpbC5jb20iLCJyb2xlIjoic3RvcmUiLCJpYXQiOjE3MDA0NzM4OTcsImV4cCI6MTcwMzA2NTg5N30.b7S8i0kUcyKQvdaCNeSBJqzFNEyicDTtTvPHoCt9aEc"
const tokenn="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc3MWY0NmJkYTVkYTg5OTg1OTA5N2EiLCJOYW1lIjoiaG9zc2FtIGFtZWVuIiwiRW1haWwiOiJob3NzYW1AZ21haWwuY29tIiwicm9sZSI6ImRlbGl2ZXJ5IiwiaWF0IjoxNzAyMzA1NjA2LCJleHAiOjE3MDQ4OTc2MDZ9.vqOxVgdw1mGLYsUOPN6cNwfs3uKLMITLPwmK48dmjHM"



describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing Product App",()=>{

        describe("GET /getAllProducts",()=>{
           test("should read all products",async()=>{
            const response=await request(app).get('/getAllProducts')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(200)
           })
           test("should handle get products failure", async () => {
            const response = await request(app)
              .get("/getAllProducts")
              .set("Authorization", `bearer ${tokenn}`);
              expect(response.body.code).toBe(403);
     })
        })


        describe("POST /createProduct",()=>{
            let data={
                "name":"oppo",
                "price" : 5000,
                "description" : "this is mobile oppo",
               "image" : [],
              "category_name" : "electronic devices",
              "availability" : true,
                "rate" : 4,
                "numOfReviews" : 7,
                "store" : "655b282073d1d64100212a0c"
  
            }

            test("should create a product",async()=>{
             const response=await request(app)
            .post('/createProduct').send(data)
            .set("Authorization", `bearer ${token}`);
             expect(response.body.code).toBe(201)
            })

            test("should handle create product failure", async () => {
            const response = await request(app)
            .post('/createProduct').send(data)
            .set("Authorization", `bearer ${tokenn}`);
             expect(response.body.code).toBe(403);
                 })

            test("should handle product already exist", async () => {
                    const response = await request(app)
                    .post('/createProduct').send(data)
                    .set("Authorization", `bearer ${token}`);
                     expect(response.body.error).toBe("Product already exists");
                         })
         })


         describe("PUT /updateProduct/:id",()=>{
        let data={
       "name" : "laptop ",
      "price" : 10000,
      "description" : "this is the best laptop i like it so much ",
      "image" : [],
      "category_name" : "electronic devices",
      "availability" : true,
      "rate" : 5,
     "numOfReviews" : 9,
     "store" :"655b282073d1d64100212a0c"

        }

        test("should update product",async()=>{
         const response=await request(app)
         .put('/updateProduct/655f7f51d829d045ed60b8d3')
         .send(data)
        .set("Authorization", `bearer ${token}`);
         expect(response.body.code).toBe(201)
        })
        test("should handle update product failure",async()=>{
            const response=await request(app)
            .put('/updateProduct/655f7f51d829d045ed60b8d3')
            .send(data)
           .set("Authorization", `bearer ${tokenn}`);
            expect(response.body.code).toBe(403)
           })

           test("should handle product not found",async()=>{
            const response=await request(app)
            .put('/updateProduct/655b29b2a5b8e5ea81273a35')
            .send(data)
           .set("Authorization", `bearer ${token}`);
            expect(response.body.error).toBe("product is not found")
           })
     })
        


       describe("DELETE /deleteProduct/:id",()=>{
        test("should delete product",async()=>{
         const response=await request(app)
        .delete('/deleteProduct/657720712f1fd03cb99ef68b')
        .set("Authorization", `bearer ${token}`);
         expect(response.body.code).toBe(200)
        })

        test("should handle delete product failure",async()=>{
            const response=await request(app)
           .delete('/deleteProduct/657720712f1fd03cb99ef68b')
           .set("Authorization", `bearer ${tokenn}`);
            expect(response.body.code).toBe(403)
           })

           test("should handle product not found",async()=>{
            const response=await request(app)
           .delete('/deleteProduct/655b1bb0ec072a0471caeb5a')
           .set("Authorization", `bearer ${token}`);
            expect(response.body.error).toBe("product is not found")
           })
     })
    })


    afterAll(()=>{
        mongoDB.disconnect()
    })
})

