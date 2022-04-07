const productController = require('../controllers/controller.products');
const router = require('express').Router();
const auth = require('../middlewares/auth');

router.get('/', productController.get); // read
router.get('/:id', productController.getById); // read by id
router.post('/', productController.post); // create
router.put('/:id', productController.put); // update
router.delete('/:id', productController.delete); // delete

module.exports = router;
