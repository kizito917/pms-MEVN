const mongoose = require('mongoose');
const Schema=mongoose.Schema

let documentSchema = new Schema({
	id: {
			type: mongoose.Schema.Types.ObjectId,
	        ref: "User" 
		},
	client: {
		fullName: {
			type: String,
			require: true
		}
	},
	docName: {
		type: String,
		require: true
	},
	docContentUrl : {
		type: String
	},
	created_dt: {
		type: Date,
		require: true
	}

})

module.exports = mongoose.model('document',documentSchema)