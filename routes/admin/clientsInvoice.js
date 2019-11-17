const express = require('express');
const router=express.Router();
const getUser = require('../../models/user');
const appointmentModel = require('../../models/appointment');
const invoiceModel = require('../../models/clientInvoice');
const jwt = require('jsonwebtoken');

//router for getting client name if company name is selected
router.post('/getClientName', isValidUser, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (err) {
			return res.status(403).json({message: 'Unauthorized'})
		} else {
			getUser.findOne({companyName: req.body.companyName}, (err, result) => {
				if (!err) {
					return res.status(200).json(result.fullName)
				} else {
					return res.status(400).json({message: 'Bad request'})
				}
			})
		}
	})
})

//router for creating a client invoice by admin
router.post('/createClientInvoice', isValidUser, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (!err) {
			const createInvoice = new invoiceModel({
				dateIssued: req.body.dateIssued,
				dateDue: req.body.dateDue,
				serviceRendered: req.body.serviceRendered,
				invoiceNumber: 'PMS' + req.body.invoiceNumber,
				fullName: req.body.fullName,
				companyName: req.body.companyName,
				title: req.body.title,
				description: req.body.description,
				qty: req.body.qty,
				price: req.body.price,
				status: 'Pending',
				created_dt: Date.now()
			})
			createInvoice.save((err, result) => {
				if (!err) {
					return res.status(200).json({
						message: 'Invoice for client ' + req.body.fullName + ' Successfully generated'
					})
				} else {
					return res.status(400).json({message: 'Unable to process request'})
				}
			})
			// console.log(authData)
		} else {
			return res.status(403).json({message: 'Unauthorized'})
		}
	})
})

//router for admin to fetch all client's generated invoice 
router.get('/allClientsInvoice', isValidUser, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (err) {
			return res.status(403).json({message: 'Unauthorized'})
		} else {
			invoiceModel.find({}, (err, result) => {
				if (err) {
					return res.status(501).json({message: 'Not Implemented'})
				} else {
					return res.status(200).json({
						message: 'Result Fetched',
						dataFetched: result
					})
				}
			})
		}
	})
})

function isValidUser(req, res, next) {
	const bearerHeader = req.headers['authorization'];
	if (typeof bearerHeader !== 'undefined') {
		req.token = bearerHeader;
		next();
	} else {
		res.status(403).json({
			message: 'Unauthorized request'
		})
	}
}

module.exports=router;