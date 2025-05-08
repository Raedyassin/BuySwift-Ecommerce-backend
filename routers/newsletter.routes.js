import { addSubscribtion } from "../controllers/newsletter.controller.js";
import express from "express";

const router = express.Router();

router.route("/").post(addSubscribtion);


export default router;