const express = require('express');
const mongoose = require('mongoose');
//database connection url
const url = process.env.MONGOLAB_URI || "mongodb://localhost/pms"; // giving access to local database in development mode
																  //and online database in production mode

//creating a connection
const conn = mongoose.connect(url, { useNewUrlParser: true, 
				useCreateIndex: true, 
				useUnifiedTopology: true })
			.then(() => console.log("Database successfully connected"))
			.catch(err => console.log('error in database connection'))

module.exports = conn