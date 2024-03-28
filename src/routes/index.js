const router = require("./router")

const routes = (app) => {
    app.use('/api/gk', router)
}

module.exports= routes;