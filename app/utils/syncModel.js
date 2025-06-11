
async function syncModel(M){
    await M.sync({ alter: true })

}

module.exports = { syncModel }
