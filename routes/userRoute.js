const route = require('express').Router();
const { verifyUser } = require('../middleware/verify');
const controller = require('./../controller/userctrl');
const multer = require('multer')
const path = require('path');


// const storage = multer.diskStorage({
//     destination: 'C:/Users/sunny/notes-nodejsuploads',
//     filename: function (req, file, cb) {
//         if (!file) {
//             cb(err);
//         } else {
//             cb(null, file.fieldname + '-' + Date.now() +
//                 path.extname(file.originalname));

//         }
//     }
// })
// const upload = multer({ dest: 'uploads/', storage: storage })



route.get('/getUser', controller.getposts);
route.get('/profile/:id', verifyUser, controller.profile);
route.post('/signup', controller.signup);
route.post('/login', controller.login);
route.get('/getposts/:id', controller.getposts);
route.post('/forgotpassword', controller.forgotpassword);
route.post('/resetpassword', controller.resetPassword);
route.post('/updateprofile/:id', verifyUser, controller.updateprofile);
//route.post('/upload', upload.single('photo'), controller.uploadimage)
module.exports = route;