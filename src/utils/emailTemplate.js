exports.generateEmailTemplate = url => {
    return `
    <!DOCTYPE html>
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">PETISH</a>
    </div>
    <h2>EMAIL VERIFICATION</h2>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for resgistry to PETISH. Use the following LINK to complete your Sign Up procedure.</p>
    <div style="text-align: center;">
        <a href="${url}" style="font-familiy: sans-serif;
        margin: 0 auto; padding: 20px; text-align: center;
        background: #e63946; border-radius: 5px; font-size: 20px 10px;
        color: #fff; cursor: pointer;
        text-decoration: none; display: inline-block;
        ">Verify</a>
        <h3>Or using this link below</h1>
        <h3>${url}</h1>
    </div>
    <p style="font-size:0.9em;">Regards,<br />PETISH</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>PETISH</p>
      <p>Teknik Komputer</p>
      <p>FTUI</p>
    </div>
  </div>
</div>
    `
}

exports.generatePasswordReset = url => {
    return `
    <!DOCTYPE html>
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">PETISH</a>
    </div>
    <h2>RESET ACCOUNT REQUEST</h2>
    <p style="font-size:1.1em">Hi,</p>
    <p>Use the following LINK to RESET your accout password. LINK is valid for 5 minutes</p>
    <div style="text-align: center;">
        <a href="${url}" style="font-familiy: sans-serif;
        margin: 0 auto; padding: 20px; text-align: center;
        background: #e63946; border-radius: 5px; font-size: 20px 10px;
        color: #fff; cursor: pointer;
        text-decoration: none; display: inline-block;
        ">Reset Password</a>
    </div>
    <p style="font-size:0.9em;">Regards,<br />PETISH</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>PETISH</p>
      <p>Teknik Komputer</p>
      <p>FTUI</p>
    </div>
  </div>
</div>
    `
}

exports.plainrestsucTemplate = message => {
    return `<!DOCTYPE html>
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">PETISH</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Your reset password is successful.</p>
    <h4 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${message}</h4>
    <p style="font-size:0.9em;">Regards,<br />PETISH</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>PETISH</p>
      <p>Teknik Komputer</p>
      <p>FTUI</p>
    </div>
  </div>
</div>
    `
}

exports.verifyEmailTemplate = message => {
  return `<!DOCTYPE html>
  <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
<div style="margin:50px auto;width:70%;padding:20px 0">
  <div style="border-bottom:1px solid #eee">
    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">PETISH</a>
  </div>
  <p style="font-size:1.1em">Hi,</p>
  <p>Your Account Has Been Verified.</p>
  <h4 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${message}</h4>
  <p style="font-size:0.9em;">Regards,<br />PETISH</p>
  <hr style="border:none;border-top:1px solid #eee" />
  <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
    <p>PETISH</p>
    <p>Teknik Komputer</p>
    <p>FTUI</p>
  </div>
</div>
</div>
  `
}