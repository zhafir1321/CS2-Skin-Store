const express = require("express");
const AuthController = require("../controllers/authController");
const userAuthentication = require("../middleware/userAuthentication");
const ItemController = require("../controllers/itemController");
const router = express.Router();
const upload = require("../utils/multer");
const TransactionController = require("../controllers/transactionController");
const uploadImage = upload.single("imgUrl");

router.post("/login", AuthController.postLogin);
router.post("/google-login", AuthController.googleLogin);
router.post("/register", AuthController.postRegister);

router.use(userAuthentication);

router.delete("items/:id", ItemController.deleteItem);
router.get("/items/buy-item/", TransactionController.initiateMidtransTrx);
router.patch("/items/check-item/", TransactionController.updateOrderStatus);
router.post("/items", uploadImage, ItemController.postItem);
router.get("/items", ItemController.getItems);
router.get("/items/:id", ItemController.getItemsById);
router.delete("/items/:id", ItemController.deleteItem);
router.put("/items/:id", uploadImage, ItemController.updateItem);

module.exports = router;
