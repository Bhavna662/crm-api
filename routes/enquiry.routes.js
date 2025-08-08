import express from "express";
import * as enquiryCtrl from "../controller/enquiry.controller.js";

const router = express.Router();

router.post("/", enquiryCtrl.create);
router.get("/", enquiryCtrl.list);
router.get("/:id", enquiryCtrl.getById);
router.put("/:id", enquiryCtrl.update);
router.delete("/:id", enquiryCtrl.remove);

export default router;
