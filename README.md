# Shipment Pricing API
This is an API that calcultes shipping costs based on weight, distance and cargo type.

# Features

Some of the interactions that can be done with the API include:
<li> Creating an account and logging in before calling the API (this has been disabled to ensure ease of use) </li> 
<li> Inputting the request body and then getting an output of the shipping costs. </li>

# Getting Started

These instructions will get you through the steps required in setting up the project on your local machine for development and testing purposes.

# Prerequisites

Firstly, you need to install node.js on your system by using the link <a href="https://nodejs.org/en">nodejs.org/en</a>, follow the instructions on the website to get started.</br></br>
Secondly, you need to clone this repository or download the zip file. To do this, you need to install git on your local computer from <a href="https://https://git-scm.com/downloads">git-scm.com/downloads</a> so as to be able to access the git bash user interface terminal.</br></br>
Thirdly, make sure you have a text editor like sublimetext, visual studio code, atom etc. to be able to type in and edit your codes.</br></br>

# Installing

Installing the application is a quite easy. After cloning the repository to your local computer with the "git clone" command e.g. git clone https://github.com/kingsley010/Politico.git. Change directory into the folder on your most preferred terminal, let's say git bash and run the command: <strong>npm install</strong>. This will install all the dependencies and development dependencies on your local machine.</br></br>
Once the installation has been completed, the server can be started with the <strong>npm run server</strong> command which runs the start script (nodemon app.js --exec babel-node --presets babel-preset-env) in the package.json file.</br></br>
The same process can be used in running the tests by typing the command: <strong>npm start</strong> which runs the test script in the package.json file.

# Api Endpoints

The api endpoints that can currently be accessed are as follows:</br></br>

# GET /api/v1/all
This takes one to the homepage.

# GET /api/v1/users
This takes one to the user page.

# POST /api/v1/signup/
This is used to register.

# POST /api/v1/login
This is used for logging in.

# POST /api/v1/calculateCost
This calculates the shipping cost based on cargo type</br></br>

# DATABASE CONNECTION
The online mongo Atlas database was used in order to allow access to the database from anywhere without having to worry about access to a local computer.

# DUMMY DATA
A seed data (dummy data) can been added into the database for the purpose of this test and can be called using the <strong>npm run seed-data</strong> command. When it is called, it deletes whatever data is in the collection and created fresh one.

# Author

<strong>Kingsley Obioha</strong>

# License

This project is licensed under the <a href="https://opensource.org/licenses/MIT">MIT license </a>

