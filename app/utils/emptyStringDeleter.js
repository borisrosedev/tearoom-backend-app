
module.exports = (obj) => {
    for (const [k, v] of Object.entries(obj)){
        if (v == "") {
            delete obj[k]
        }
    }
    return obj
}