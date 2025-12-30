import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async ({ email, subject, mailgenContent }) => {

  const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_SMTP_HOST,
  port: Number(process.env.MAILTRAP_SMTP_PORT),
  auth: {
    user: process.env.MAILTRAP_SMTP_USER,
    pass: process.env.MAILTRAP_SMTP_PASS,
  },
});

  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "3001 Industries Operational Function",
      link: "https://3001-industries.com/",
    },
  });

  const mailText = mailGenerator.generatePlaintext(mailgenContent);
  const mailHTML = mailGenerator.generate(mailgenContent);

  await transporter.sendMail({
    from: '"3001 Industries" <no-reply@3001-industries.com>',
    to: email,
    subject,
    text: mailText,
    html: mailHTML,
  });
};

const mailgenVerificationMail = (username, verificationUrl) => ({
  body: {
    name: username,
    intro: "Welcome to 3001 Industries. We are always excited to have you on board.",
    action: {
      instructions: "To get started, press the button.",
      button: {
        color: "#1bc263",
        text: "Yeah!",
        link: verificationUrl,
      },
    },
    outro: "If you did not create an account, why not?",
  },
});

const mailgenPasswordForgetMail = (username, passwordResetUrl) => ({
  body: {
    name: username,
    intro: "Looks like you forgot your password.",
    action: {
      instructions: "Click the button below to reset it.",
      button: {
        color: "#830101",
        text: "Reset password",
        link: passwordResetUrl,
      },
    },
  },
});

export {
  sendMail,
  mailgenVerificationMail,
  mailgenPasswordForgetMail,
};
