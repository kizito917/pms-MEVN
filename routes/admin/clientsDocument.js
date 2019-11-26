const express = require('express');
const router=express.Router();
const documentModel = require('../../models/document');
const jwt = require('jsonwebtoken');

//route to fetch all user uploaded documents
router.get('/getClientDocuments', isValidUser, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (err) {
			return res.status(403).json({message: 'Unauthorized'})
		} else {
			documentModel.find({}, (err, result) => {
				if (err) {
					return res.status(400).json({message: 'Unable to process Request'})
				} else {
					return res.status(200).json({
						message: 'Documents Fetched',
						doc: result
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