const mongoose = require('mongoose');
const Schema = mongoose.Schema

let companyExpenseSchema = new Schema({
	companyName: {
		type: String,
		require: true,
	},
	clientName: {
		type: String,
		require: true
	},
	dateIssued: {
		type: Date,
		require: true
	},
	dateDue: {
		type: Date,
		require: true
	},
	serviceRendered: {
		type: String,
		require: true
	},
	invoiceNumber: {
		type: String,
		require: true
	},
	title: {
		type: String,
		require: true
	},
	description: {
		type: String,
		require: true
	},
	qty: {
		type: Number,
		require: true
	},
	price: {
		type: Number,
		require: true
	},
	category: {
		type: String,
		require: true
	}
});

module.exports=mongoose.model('companyExpense', companyExpenseSchema)