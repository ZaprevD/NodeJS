
function hasNumber(myString) {
    return /\d/.test(myString);
}

emailValidator = (req,res, next) => {
    let email = req.body.email;
    let username = email.substring(0 , email.indexOf("@"));  
    let provider = email.substring(email.indexOf("@")+1 , email.lastIndexOf("."));
    let domain = email.substring(email.lastIndexOf(".")+1);
    if(provider === "" || hasNumber(provider)){
      var error = new Error("Check your provider")
      error.status = 422;
      next(error);
    }else if(domain.length !== 3 || hasNumber(domain)){
      var error = new Error("Check your domain")
      error.status = 422;
      next(error);
    }else if(username === "" || username.length < 5){
      var error = new Error("Check your username")
      error.status = 422;
      next(error);
    }
    next();
  };


isAdult = (req, res , next) => {
  let age = req.body.age;
  if(age < 18){
    var error = new Error("You must be 18 or older!");
    error.status = 416;
    next(error)
  }
  next();
}


module.exports = {
 emailValidator, isAdult
}