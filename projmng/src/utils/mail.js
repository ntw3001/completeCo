import Mailgen from 'mailgen';
import nodeMailer from 'nodemailer';

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: '3001 Industries Operational Function',
      link: 'https://3001-industries.com/',
    },
  })
  const mailText = mailGenerator.generatePlaintext (options.mailgenContent)
  const mailHTML = mailGenerator.generate (options.mailgenContent)

  const transporter = nodeMailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });
  const mail = {
    from: '"3001 Industries" <no-reply@3001-industries.com>',
    to: options.email,
    subject: options.subject,
    text: mailText,
    html: mailHTML,
  };

  try {
    await transporter.sendMail(mail);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const mailgenVerificationEmail = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: 'Welcome to 3001 Industries. We are always excited, and have you on board',
      action: {
        instructions: 'To get started, press the button.',
        button: {
          color: '#1bc263ff',
          text: 'Yeah!',
          link: verificationUrl,
        },
      },
      outro: 'If you did not create an account, fuck you.',
    },
  };
};

const mailgenPasswordForgetEmail = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: 'Yeah some dummy forgot their email. Wait that was you? Oh I mean uh, some dummy forgot your email',
      action: {
        instruction: 'Touch the buton to remember it then dummy',
        button: {
          color: '#830101ff',
          text: 'I am ashamed',
          link: passwordResetUrl,
        }
      }
    }
  }
}

export { sendEmail, mailgenVerificationEmail, mailgenPasswordForgetEmail };
