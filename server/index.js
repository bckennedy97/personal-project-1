const express = require("express");
const massive = require("massive");
const bodyParser = require("body-parser");
const session = require("express-session");
const authController = require("./controllers/authController");
const userController = require("./controllers/userController");
const chartController = require("./controllers/chartController");
const favoritesController = require("./controllers/favoritesController");


const app = express();

require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET);

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

//admin
app.get("/admin/user-info",chartController.getAllCharts)
app.get("/admin/users",userController.getAllUsers)
app.get("/admin/users/:id",userController.getUser)

//user
app.put("/user/:id",userController.updateUser)

//charts
app.get("/charts/:id",chartController.getChart)
app.post("/charts",chartController.createChart)
// app.put("/charts/:id",chartController.editChart)
app.delete("/charts/:id",chartController.deleteChart)

//Favorites
app.get("/favorites/:id", favoritesController.getFavorites)
app.post("/favorites/:id", favoritesController.addFavorite)
app.delete("/favorites/:id/:uid", favoritesController.deleteFavorite)


//auth0
app.get("/auth",authController.login)
app.get("/api/user-data",authController.getUserData)
app.post("/api/logout",authController.logout)


//stripe
app.post("/api/stripe", (req, res) => {
 const stripeToken = req.body;
 console.log(stripeToken)
 stripe.charges.create({
     amount: 1000,
     currency: 'usd',
     description: 'Example Charge',
     source: stripeToken.body
   }, function(err, charge) {
       console.log('charge', charge)
       if(err){
         res.send({
             success: false,
             message: 'Error'
         })
       } else {
         res.send({
         success: true,
         message: 'Success'
      })
       }
   });

});

const PORT = 4005;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))