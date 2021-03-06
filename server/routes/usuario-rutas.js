var express = require('express');
var api = express.Router();
const { Usuario } = require('../models/usuario')


const _ = require('lodash')
const { ApiResponse } = require('../models/api-response')
const { ObjectID } = require('mongodb')



api.get('/usuarios/session', (req, res) => {

    const {password, tokens, ...usuario} = req.usuarioRequest._doc
    res.status(200).send(usuario);

})

api.post('/usuarios/session', async (req, res) => {

    try {
        let usuario = await Usuario.findOne({email: req.body.email.toLowerCase(), password: req.body.password})

        if (usuario) {
            const {tokens, nombre, email, apellido, direccion} = usuario;
            res.status(200).send({nombre, apellido, direccion, email, token:  tokens[0].token });
        } else {
            res.status(404).send(new ApiResponse({}, 'Usuario y/o contraseña inválidos'));
        }

    } catch (e) {
        console.log('Error ',e)
        res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
    }
})

api.get('/usuarios', (req, res) => {

    Usuario.find({},{tokens: 0, password: 0})
        .then((usuarios) => res.status(200).send(usuarios ))
        .catch((e) => res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`)))
})

api.post('/usuarios', async (req, res) => {


    try {
        
        var usuario = new Usuario(_.pick(req.body, ['email', 'nombre', 'apellido', 'password','direccion']))
        usuario.email = usuario.email.toString().toLowerCase()
        usuario = await usuario.save()
        await usuario.generateAuthToken()
        usuario.save()
        res.status(200).send({})
    } catch (e) {
        console.log(e)
        res.status(400).send(new ApiResponse({}, `Mensaje: ${'Error al dar de alta'}`))
    }
})









/*
api.put('/usuarios/:id', async (req, res) => {
    let token = req.header('x-auth')
    

    try {
        let usuarioRequest = await Usuario.findByToken(token)
        if (!usuarioRequest) {
            res.status(401).send(new ApiResponse({}, 'No autorizado'))
        }

        let _id = req.params.id;
        let usu = await Usuario.findOne({_id})
        
        req.body.perfiles = usu.perfiles
    
        let usuario = await Usuario.findOneAndUpdate({ _id }, { $set: req.body })
      
         usuario = await Usuario.findOne({_id})
        if (!usuario) {
            res.status(401).send(new ApiResponse({}, 'Usuario inválido'))
        }

        res.status(200).send(new ApiResponse(usuario))
    }
    catch (err) {
        console.log(err)
        res.status(400).send(new ApiResponse({}, err))
    }

})
*/




module.exports = api;