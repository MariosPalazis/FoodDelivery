const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
//Import Routes
const menuRoute = require('./routes/menus');
const ordersRoute = require('./routes/orders');
//Import Model
const menuModel = require('./models/Menus');
const path = require('path');

dotenv.config();
app.use(express.json());

//Connect to db
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'FoodDeliveryDB',
  })
  .then( async() => {
    console.log('Connected to the Database.');
    //initialize db first time
    const menuCount = await menuModel.find({}).count();
    if(menuCount === 0){
      await menuModel.insertMany([
        {
          item: "Nuggets",
          category: "Appetizers",
          price: 10,
          description: "Made from chicken"
        },
        {
          item: "Salad",
          category: "Appetizers",
          price: 5,
          description: "Who orders salad"
        },
        {
          item: "Water 500ml",
          category: "Drinks",
          price: 0.5,
        },
        {
          item: "Cola",
          category: "Drinks",
          price: 3.5,
        },
        {
          item: "Duck",
          category: "Main Dishes",
          price: 12,
          description: "Sweet chili"
        },
        {
          item: "Mousakas",
          category: "Main Dishes",
          price: 12.5,
          description: "Traditional"
        },
        {
          item: "Steak",
          category: "Main Dishes",
          price: 20,
          description: "Rib eye"
        },
      ])
    }
  })
  .catch(err => console.error(err));



  //Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Food Delivery App",
      version: "1.0.0",
      description:
        "Food Delivery App"
    },
    servers: [
      {
        url: "http://localhost:9000",
      }
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);


//Middleware Routes
app.use('/api/menu', menuRoute);
app.use('/api/orders', ordersRoute);

app.use(express.static('public'));



app.listen( 9000, '0.0.0.0' , ()=>{
  console.log('Server running on localhost:9000!');
});


app.get('/',function(req,res) {
  res.sendFile(path.join(__dirname+'/public/ui/index.html'));
});