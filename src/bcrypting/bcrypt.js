const bcrypt = require("bcryptjs");

const hashingPassword= (password)=>{
   return new Promise ((resolve,reject)=>{
      bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return new error("there is an error");
    } else {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          return new error("there is an error");
        } else {
          try{
            console.log('la',hash);
          resolve(hash);
}
catch(e){
  reject('error');
}
}
});
}
});
});



}

module.exports= {hashingPassword};
