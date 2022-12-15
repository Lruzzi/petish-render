const {
    isValidObjectId
} = require("mongoose");
const {
    sendError
} = require("../data/errStatus");
const users = require('../models/users')
const otpModel = require('../models/verifToken')
const {
    verifyEmailTemplate
} = require("../utils/emailTemplate")
const {
    transporter
} = require("../utils/mailer")

async function verifyEmail(req, res) {
    var query = require('url').parse(req.url, true).query;
    var id = query.id;
    var token = query.token;
    if (!isValidObjectId(id)) {
        return sendError(res, 'ID not Found')
    }
    const user = await users.findById(id)
    if (!user) {
        return sendError(res, 'User not Found')
    }

    if (user.verified) {
        return sendError(res, 'Account has verified already')
    }
    const otp = await otpModel.findOne({
        owner: user._id
    })
    if (!otp) {
        return sendError(res, 'Verification Request not Found')
    }
    const isMatched = await otp.compareToken(token)
    if (!isMatched) {
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
    res.end(`
    <html>

<head>
    <title>IKN Railway Management</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <style>
        .center {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);

        }
        #footersec{
            min-width: 100%;
        }
        .footer {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: #F0C7A4;
            color: black;
            text-align: center;
        }
    </style>
</head>

<body>
    <header>
        <div class="container-fluid p-0" style="background-color:#F0C7A4">
            <nav class="navbar navbar-expand-lg">

                <div class="collapse navbar-collapse text-justify" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link" style="color:black;border-color: black;border-right-style: solid;border-left-style: solid;" href="/">Petish Account Verification</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        </div>
    </header>

    <main style="margin-top: 30px;">
        <div class="container text-center">
            <div class="row">
                <div class="col-md-2 col-lg-2 col-sm-12"></div>
                <div class="col-lg-8 col-md-8 col-sm-12">
                    <h1>Account Verified Successfully</h1>
                    <p>Thank you for verifying your account. You can now login to your account.</p>
                </div>
                <div class="col-md-2"></div>
            </div>
        </div>
    </main>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
    </script>
</body>
<div class="footer">
    <div class="container"  id="footersec">
        <div class="row">
            <div class="col-4 text-left">
                <h6  style="margin-top: 1rem;">Copyright &copy; 2022</h6>
                <p  style="margin-top: 1rem;">UNIVERSITAS INDONESIA</p>
            </div>
            <div class ="col-4 text-center" style="border-style:solid ;border-color: black;margin-top: 10px; margin-bottom: 10px;">
                <p  style="margin-top: 1rem; font-size:large;">PET HEALTHIEST</p>
            </div>
        </div>
    </div>
</div>
</html>
    `)
}

module.exports = verifyEmail;