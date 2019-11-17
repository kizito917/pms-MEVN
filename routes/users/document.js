const express = require('express');
const router=express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const uploadDocs = require('../../models/document');


//multer function for uploading docs
const storage = multer.diskStorage({
  filename:function (req,file,cb) {
     var datetimestamp = Date.now();
     cb(null, file.fieldname + '-' + Date.now());
     filepath = datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
    cb(null, filepath);
  } 
});
const fileFilter=(req,file,cb)=> {
//reject a file
if (file.mimetype==='application/pdf') { 
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
router.post('/singleDoc', uploadDoc.single('file'), isValidUser, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (err) {
			return res.status(403).json({message: 'Unauthorized'})
		} else {
			req.params = authData
			file = req.file
			return res.status(200).json({
				message: 'File Uploaded',
				file
			})
			// if (req.file) {
			// 	console.log(req.file)
			// } else {
			// 	console.log('No file')
			// }
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