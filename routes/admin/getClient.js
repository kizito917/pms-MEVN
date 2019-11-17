const express = require('express');
const router=express.Router();
const getUser = require('../../models/user');
const getClientAppointment = require('../../models/appointment');
const jwt = require('jsonwebtoken');

//route for getting all registered clients(users) information
router.get('/getClients', isValidUser, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
			if (err) {
				res.status(403).json({message: 'Unauthorized'})
			} else {
				req.params = authData
				getUser.find({}, (err, result) => {
					if (err) {
						console.log(err)
						return res.status(400).json({
							message: 'Bad Request'
						})
					} else {
						res.status(201).json({
							clients: result
					})
				}
			});
		}
	})
});

//route for deleting any users account found suspicious
router.delete('/clients/:id', isValidUser, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (err) {
			res.status(403).json({message: 'Unauthorized'})
		} else {
			getUser.findOneAndDelete({_id: req.params.id}, 
				{useFindAndModify: false},(err, result) => {
					if (err) {
						console.log(err)
						return res.status(400).json({
							message: 'Bad Request'
						})
					} else {
						return res.status(200).json({
							message: 'You have successfully deleted a user',
							info: result
						})
					}
			})
		}
	})
})

router.get('/clientsAppointment', isValidUser, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (err) {
			res.status(403).json({message: 'Unauthorized'})
		} else {
			req.params = authData
			getClientAppointment.find({}, (err, result) => {
				if (err) {
					console.log(err)
					return res.status(400).json({
						message: 'Bad request'
					})
				} else {
					return res.status(200).json({
						fetchedData: result
					})
				}
			})
		}
	})
});

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