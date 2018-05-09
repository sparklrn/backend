const bCrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (pass) => {
    return bCrypt.hashSync(pass, bCrypt.genSaltSync(saltRounds),null);
}
