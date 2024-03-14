import { Router } from "express";
import { addFile, login, register } from "../../controllers/v1/admin/adminController.js";
import { check } from "express-validator";
import authCheck from "../../middlewares/authCheck.js";
import { uploadFile } from "../../middlewares/multer/fileUpload.js";

const router = Router()


router.post('/register',  register)

router.post('/login', login)

// router.use(authCheck)

router.post('/add/file',uploadFile.single('file'), addFile)

export default router; 