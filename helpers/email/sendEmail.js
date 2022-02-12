const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY, SENDER_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async data => {
  try {
    await sgMail.send({ ...data, from: SENDER_EMAIL });
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = sendEmail;
