

module.exports = async function (cb, res) {

    try {
        await cb()
    } catch(err) { 
        return res.status(500).json({ err })
    }
}