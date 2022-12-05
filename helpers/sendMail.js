const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_KEY);

const sendMail = async (email, verificationToken) => {
  try {
    await sgMail.send({
      from: "roman.radakhevych@gmail.com",
      to: email,
      subject: "Registration message",
      html: `Please, follow this <a href= "http://localhost:3000/api/users/verify/${verificationToken}">link</a> to complete your regisration.`,
    });

    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMail;
