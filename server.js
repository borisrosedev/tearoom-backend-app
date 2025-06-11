const app = require('./app')

app.listen(app.get('port'), () => {
    console.log(`🚀 Server running at http://${app.get('host')}:${app.get('port')}`)
})
