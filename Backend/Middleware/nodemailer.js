var nodemailer = require('nodemailer');


const sendMail =async(OTP,email)=>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '727723eumt084@skcet.ac.in',
      pass: 'skcet123'
    }
  });
  
  var mailOptions = {
    from: '727723eumt084@gmail.com',
    to:email,
    subject: 'Verify Code For Password Change : CoFoundIO',
    text: `Please Enter The Below Code in Your Input To change The Password ${OTP} .  `
  };
  
 const response = await transporter.sendMail(mailOptions);
 if(response){
  return true
 }
 else{
  return false
 }
}


module.exports = sendMail