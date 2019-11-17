const express = require('express');
const router=express.Router();
const User = require('../../models/user');
const appointment = require('../../models/appointment');
const jwt = require('jsonwebtoken');

//route for users to book appointment
router.post('/appointment', isValidUser , (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
			if (authData) {
				req.params = authData;
				User.findOne({_id: req.params.user.id}, (err, result) => {
					if (err) {
						res.status(400).json({
							message: 'Unable to fetch data'
						})
					} else {
						var bookAppointment = new appointment({
							companyName: result.companyName,
							appointmentDate: req.body.appointmentDate,
							appointmentMessage: req.body.appointmentMessage,
							status: 'pending',
							client: {
								id: req.params.user.id,
								fullName: req.params.user.fullName
							},
							created_dt: Date.now()
						});
						console.log(bookAppointment)
						bookAppointment.save((err, result) => {
							if (err) {
								return res.status(501).json({
									message: 'Not Implemented'
								})
							} else {
								return res.status(200).json({
									message: 'Appointment Booked Successfully'
								});
							}
						});
					}
				});
			} else {
				res.status(403).json({message: 'Unauthorized'})
			}
		})
	});

//router for each users to view all their booked appointment
router.get('/myBookedAppointments', isValidUser, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (err) {
			return res.status(403).json({message: 'Unauthorized'})
		} else {
			req.params = authData
			appointment.find({}, (err, result) => {
				if (err) {
					return res.status(400).json({message: 'Unable to process request'})
				} else {
					console.log(result.client.id)
					// return res.status(200).json({
					// 	data: result
					// })
				}
			})
			// console.log(req.params)
			// res.status(200).json({getMe: req.params})
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