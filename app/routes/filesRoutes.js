const { Router } = require('express')
const path = require('path')
const route = Router()

route.get('/photos/:id', (req, res) => {
    const { id } = req.params
    return res.sendFile(path.join(__dirname, '../../uploads/' + id))
})


module.exports = route

