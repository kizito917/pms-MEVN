const mongoose = require('mongoose');
const Schema=mongoose.Schema

let clientInvoiceSchema = new Schema({
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
	fullName: {
		type: String,
    	require: true
	},
	companyName:{
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
	status: {
		type: String,
		require: true
	},
	created_dt:{
        type: Date,
    	require: true
    }
});

module.exports=mongoose.model('clientInvoice',clientInvoiceSchema);