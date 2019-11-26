const mongoose = require('mongoose');
const Schema= mongoose.Schema

let appointmentSchema = new Schema({
	companyName: {
		type: String,
		require: true
	},
	email: {
		type: String,
		require: true
	},
	appointmentDate: {
		type: Date,
		require: true
	},
	appointmentMessage: {
		type: String,
		require: true
	},
	status: {
		type: String,
		require: true
	},
	client: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
	        ref: "User" 
		},
		fullName: {
			type: String,
			require: true
		}
	},
	created_dt: {
		type: Date,
		require: true
	}
});

module.exports=mongoose.model('appointment',appointmentSchema)