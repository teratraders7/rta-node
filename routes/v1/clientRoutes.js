import { Router } from "express";
import { getPdfPath } from "../../controllers/v1/client/clientController.js";

const router = Router()

router.post('/download', getPdfPath)

export default router; 