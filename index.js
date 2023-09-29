const express=require('express')
const app=express()
const port=8800
const cookieParser=require('cookie-parser')
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.json())
app.use(cookieParser())
app.get("/",(req,res)=>{
    res.send("hello boy")
})
const user=require('./database/user')
app.use(user)
app.listen(port,()=>{
    console.log(`listening to the port http://localhost:${port}`)
})