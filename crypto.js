
const http=require("http")
const fs=require("fs")
const{parse}=require("querystring") 
const crypto =require("crypto")
const {MongoClient}=require("mongodb")


http.createServer((req,res)=>{
    if(req.method==="POST"){
        if(req.headers["content-type"]==="application/x-www-form-urlencoded"){


let body=""
req.on("data",(chunk)=>{
    body+=chunk
})

req.on("end",()=>{


    async function db(){
    let client=await MongoClient.connect("mongodb://127.0.0.1:27017")
    let database= await client.db("UserDB").collection("user").insertOne(user)


    console.log(database);
    }
    db()

    let username=parse(body).name
    let password=parse(body).password
    console.log(username,password);
    let hashedPassword = crypto.createHmac("sha512","secret").update(password).digest("hex")
    
    let user={
        name:username,
        password:hashedPassword
    }

    res.end(JSON.stringify(user))

   
})

        }
    }
    else{
        if(req.url==="/"){
            let html=fs.createReadStream("./crypto.html","utf-8")
            html.pipe(res)
        }
        else{
            res.end("page is not found")
        }}
    }).listen(5000,(err)=>{
        if(err)console.log(err);
        console.log("server is running on port 5000");
    })
    



 

