import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    host: process.env.SMPT_HOST, // Corrected from SMTP_HOST
    port: process.env.SMPT_PORT, // Corrected from SMTP_PORT
    auth: {
      user: process.env.SMPT_EMAIL, // Corrected from SMTP_HOST to SMPT_EMAIL
      pass: process.env.SMPT_PASSWORD, // Corrected from SMTP_PASSWORD to SMPT_PASSWORD
    },
  });

  const message = {
    from: `${process.env.SMPT_FROM_NAME} <${process.env.SMPT_FROM_EMAIL}>`, // Fixed formatting
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transport.sendMail(message);
};

export default sendEmail;
