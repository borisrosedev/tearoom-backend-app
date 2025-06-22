const { default: axios } = require("axios")



const websocketService = {

    async send(event, data){
        try {

            const websocketServerResponse = await axios.post('http://localhost:3002/broadcast', {
                event,
                data
            })

            return websocketServerResponse

        } catch (err) {
            console.log('err', err)
        }
    }

}

module.exports = websocketService