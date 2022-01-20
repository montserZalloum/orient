var express = require('express');
var path = require('path');
var router = express.Router();
const basicAuth = require('express-basic-auth');

var basicAuthOptions = {
    users: {
        'admin': 'Awi$N0tEzy',
    },
    challenge: true
};

var basicAuthObj = basicAuth(basicAuthOptions);

/* Routes */
router.get('/', require('../controllers/adminpageController.js').getAdminpage);
router.put('/uploadImage', require('../controllers/adminController.js').uploadImage);



/* Routes */
//router.get('/list', basicAuthObj, require('../controllers/usersController.js').getUsersListPage);
//router.post('/resendsms', require('../controllers/usersController.js').getExistingUserCoupon);
//router.post('/sendsms', require('../controllers/usersController.js').generateCoupon);

module.exports = router;
