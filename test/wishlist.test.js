const request=require("supertest")
const app=require("../config/app")
const mongoDB=require("../config/database")
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTViMWJiMGVjMDcyYTA0NzFjYWViNWEiLCJOYW1lIjoibWVydmF0IGdvbWFhIiwiRW1haWwiOiJtZXJvQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwMTUyMTY0MSwiZXhwIjoxNzA0MTEzNjQxfQ.rxFL5Mr3knQ4o6cnRd2Acd_mw3ywIB0IZt_YTnzAaP8"
const tokenn="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTViMjliMmE1YjhlNWVhODEyNzNhMzUiLCJOYW1lIjoiaGFkeSBtb21lYW4iLCJFbWFpbCI6ImhhZHlAZ21haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzAyMjk5NjcwLCJleHAiOjE3MDQ4OTE2NzB9.JvZbsZzTGXP8PEU2q_QLcs1Nfl_xjx4HpGtXKdc_O0A"


describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing Wishlist App",()=>{

        describe("GET /getAllWishlists",()=>{
           test("should read all wishlists",async()=>{
            const response=await request(app).get('/getAllWishlists')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(200)
           })

           test("should handle read all wishlists failure",async()=>{
            const response=await request(app).get('/getAllWishlists')
            .set("Authorization", `bearer ${tokenn}`);
            expect(response.body.code).toBe(403)
           })
        })

    
        describe("GET /getWishlist",()=>{
           let data={
                "user":"6562f7475cb6ae7b3a1cfae9"  
            }

            test("should handle wishlist not found that created",async()=>{
                const response=await request(app).get('/getWishlist')
                .send({
                    "user":"657723b87be28dda250c05e9"    
                })
               .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(201)
               })

            test("should return user wishlist",async()=>{
             const response=await request(app).get('/getWishlist')
             .send(data)
            .set("Authorization", `bearer ${token}`);
             expect(response.body.code).toBe(200)
            })


            test("should handle user failure",async()=>{
                const response=await request(app).get('/getWishlist')
                .send(data)
               .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               })

           
         })
 
        
        describe("POST /addProductToWishlist",()=>{
            let data={
                "user" : "6562f7475cb6ae7b3a1cfae9",
                "product": "655f7f1bd829d045ed60b8d0"
            }
            test("you should add product to wishlist",async()=>{
             const response=await request(app)
             .post('/addProductToWishlist').send(data)
             .set("Authorization", `bearer ${tokenn}`);
             expect(response.body.code).toBe(201)
            })

            test("you should handle product not found",async()=>{
                const response=await request(app)
                .post('/addProductToWishlist').send({
                "user" : "6562f7475cb6ae7b3a1cfae9",
                "product": "655b1bb0ec072a0471caeb5a"
                })
                .set("Authorization", `bearer ${tokenn}`);
                expect(response.body.error).toBe("product is not found")
               })

               test("you should handle product already in the wishlist!",async()=>{
                const response=await request(app)
                .post('/addProductToWishlist').send(data)
                .set("Authorization", `bearer ${tokenn}`);
                expect(response.body.error).toBe("product is already in the wishlist!")
               })
              
               test("you should handle product failure",async()=>{
                const response=await request(app)
                .post('/addProductToWishlist').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               })

         })


     describe("DELETE /deleteItemFromWishlist",()=>{
        let data={
            "user" : "6562f7475cb6ae7b3a1cfae9",
            "product" :"655f7f1bd829d045ed60b8d0"
            }
        test("should delete an item from wishlist",async()=>{
         const response=await request(app)
        .delete('/deleteItemFromWishlist').send(data)
        .set("Authorization", `bearer ${tokenn}`);
         expect(response.body.code).toBe(200)
        })

        test("should handle an item not found",async()=>{
            const response=await request(app)
           .delete('/deleteItemFromWishlist').send({
            "user" : "6562f7475cb6ae7b3a1cfae9",
            "product" :"655c640b45e2b176830770c8"
           })
           .set("Authorization", `bearer ${tokenn}`);
            expect(response.body.error).toBe("product not found in wishlist!")
           })

           test("should handle delete item failure",async()=>{
            const response=await request(app)
           .delete('/deleteItemFromWishlist').send(data)
           .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })
     })
    })


    afterAll(()=>{
        mongoDB.disconnect()
    })
})

