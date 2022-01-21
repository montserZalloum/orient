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
// *******
// admin
// *******
router.get('/', require('../controllers/adminpageController.js').getAdminpage);
// about us
router.get('/admin/about-us', require('../controllers/aboutuspageController.js').getAdminAboutUspage);
router.post('/admin/about-us', require('../controllers/aboutusController.js').saveData);
// products
router.get('/admin/products', require('../controllers/productspageController.js').getAdminProductspage);
router.post('/add-product', require('../controllers/productsController.js').saveData);
router.post('/edit-product', require('../controllers/productsController.js').editData);
router.post('/remove-product', require('../controllers/productsController.js').removeProduct);
// projects
router.get('/admin/projects', require('../controllers/projectspageController.js').getAdminProjectspage);
router.post('/add-project', require('../controllers/projectsController.js').saveData);
router.post('/edit-project', require('../controllers/projectsController.js').editData);
router.post('/remove-project', require('../controllers/projectsController.js').removeProduct);

router.post('/image-upload', require('../controllers/adminController.js').uploadImage);



/* Routes */
//router.get('/list', basicAuthObj, require('../controllers/usersController.js').getUsersListPage);
//router.post('/resendsms', require('../controllers/usersController.js').getExistingUserCoupon);
//router.post('/sendsms', require('../controllers/usersController.js').generateCoupon);

module.exports = router;
