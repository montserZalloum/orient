var express = require('express');
var path = require('path');
var router = express.Router();
const basicAuth = require('express-basic-auth');

var basicAuthOptions = {
    users: {
        'admin': 'tw1234',
    },
    challenge: true
};

var basicAuthObj = basicAuth(basicAuthOptions);

/* Routes */
router.get('/',require('../controllers/homepageController.js').getHomepage);

// about us
router.get('/about',require('../controllers/aboutuspageController.js').getAboutUspage);

// contact us
router.get('/contact-us',require('../controllers/contactuspageController.js').getContactUspage);
router.post('/contact-us',require('../controllers/contactusController').sendMessage);

// products
router.get('/products',require('../controllers/productspageController').getProductspage);
router.get('/product/:product',require('../controllers/productspageController').getProductpage);

// projects
router.get('/projects',require('../controllers/projectspageController').getProjectspage);


// *******
// admin
// *******
router.get('/admin',basicAuthObj ,require('../controllers/adminpageController.js').getAdminpage);
// about us
router.get('/admin/about-us',basicAuthObj ,require('../controllers/aboutuspageController.js').getAdminAboutUspage);
router.post('/admin/about-us',basicAuthObj ,require('../controllers/aboutusController.js').saveData);

// resources
router.get('/admin/resources',basicAuthObj ,require('../controllers/resourcespageController').getAdminResourcespage);
router.post('/admin/resources',basicAuthObj ,require('../controllers/resourcesController.js').saveData);
// products
router.get('/admin/products',basicAuthObj ,require('../controllers/productspageController.js').getAdminProductspage);
router.post('/add-product',basicAuthObj ,require('../controllers/productsController.js').saveData);
router.post('/edit-product',basicAuthObj ,require('../controllers/productsController.js').editData);
router.post('/remove-product',basicAuthObj ,require('../controllers/productsController.js').removeProduct);
// projects
router.get('/admin/projects',basicAuthObj ,require('../controllers/projectspageController.js').getAdminProjectspage);
router.post('/add-project',basicAuthObj ,require('../controllers/projectsController.js').saveData);
router.post('/edit-project',basicAuthObj ,require('../controllers/projectsController.js').editData);
router.post('/remove-project',basicAuthObj ,require('../controllers/projectsController.js').removeProject);

router.post('/image-upload',basicAuthObj ,require('../controllers/adminController.js').uploadImage);



/* Routes */
//router.get('/list', basicAuthObj, require('../controllers/usersController.js').getUsersListPage);
//router.post('/resendsms', require('../controllers/usersController.js').getExistingUserCoupon);
//router.post('/sendsms', require('../controllers/usersController.js').generateCoupon);

module.exports = router;
