import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_EMAIL_PASSWORD, // Gmail app password
  },
});

export const sendMail = async ({ name, email, message }) => {
  return await transporter.sendMail({
    from: email,
    to: process.env.MY_EMAIL,
    subject: `New message from ${name}`,
    text: message,
  });
};
