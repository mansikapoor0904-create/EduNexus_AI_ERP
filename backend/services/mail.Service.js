const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // your email
    pass: process.env.SMTP_PASS, // your email password or app password
  },
});

const sendCredentialsEmail = async (email, name, password, role) => {
  try {
    const mailOptions = {
      from: `"EduNexus AI" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your EduNexus Account Credentials",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E8E0D1; border-radius: 10px;">
          <h2 style="color: #800020;">Welcome to EduNexus, ${name}!</h2>
          <p>Your account has been created as a <strong>${role}</strong>.</p>
          <p>Here are your temporary login credentials:</p>
          <div style="background: #FDFBF7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0 0 0;"><strong>Password:</strong> <span style="font-family: monospace; font-size: 1.2em;">${password}</span></p>
          </div>
          <p style="color: #C62828;"><strong>Important:</strong> You must change your password immediately after your first login.</p>
          <a href="${process.env.FRONTEND_URL}/login" style="display: inline-block; background: #800020; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 10px;">Login Now</a>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Credentials email sent to ${email}`);
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error.message);
  }
};

module.exports = { sendCredentialsEmail };