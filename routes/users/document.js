const express = require('express');
const router=express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const uploadDocs = require('../../models/document');


//multer function for uploading docs
const storage = multer.diskStorage({
	destination: './docFolder/',
  filename:function (req,file,cb) {
     var datetimestamp = Date.now();
     cb(null, file.fieldname + '-' + Date.now());
     filepath = datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
    cb(null, filepath);
  } 
});
const fileFilter=(req,file,cb)=> {
//reject a file
if (file.mimetype==='application/pdf' || 'image/jpeg' || 'image/jpg' || 'image/png' || 'text/plain' || 'application/msword' || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') { 
  cb(null,true);
}else{
  cb(null,false);
 }    
} 

const uploadDoc=multer({
  storage:storage,
  limits:{fileSize :1024*1024*40},
   fileFilter:fileFilter
 });

//router for uploading single document for users
router.post('/singleDoc', isValidUser, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (err) {
			return res.status(403).json({message: 'Unauthorized'})
		} else {
			req.params = authData
				const userDoc = new uploadDocs({
						id: req.params.user.id,
						client : {
							fullName: req.params.user.fullName
						},
						docName: req.body.fileName,
						docContentUrl: req.body.fileUrl,
						created_dt: Date.now()
						})
					userDoc.save((err, result) => {
						if (err) {
							return res.status(400).json({message: 'Unable To process Request'})
						} else {
							return res.status(200).json({
								message: 'File Uploaded',
								file: result
							})
						}
					})
		}
	})
})


//route for getting uploaded documents of a user
router.get('/myDocs', isValidUser, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (!err) {
			req.params = authData
			uploadDocs.find({id: req.params.user.id}, (err, result) => {
				if (result) {
						return res.status(200).json({
							message: 'Documents Fetched',
							datafetched: result
						})
				} else {
					return res.status(400).json({message: 'Unable to process request'})				
				}
			})
		} else {
			return res.status(403).json({message: 'Unauthorized'})
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