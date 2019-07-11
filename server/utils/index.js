
const camelize = function(str) {
    let camelizeRE = /-(w)/g;
    return str.replace(camelizeRE, function(_, c) {
        return c ? c.toUpperCase() : '';
    })
}

module.exports = {
  camelize
}