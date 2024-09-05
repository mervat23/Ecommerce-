const request=require("supertest")
const app=require("../config/app")
const mongoDB=require("../config/database")

const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTViMjliMmE1YjhlNWVhODEyNzNhMzUiLCJOYW1lIjoiaGFkeSBtb21lYW4iLCJFbWFpbCI6ImhhZHlAZ21haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzAwNTUzNTcwLCJleHAiOjE3MDMxNDU1NzB9.JkMe_0S3LvVuEYT3wAn_fr216L-8jU5E0wPgFo3vd9w"

describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing Review App",()=>{

        describe("GET /getAllReviews",()=>{
           test("should read all reviews",async()=>{
            const response=await request(app).get('/getAllReviews')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(200)
           })

           test("should handle get reviews failure",async()=>{
            const response=await request(app).get('/getAllReviews')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })
        })


        describe("POST /createReview",()=>{
            let data={
                "title":"lenovo review",
                "content":"this the best lenovo",
                "created_at":"12/10/2023",
               "user":"6562f7475cb6ae7b3a1cfae9",
               "product": "656d8d252756145324a24d8b",
                "rating":4            
            }
            test("should create a review",async()=>{
             const response=await request(app)
             .post('/createReview').send(data)
             .set("Authorization", `bearer ${token}`);
             expect(response.body.code).toBe(201)
            })
            test("should handle create review failure",async()=>{
                const response=await request(app)
                .post('/createReview').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               }) 

               test("should handle review already exist",async()=>{
                const response=await request(app)
                .post('/createReview').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.error).toBe("Review already exists")
               }) 
         })

    
         describe("PUT /updateReview/:id",()=>{
        let data={
            "title":"phone review",
            "content":"this the best phone i buy ",
            "created_at":"12/10/2023",
           "user":"6562f7475cb6ae7b3a1cfae9",
           "product": "655f7f1bd829d045ed60b8d0",
            "rating":5
        
        }
        test("should update review",async()=>{
         const response=await request(app)
         .put('/updateReview/657826433f90a2dc3c79c3f2')
         .send(data)
        .set("Authorization", `bearer ${token}`);
         expect(response.body.code).toBe(201)
        })

        test("should handle update review failure",async()=>{
            const response=await request(app)
            .put('/updateReview/657826433f90a2dc3c79c3f2')
            .send(data)
           .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })

           test("should handle review not found ",async()=>{
            const response=await request(app)
            .put('/updateReview/6575a7398ba9587517ef77f2') 
            .send(data)
           .set("Authorization", `bearer ${token}`);
            expect(response.body.error).toBe("Review not found")
           })
        })


       describe("DELETE /deleteReview/:id",()=>{
        test("should delete review",async()=>{
         const response=await request(app)
         .delete('/deleteReview/657826433f90a2dc3c79c3f2')
         .set("Authorization", `bearer ${token}`);
         expect(response.body.code).toBe(200)
        })
        test("should handle delete review failure",async()=>{
            const response=await request(app)
            .delete('/deleteReview/657826433f90a2dc3c79c3f2')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })

           test("should handle review not found",async()=>{
            const response=await request(app)
            .delete('/deleteReview/6575b356230bb11b0163a877') 
            .set("Authorization", `bearer ${token}`);
            expect(response.body.error).toBe("review not found")
           })
     })
    })


    afterAll(()=>{
        mongoDB.disconnect()
    })
})

