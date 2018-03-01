
const nodemailer    =   require('nodemailer');

module.exports.sendEmail=(req,res)=>{
    
const output = `
    <p>You have a new feedback message</p>
    <h3> Feedback message </h3>
    <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Registration No: ${req.body.reg}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
`
;

        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'from@mail.com',
        pass: 'yourpassword'
        },tls:{
        rejectUnauthorized:false
        }
        });

        // setup email data with unicode symbols
        let mailOptions = {
        from:    '"Nodemailer Contact" <from@mail.com>',   // sender address
        to:      'tomail@mail.com',                           // list of receivers
        subject: 'Node Contact Request',                            // Subject line
        text:    'Hello world?',                                   // plain text body
        html: output                                              // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('contact', {msg:'Email has been sent'});
        });

}