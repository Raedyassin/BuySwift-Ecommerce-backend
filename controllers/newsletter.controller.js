import NewsletterSubscriber from "../models/newsletterSubscriber.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import User from '../models/user.model.js'
import { SUCCESS, FAIL } from "../utils/httpStatucText.js";

const addSubscribtion = asyncHandler(async (req, res, next) => {
  const email = req.body.email?.trim()?.toLowerCase(); 
  if(!email){
    return res.status(400).json({ status: FAIL, message: "Email is required" })
  }
  const hasAccount = await User.findOne({ email }); 
  if(hasAccount){
    return res.status(409).json({ status: FAIL, message: "You are have already account" })
  }
  const existSubscriber = await NewsletterSubscriber.findOne({ email });
  if (existSubscriber) {
    return res.status(409).json({ status: FAIL, message: "Email already subscribed" })
  }
  const newSubscriber = new NewsletterSubscriber({ email });
  await newSubscriber.save();
  res.json({ status: SUCCESS, data: { subscriber: true } });
});

export { addSubscribtion };