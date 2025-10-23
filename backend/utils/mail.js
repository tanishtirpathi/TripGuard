import Mailgen from "mailgen";
import nodemailer from "nodemailer";

export const sendmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Trip guard",
      link: "https://x.com/tanishtirpathi",
    },
  });
  const emailText = mailGenerator.generatePlaintext(options.mailGenContent);

  const emailBody = mailGenerator.generate(options.mailGenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_TRAP_EMAIL_HOST,
    port: process.env.MAIL_TRAP_EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASSWORD,
    },
  });

  const mail = {
    from: "Trip-guard <test@mailtrap.io>",
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailBody,
  };
  try {
    const info = await transporter.sendMail(mail);
    console.log("Mail sent: ", info);
    console.log("mail send ho gya bsdk ");
  } catch (error) {
    console.error(`email faild ho gya hai bevkoof  ${error}`);
  }
};
export const EmailVerificationMailGenContent = (name, veriificationUrl) => {
  return {
    body: {
      name: name,
      intro: "Welcome to Trip guard ! We're very excited to have you on board.",
      action: {
        instructions: "To get started with trip guard for safty travling  , please click here:",
        button: {
          color: "rgba(217, 31, 31, 1)", // Optional action button color
          text: "Confirm your account",
          link: veriificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};
export const PasswordResetMailGenContent = (name , PasswordResetUrl) => {
  return {
    body: {
      name: name,
      intro: "change your password from here .",
      action: {
        instructions: "Password change kar le bsdk yaha se ",
        button: {
          color: "rgba(255, 17, 17, 1)", // Optional action button color
          text: " yaha ungli kar password change karne ke liye ",
          link: PasswordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};