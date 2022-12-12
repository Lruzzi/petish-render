const bcrypt = require("bcrypt")

async function comparePassword(password, isUser){
    const bool = await bcrypt.compareSync(password, isUser.password);
    if(bool){
        return(true)
    }
    else{
        return(false)
    }
}

module.exports = {
    comparePassword
}