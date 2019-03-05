const express = require("express");
const massive = require("massive");
const bodyParser = require("body-parser");
const session = require("express-session");
const authController = require("./controllers/authController");
const userController = require("./controllers/userController");
const chartController = require("./controllers/chartController");



const app = express();

require("dotenv").config();

app.use(bodyParser.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
)

massive(process.env.CONNECTION_STRING).then((db)=>{
    app.set("db",db);
    console.log("connected to db")
})


app.get("/admin/user-info",chartController.getAllCharts)
app.get("/admin/users",userController.getAllUsers)
app.get("/admin/users/:id",userController.getUser)

app.get("/charts/:id",chartController.getChart)
app.post("/charts",chartController.createChart)
app.put("/charts",chartController.editChart)
app.delete("/charts/:id",chartController.deleteChart)

app.get("/auth",authController.login)
app.get("/api/user-data",authController.getUserData)


const PORT = 4005;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))