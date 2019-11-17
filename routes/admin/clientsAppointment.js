const express = require('express');
const router=express.Router();
const getUser = require('../../models/user');
const appointmentModel = require('../../models/appointment');
const jwt = require('jsonwebtoken');

//router to get all clients booked appointment
router.get('/clientsAppointment', isValidUser, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (err) {
			res.status(403).json({message: 'Unauthorized'})
		} else {
			appointmentModel.find({}, (err, result) => {
				if (!err) {
					return res.status(200).json({
							message: 'Appointment Fetched',
							result: result
					})
				} else {
					return res.status(400).json({message: 'Bad Request'})
				}
			})
		}
	})
})


//router to get specific client booked appointment details
router.get('/clientsAppointment/:id', isValidUser, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (err) {
			return res.status(403).json({message: 'Unauthorized'})
		} else {
			appointmentModel.findById({_id: req.params.id}, {useFindAndModify: false},
				(err, result) => {
					return res.status(200).json({
						message: 'Client Appointment Details Fetched',
						Data: result
					})
			})
		}
	})
})

//router to confirm each clients booked appointment with pending status
router.patch('/confirmClientsAppointment/:id', isValidUser, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (err) {
			res.status(403).json({message: 'Unauthorized'})
		} else {
			appointmentModel.findByIdAndUpdate({_id: req.params.id}, {$set: {status: 'Confirmed'}}, 
				{useFindAndModify: false},(err, result) => {
					if (!err) {
						appointmentModel.find({}, (err, result) => {
							return res.status(200).json({
								message: 'Client Appointment Confirmed Successfully',
								Data: result
							})
						})
					} else {
						res.status(400).json({message: 'Unable to process request'})
					}
			})
		}
	})
})

//router to cancel clients booked appointment
router.patch('/cancelClientsAppointment/:id', isValidUser, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (!err) {
			appointmentModel.findByIdAndUpdate({_id: req.params.id}, {$set: {status: 'Cancelled'}},
				{useFindAndModify: false}, (err, result) => {
					if (err) {
						return res.status(400).json('Unable to process request')
					} else {
						appointmentModel.find({}, (err, result) => {
							return res.status(200).json({
								message: 'Client Appointment Cancelled Successfully',
								Data: result
							})
						})
					}
				})
		} else {
			return res.status(403).json({message: 'Unauthorized'})
		}
	})
})


//router to permanently delete a particular clients appointment from database
router.delete('/deleteClientsAppointment/:id', isValidUser, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (!err) {
			appointmentModel.findByIdAndDelete({_id: req.params.id}, {useFindAndModify: false},
			 (err, result) => {
			 	if (err) {
			 		return res.status(400).json({message: 'Unable to delete appointment'})
			 	} else {
			 		appointmentModel.find({}, (err, result) =>{
			 			if (!err) {
			 				return res.status(200).json({
			 					message: 'Appointment Deleted Successfully',
			 					Data: result
			 				})
			 			} else {
			 				return res.status(400).json({message: 'Unable to process request'})
			 			}
			 		})
			 	}
			 })
		} else {
			return 
			res.status(403).json({
				message: 'Unauthorized'
			})
		}
	})
})

//router to reschedule a client appointment
router.put('/rescheduleClientsAppointment/:id', isValidUser, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (err) {
			return res.status(403).json({message: 'Unauthorized'})
		} else {
			appointmentModel.findByIdAndUpdate({_id: req.params.id}, 
				{$set: {status: 'Re-scheduled', appointmentDate: req.body.appointmentDate}}, {useFindAndModify: false},
				(err, result) => {
					if (err) {
						return res.status(400).json({message: 'Unable to reschedule appointment'})
					} else {
						appointmentModel.find({}, (err, result) => {
							if (!err) {
								return res.status(200).json({
									message: 'Appointment Rescheduled Successfully',
									Data: result
								})
							} else {
								return res.status(400).json({message: 'Unable to process request'})
							}
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