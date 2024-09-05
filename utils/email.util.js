const nodemailer = require('nodemailer'); 

exports.sendMail=async(from,to, subject, text)=>{
    try {
const transporter = nodemailer.createTransport({ 
	service: 'gmail', 
	auth: { 
		user: 'jmhmyrft17@gmail.com',
		pass:'qhag egrk zhid xxcj' 
	} 
}); 
	

const mailConfigurations = { 
	from, 
	to,
	subject,
	text,
  }; 


const info=await transporter.sendMail(mailConfigurations)
 console.log(info); 

} catch(error) {
console.log(error);
}
}


