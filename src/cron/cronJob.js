import { CronJob } from "cron";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import { generateMessage } from "../utils/bdayMessage.js";

const cronTime = process.env.CRONTIME;
const sender = process.env.EMAIL;
const password = process.env.APPPASSWORD;

const mailTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: sender,
    pass: password,
  },
});

const birthdayJob = new CronJob(cronTime, async () => {
  const today = new Date();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();
  try {
    let successMessage;
    const celebrants = await User.find({
      $expr: {
        $and: [
          { $eq: [{ $dayOfMonth: "$birthday" }, todayDay] },
          { $eq: [{ $month: "$birthday" }, todayMonth] },
        ],
      },
    });
    console.log(celebrants);
    if (celebrants.length) {
      for (const celebrant of celebrants) {
        await mailTransport.sendMail({
          from: sender,
          to: celebrant.email,
          subject: "Happy Birthday",
          text: generateMessage(celebrant.username),
        });
      }
      successMessage = {
        Date: today,
        Message: "Message sent to all celebrants",
      };
      console.log(JSON.stringify(successMessage));
      return;
    }
    successMessage = {
      Date: today,
      Message: "No celebrants",
    };
    console.log(JSON.stringify(successMessage));
    return;
  } catch (err) {
    const errInfo = {
      Error: err.name,
      Date: today,
      Message: err.message,
    };
    console.log(JSON.stringify(errInfo, null, 2));
  }
});

export default birthdayJob;