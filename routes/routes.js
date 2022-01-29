var express = require('express');
var path = require('path');
var router = express.Router();
const basicAuth = require('express-basic-auth');
var errorpageController = require("../controllers/errorpageController.js");
var basicAuthOptions = {
    users: {
        'admin': 'tw1234',
    },
    challenge: true
};

var basicAuthObj = basicAuth(basicAuthOptions);

/* Routes */
router.get('/',require('../controllers/homepageController.js').getHomepage);
router.get('/:lang(en|ar)',require('../controllers/homepageController.js').getHomepage);

// about us
router.get('/:lang(en|ar)/about',require('../controllers/aboutuspageController.js').getAboutUspage);

// contact us
router.get('/:lang(en|ar)/contact-us',require('../controllers/contactuspageController.js').getContactUspage);
router.post('/contact-us',require('../controllers/contactusController').sendMessage);


// projects
router.get('/:lang(en|ar)/projects',require('../controllers/projectspageController').getProjectspage);

// products
router.get('/:lang(en|ar)/products',require('../controllers/productspageController').getProductspage);
router.get('/:lang(en|ar)/:product',require('../controllers/productspageController').getProductpage);



// *******
// admin
// *******
router.get('/admin',basicAuthObj ,require('../controllers/adminpageController.js').getAdminpage);
// about us
router.get('/admin/about-us',basicAuthObj ,require('../controllers/aboutuspageController.js').getAdminAboutUspage);
router.post('/admin/about-us',basicAuthObj ,require('../controllers/aboutusController.js').saveData);
// contact us
router.get('/admin/contact-us',require('../controllers/contactuspageController.js').getAdminContactUspage);
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


//not found
router.get('/:lang(en|ar)/*', errorpageController.get404);
router.get('/*', errorpageController.get404);
/* Routes */
//router.get('/list', basicAuthObj, require('../controllers/usersController.js').getUsersListPage);
//router.post('/resendsms', require('../controllers/usersController.js').getExistingUserCoupon);
//router.post('/sendsms', require('../controllers/usersController.js').generateCoupon);

module.exports = router;
