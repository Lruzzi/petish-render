const { isValidObjectId } = require("mongoose");
const { sendError } = require("../data/errStatus");
const users = require('../models/users')
const otpModel = require('../models/verifToken')
const { verifyEmailTemplate } = require("../utils/emailTemplate")
const {transporter } = require("../utils/mailer")

async function verifyEmail(req, res){
    const {id, token} = req.query;
    if(!isValidObjectId(id)){
        return sendError(res, 'ID not Found')
    }
    const user = await users.findById(id)
    if(!user){
        return sendError(res, 'User not Found')
    }

    if(user.verified){
        return sendError(res, 'Account has verified already')
    }
    const otp = await otpModel.findOne({owner: user._id})
    if(!otp){
        return sendError(res, 'Verification Request not Found')
    }
    const isMatched = await otp.compareToken(token)
    if(!isMatched){
        return sendError(res, 'OTP is not Valid')
    }
    user.verified = true;

    await otpModel.findByIdAndDelete(otp._id);
    await user.save();
    transporter.sendMail({
        from: 'security@petish.com',
        to: user.email,
        subject: "Petish Account Verified",
        html: verifyEmailTemplate("Now you can Login to Petish")
    })
    res.write(`<html>
    <head>
        <title>PETISH</title>
        <style>
        .center {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          
          }
          .footer {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: rgb(255, 237, 181);
            color: white;
            text-align: center;
          }</style>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head>
    <body>
    <header>
        <div class="container-fluid p-0" style="background-color:white">
            <h3>PETISH EMAIL VERIFICATION</h3>
      </div>
      </div>
        </header>
        <h3>your email has been verified succesfully</h3>
    </body>
    <div class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-2 col-lg-2 col-sm-12 text-left">
                  <h6>Copyright &copy; 2022</h6>
                        <p>UNIVERSITAS INDONESIA</p>
                </div>
                <div class="col-lg-8 col-md-8 col-sm-12">
                        </div>
                    <div class="col-md-2 col-lg-2 col-sm-12 text-right">
                    <p> DEPOK </p>
                    <p> <span id="cdate"></span> </p>
                    <p> <span id="ctime"> </span></p>
                </div>
          </div>
        </div>          
        </div>
</html>`).json({success: true, message: 'Account has been verified'})
}

module.exports = verifyEmail;