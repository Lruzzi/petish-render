async function emailValidation(email) {
    const mailformat = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    const result = mailformat.test(email);
    if(result){
        return(true);
    }
    else {
        return(false);
    }
}
module.exports = {
    emailValidation
}