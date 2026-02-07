const express = require("express");

const auth = require("../middleware/auth.middleware");
const controller = require("../controller/services.controller");

const router = express.Router();

router.post('/', auth, controller.createService);
router.get('/', auth, controller.getServices);
router.get('/:id', auth, controller.getServiceById);
router.put('/:id', auth, controller.updateService);
router.patch('/:id', auth, controller.deleteService);

module.exports = router;
  