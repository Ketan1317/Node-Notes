const app =require("express");

app.get("/",(req,res) => {
    res.send(`Hello ${req.query.name} How are you`)
})
app.get("/about",(req,res) => {
    res.send(`Hello ${req.query.id} This is about page`)
})

app.listen(3000,() => {
    console.log("Server started at port 3000")
})