module.exports = function (username) {
    const regexp = /^[a-zA-Z\d]{6,20}$/;
    return regexp.test(username);
}
