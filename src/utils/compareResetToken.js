const bcrypt = require("bcrypt")

async function compareResetToken(token, restToken){
    const bool = bcrypt.compareSync(token, restToken.token);
    if(bool){
        return(bool)
    }
    else{
        return(!bool)
    }
}

module.exports = {
    compareResetToken
}