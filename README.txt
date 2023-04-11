This is a simple food delivery application made with Nodejs(version19) and MongoDB (version 6).
You can see all the dependencies used in the package.json file.

Guest Users:
The guest users can see the menu and create orders to the merchant from endpoints
get- http://localhost:9000/api/menu/
post- http://localhost:9000/api/orders/create

The merchant can see all the incoming orders from the endpoint
get- http://localhost:9000/api/orders/

As you can see the application runs on localhost.
More specific documentetion about th endpoints you can see on the swagger page
on url http://localhost:9000/api-docs/.

About the convertion of money I used the third party converter https://fixer.io/
So in the currency query parameter in the http://localhost:9000/api/menu/ endpoint try to use valid values provided by fixer.

The Merchant has also a very simple web page to overview the incoming orders 
on url http://localhost:9000/

On the code level:
the model folder contains all the schemas needed for MongoDB
the routes folder contains all the routes for the application's endpoints
and the public folder contains the User Interface

I spend ~5 hours in two days to create this project.
I use docker to build and run it. And If you have installed docker on your machine
you can simply run: docker-compose up and the application will begin to run on localhost:9000
This command will start and connect 2 docker services
1. mongodb which is the MongoDB
2. docker-node-mongo which is the application

mongodb runs on localhost:27017 and the project's DB name is FoodDeliveryDB.
You can see more about the env variables that were used to authenticate the MongoDB on docker-compose.yml file.

The entry file of the application in index.js
Upon the first execution index.js creates dummy data to the menus collection of mongodb


This project is meant for code interview and I tried to demostrate my skills while keeping the application as much as to the point as I could.