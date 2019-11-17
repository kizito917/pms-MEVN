const mongoose = require('mongoose');
const Schema=mongoose.Schema

var userSchema = new Schema({
	fullName: {
		type:String,
        require:true,
        trim: true, 
        unique: true,
	},
	companyName: {
		type:String,
        require:true,
        trim: true, 
        unique: true,
	},
	phoneNumber: {
		type:Number,
        require:true,
        trim: true, 
        unique: true,
	},
	email: {
		type:String,
        require:true,
        trim: true, 
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
	},
	password: {
		type: String,
		require: true
	},
	created_dt:{
        type:Date,
    	require:true
    }
});

module.exports=mongoose.model('User',userSchema);