var {Usuario} = require('./../models/usuario')

const authorizedEndpoints = [
    '/usuarios/session',
    '/usuarios/session'
]

var autenticacion = (req, res, next) => {
    
    if( authorizedEndpoints.includes(req.url)){
      
        next()
    }else{
        var token = req.header('x-auth')
        Usuario.findByToken(token).then((usuario) => {

            if (!usuario) {
                return Promise.reject()
            }
            req.usuarioRequest = usuario
            next()
        }).catch((e) => {
            res.status(401).send()
        })

    }

}

module.exports = {
    autenticacion
}