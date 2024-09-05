const request=require("supertest")
const app=require("../config/app")
const mongoDB=require("../config/database")

const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTViMWJiMGVjMDcyYTA0NzFjYWViNWEiLCJOYW1lIjoibWVydmF0IGdvbWFhIiwiRW1haWwiOiJtZXJvQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwMTUyMTY0MSwiZXhwIjoxNzA0MTEzNjQxfQ.rxFL5Mr3knQ4o6cnRd2Acd_mw3ywIB0IZt_YTnzAaP8"

describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing User App",()=>{

        describe("GET /getAllUsers",()=>{
           test("should read all users",async()=>{
            const response=await request(app).get('/getAllUsers')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(200)
           })

           test("should handle get users failure",async()=>{
            const response=await request(app).get('/getAllUsers')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })
        })


        describe("POST /register",()=>{
            let data={
                "Name" : "amel ali",
                "Email" : "amel@gmail.com",
                "Password" : "34WEY@!ew",
                "Address" : "egypt",
                "phone" : "01124567890",
                "role" : "customer"  
            }

            test("should add an user",async()=>{
             const response=await request(app)
             .post('/register').send(data)
             .set("Authorization", `bearer ${token}`);
             expect(response.body.result.code).toBe(201)
            })

            test("should handle add user failure",async()=>{
                const response=await request(app)
                .post('/register').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               })

               test("should handle user already exists",async()=>{
                const response=await request(app)
                .post('/register').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.error).toBe("User already exists")
               })
         })
 

         describe("POST /login",()=>{

            let data={
                "Email" : "amel@gmail.com",
                "Password" : "34WEY@!ew",
            }

            test("user should login ",async()=>{
             const response=await request(app).post('/login').send(data)
            .set("Authorization", `bearer ${token}`);
             expect(response.body.result.code).toBe(200)
            })

            test("should return 404 user not found",async()=>{
                const response=await request(app).post('/login').send({
                    "Email" : "aml@gmail.com",
                    "Password" : "34WEY@!ew",   
                })
                .set("Authorization", `bearer ${token}`);
                expect(response.body.result.code).toBe(404)
               })

               test("should return 400 incorrect password",async()=>{
                const response=await request(app).post('/login').send({
                    "Email" : "amel@gmail.com",
                    "Password" : "34WEY@!mk",
                })
                .set("Authorization", `bearer ${token}`);
                expect(response.body.result.error).toBe("incorrect password")
               })

               test("should handle login failure",async()=>{
                const response=await request(app).post('/login').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               })
         })
       
        

         describe("PUT /updateUser/:id",()=>{
        let data={
            "Name" : "amel mostafa",
            "Email" : "amel@gmail.com",
            "Password" : "34WEY@!ew",
            "Address" : "mansoura",
            "phone" : "01124567890",
            "role" : "store"  
        }

        test("should update user",async()=>{
         const response=await request(app)
         .put('/updateUser/65771f46bda5da899859097a')
         .send(data)
        .set("Authorization", `bearer ${token}`);
         expect(response.body.code).toBe(201)
        })

        test("should handle update user failure",async()=>{
            const response=await request(app)
            .put('/updateUser/65771f46bda5da899859097a')
            .send(data)
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })

           test("should handle user not found",async()=>{
            const response=await request(app)
            .put('/updateUser/655f7f1bd829d045ed60b8d0')
            .send(data)
            .set("Authorization", `bearer ${token}`);
            expect(response.body.error).toBe("user is not found")
           })
     })


     describe("DELETE /deleteUser/:id",()=>{
        test("should delete user",async()=>{
         const response=await request(app)
         .delete('/deleteUser/65771f46bda5da899859097a')
        .set("Authorization", `bearer ${token}`);
         expect(response.body.result.code).toBe(200)
        })

        test("should handle delete user failure",async()=>{
            const response=await request(app)
            .delete('/deleteUser/65771f46bda5da899859097a')
           .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })

           test("should handle user not found",async()=>{
            const response=await request(app)
            .delete('/deleteUser/6562f7475cb6ae7b3a1cfae9')
           .set("Authorization", `bearer ${token}`);
            expect(response.body.error).toBe("user is not found")
           })
     })

    })


    afterAll(()=>{
        mongoDB.disconnect()
    })
})

