const express = require('express');
const router=express.Router();
const jwt = require('jsonwebtoken');
const userInfo = require('../../models/user');



//router to get user profile sign up informations
router.get('/profileDetails', isValidUser, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (err) {
			return res.status(403).json({message: 'Unauthorized'})
		} else {
			req.params = authData
			userInfo.findOne({_id: req.params.user.id}, (err, result) => {
				if (err) {
					return res.status(400).json({message: 'Unable to process request'})
				} else {
					return res.status(200).json({
						message: 'Profile Details Fetched',
						result
					})
				}
			})
		}
	})
})



//authentication route for user in all authenticated route
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