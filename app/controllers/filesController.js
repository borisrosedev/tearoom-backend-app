const path = require('path')
const filesController = {

    getOneById(req, res){
      
        const { id } = req.params
        return res.sendFile(path.join(__dirname, '../../uploads/' + id))

    }

}

module.exports = filesController