const express = require('express');
const router=express.Router();
const getUser = require('../../models/user');
const companyExp = require('../../models/companyExpense');
const jwt = require('jsonwebtoken');

router.get('/clientName', isValidUser, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (err) {
				res.status(403).json({message: 'Unauthorized'})
			} else {
				req.params = authData
				getUser.find({companyName: req.body.companyName}, (err, result) => {
					if (err) {
						console.log(err)
						res.status(400).json()
					} else {
						res.status(200).json({
							result: result[0].fullName
						})
					}
				})
			}
	});
});


//route for creating company expenses by admin
router.post('/createCompanyExpense', isValidUser, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (err) {
			res.status(403).json({message: 'Unauthorized'})
		} else {
			req.params = authData
			var createExpenses = new companyExp({
				companyName: req.body.companyName,
				clientName: req.body.clientName,
				dateIssued: req.body.dateIssued,
				dateDue: req.body.dateDue,
				serviceRendered: req.body.serviceRendered,
				invoiceNumber: req.body.invoiceNumber,
				title: req.body.title,
				description: req.body.description,
				qty: req.body.qty,
				price: req.body.price,
				category: req.body.category
			})
			createExpenses.save((err,result) => {
				if (err) {
					res.status(400).json({
						message: 'Unable to process request'
					})
				} else {
					res.status(200).json({
						message: 'Company Expenses Successfully created',
						result: result
					})
				}
			})
		}
	});
})

//code for editing company expenses
router.get('/createCompanyExpense/:id', isValidUser, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (err) {
			res.status(403).json({message: 'Unauthorized'})
		} else {
			companyExp.findOne({_id: req.params.id}, (err, result) => {
				if (!err) {
					res.status(200).json({
						fetchedData: result
					})
				} else {
					res.status(400).json({message: 'unable to process request'})
				}
			})
		}
	});
});


//route for updating company edited expenses
router.patch('/updateCompanyExpense/:id', isValidUser, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (err) {
			res.status(403).json({message: 'Unauthorized'})
		} else {
			companyExp.findOneAndUpdate({_id: req.params.id}, 
					  {$set: {companyName: req.body.companyName,
							clientName: req.body.clientName,
							dateIssued: req.body.dateIssued,
							dateDue: req.body.dateDue,
							serviceRendered: req.body.serviceRendered,
							invoiceNumber: req.body.invoiceNumber,
							title: req.body.title,
							description: req.body.description,
							qty: req.body.qty,
							price: req.body.price,
							category: req.body.category
					}}, {useFindAndModify: false}, (err, result) => {
						if (err) {
							res.status(400).json({message: 'Unable to update Data'})
						} else {
							companyExp.findOne({_id: req.params.id}, (err, newResult) => {
								if (!err) {
									res.status(200).json({
										message: 'Data updated Successfully',
										updatedData: newResult
									})
								} else {
									res.status(501).json({message: 'Not implemented'})
								}
							});
						}
					})
		}
	});
})

//route for deleting each company created expenses
router.delete('/deleteCompanyExpense/:id', isValidUser, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (err) {
			res.status(403).json({message: 'Unauthorized'})
		} else {
			companyExp.findOneAndRemove({_id: req.params.id}, {useFindAndModify: false}, (err, done) => {
				if (!err) {
					res.status(200).json({message: 'Data Deleted Successfully'})
				} else {
					res.status(400).json()
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