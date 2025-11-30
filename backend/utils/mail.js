// import Mailgen from "mailgen";
// import { Resend } from "resend";
// import dotenv from "dotenv";
// dotenv.config();

// const resend = new Resend(process.env.RESEND_EMAIL_API);

// export const sendmail = async (options) => {
//   const mailGenerator = new Mailgen({
//     theme: "default",
//     product: {
//       name: "Trip guard",
//       link: "https://x.com/tanishtirpathi",
//     },
//   });

//   // Generate email content
//   const emailText = mailGenerator.generatePlaintext(options.mailGenContent);
//   const emailBody = mailGenerator.generate(options.mailGenContent);

//   try {
//     const response = await resend.emails.send({
//       from: process.env.MAIL_FROM || "Trip-guard <onboarding@resend.dev>",
//       to: options.email,
//       subject: options.subject,
//       text: emailText,
//       html: emailBody,
//     });

//     console.log("Mail sent:", response);
//     return response;
//   } catch (error) {
//     console.error("Email failed:", error);
//     throw error;
//   }
// };

// // --------------------------------------------------------------
// // 📨 Email Templates
// // --------------------------------------------------------------

// export const EmailVerificationMailGenContent = (name, verificationUrl) => {
//   return {
//     body: {
//       name,
//       intro: "Welcome to Trip guard! We're very excited to have you onboard.",
//       action: {
//         instructions:
//           "To get started with safe traveling, please click here:",
//         button: {
//           color: "#D91F1F",
//           text: "Confirm your account",
//           link: verificationUrl,
//         },
//       },
//       outro:
//         "Need help? Just reply to this email — we'd love to help.",
//     },
//   };
// };

// export const PasswordResetMailGenContent = (name, passwordResetUrl) => {
//   return {
//     body: {
//       name,
//       intro: "You can reset your password using the button below.",
//       action: {
//         instructions: "Click to reset your password:",
//         button: {
//           color: "#FF1111",
//           text: "Reset Password",
//           link: passwordResetUrl,
//         },
//       },
//       outro:
//         "If you didn’t request this, you can ignore this email.",
//     },
//   };
// };
