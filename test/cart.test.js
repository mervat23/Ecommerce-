const request=require("supertest")
const app=require("../config/app")
const mongoDB=require("../config/database")

const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTViMWJiMGVjMDcyYTA0NzFjYWViNWEiLCJOYW1lIjoibWVydmF0IGdvbWFhIiwiRW1haWwiOiJtZXJvQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwMTUyMTY0MSwiZXhwIjoxNzA0MTEzNjQxfQ.rxFL5Mr3knQ4o6cnRd2Acd_mw3ywIB0IZt_YTnzAaP8"
const tokenn="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTViMjliMmE1YjhlNWVhODEyNzNhMzUiLCJOYW1lIjoiaGFkeSBtb21lYW4iLCJFbWFpbCI6ImhhZHlAZ21haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzAyMjk5NjcwLCJleHAiOjE3MDQ4OTE2NzB9.JvZbsZzTGXP8PEU2q_QLcs1Nfl_xjx4HpGtXKdc_O0A"


describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing cart App",()=>{

        describe("GET /getAllItems",()=>{
           test("should read all items",async()=>{
            const response=await request(app).get('/getAllItems')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(200)
           })

           test("should handle get items failure", async () => {
            const response = await request(app)
              .get("/getAllItems")
              .set("Authorization", `bearer ${tokenn}`);
              expect(response.body.code).toBe(403);
     })
        })
        
       
    describe("POST /addItemToCart",()=>{
        let data={
            "user":"656d94d478f087af173bd98c",
            "product" : "655f7f1bd829d045ed60b8d0",
            "quantity":3
        }
        test("should add an item",async()=>{
         const response=await request(app)
         .post('/addItemToCart').send(data)
         .set("Authorization", `bearer ${tokenn}`);
         expect(response.body.code).toBe(201)
        })

        test("should handle product is not found",async()=>{
            const response=await request(app)
            .post('/addItemToCart').send({
                "user":"656d94d478f087af173bd98c",
                "product" : "655b1bb0ec072a0471caeb5a",
                "quantity":3   
            })
            .set("Authorization", `bearer ${tokenn}`);
            expect(response.body.error).toBe("product is not found")
           })


        test("should handle cart creation failure", async () => {
            const response = await request(app)
              .post("/addItemToCart").send(data)
              .set("Authorization", `bearer ${token}`);
              expect(response.body.code).toBe(403);
     })

    })

     describe("PUT /updateCart/:id",()=>{
        let data={
            "user":"656d94d478f087af173bd98c",
            "product" : "655f7f1bd829d045ed60b8d0",
            "quantity":3       
        }
        test("should update cart",async()=>{
         const response=await request(app)
         .put('/updateCart/656ee930f552feb7447f62a9')
         .send(data)
        .set("Authorization", `bearer ${tokenn}`);
         expect(response.body.code).toBe(201)
        })

        test("should handle cart update failure", async () => {
            const response = await request(app)
              .put("/updateCart/656ee930f552feb7447f62a9").send(data)
              .set("Authorization", `bearer ${token}`);
              expect(response.body.code).toBe(403);
     })

     test("should handle cart not found", async () => {
        const response = await request(app)
          .put("/updateCart/656d94d478f087af173bd98c").send(data)
          .set("Authorization", `bearer ${tokenn}`);
          expect(response.body.error).toBe("unexpected error");
 })
     })

     describe("DELETE /deleteItem",()=>{
        let data={
            "product" : "655f7f1bd829d045ed60b8d0",
            "quantity":5,
            "user":"656d94d478f087af173bd98c"
        }
        test("should delete item from cart",async()=>{
         const response=await request(app)
         .delete('/deleteItem').send(data)
         .set("Authorization", `bearer ${tokenn}`);
         expect(response.body.code).toBe(200)
        })

        test("should handle item delete failure", async () => {
            const response = await request(app)
              .delete("/deleteItem").send(data)
              .set("Authorization", `bearer ${token}`);
              expect(response.body.code).toBe(403);
     })
     test("should handle item nt found", async () => {
        const response = await request(app)
          .delete("/deleteItem").send({
            "product" : "656d94d478f087af173bd98c",
            "quantity":5,
            "user":"656d94d478f087af173bd98c"
          })
          .set("Authorization", `bearer ${tokenn}`);
          expect(response.body.error).toBe("item is not found in the cart");
 })
     })
    })


    afterAll(()=>{
        mongoDB.disconnect()
    })
})

