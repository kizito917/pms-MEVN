const mongoose = require('mongoose');
const Schema=mongoose.Schema

let documentSchema = new Schema({
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
	document: [
		{
			docId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Appointment"
			},
			docUrl : {
				type: String
			}
		}
	],
	created_dt: {
		type: Date,
		require: true
	}

})

module.exports = mongoose.model('document',documentSchema)