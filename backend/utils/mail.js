import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

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
    port: Number(process.env.MAIL_TRAP_EMAIL_PORT) || 2525,
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
    return info; // important: return result so caller can check
  } catch (error) {
    console.error(`Email failed: ${error}`);
    // rethrow so caller can handle
    throw error;
  }
};



export const EmailVerificationMailGenContent = (name, veriificationUrl) => {
  return {
    body: {
      name,
      intro: "Welcome to Trip guard ! We're very excited to have you on board.",
      action: {
        instructions:
          "To get started with trip guard for safety traveling, please click here:",
        button: {
          color: "#D91F1F",
          text: "Confirm your account",
          link: veriificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export const PasswordResetMailGenContent = (name, PasswordResetUrl) => {
  return {
    body: {
      name,
      intro: "Change your password from here.",
      action: {
        instructions: "Click to reset your password",
        button: {
          color: "#FF1111",
          text: "Reset password",
          link: PasswordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};