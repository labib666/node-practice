
module.exports = function() {
    return {
        'validateUsername': function (username) {
            if(!username) return false;
            else return true;
        },
        'validateEmail': function (email) {
            if(!email) return false;
            else return true;
        },
        'validatePassword': function (password) {
            if(!password) return false;
            else return true;
        }
    };
}
