const Usuario = require("../models/USER")
const bcrypt = require("bcrypt")


const CtrlUser = {}

//GET
CtrlUser.getUser = async(req, res)=>{
    try {
        const user = await Usuario.find(({
            isActive: true
        }))

        if(!user.length) {
            res.status(400).json({
                msg:"No se encontró ningún usuario"
            })

        }
    
        res.status(200).json({
            msg: "Usuarios encontrados",
            user
    
        })
    
    } catch (error) {
        res.status(400).json({
            msg:"Error"
        })
    }
}

//GET USER ID
CtrlUser.getUserId = async(req, res)=>{
    try {
        const idUser = req.params.idUser
        const user = await Usuario.findOne({
            $and: [{
                _id: idUser
            }, {
                isActive: true
            }]
        })
        if (user) {
            res.status(200).json({
                msg: "Usuario:",
                user
            })
        }


    } catch (error) {
        res.status(400).json({
            message: "Error:",
            error
        })
    }


}

//POST
CtrlUser.postUser = async(req, res)=>{
    try {
        const {username,email,password} = req.body
        const newPassword = bcrypt.hashSync(password, 10)

        const newUsuario = new Usuario({
            username,
            email,
            password: newPassword
        })

        const user = await newUsuario.save()

        res.status(200).json({
            msg: "Usuario creado",
            user

        })

    } catch (error) {
        res.status(400).json({
            msg: "El usuario no fue creado",
            error:error.message
        })
    }



}

//PUT
CtrlUser.putUser = async(req, res)=>{
    try {
        const id = req.params.idUsuario

        const {username,email,password} = req.body
        if (!id || password || email || username){
            res.status(400).json({
                message: "Error. Falta información"
            })
        }

    } catch (error) {
        res.status(400).json({
            message: "Error:",
            error
        })
    }
}

//DELETE
CtrlUser.deleteUser = async(req, res)=>{
    const id = req.params.id
    try {
        const user = await Usuario.findByIdAndUpdate(id, {
            isActive: false
        })

        res.status(200).json({
            msg:"Se ocultó la tarea",
            tareaD
        })

    } catch (error) {

    }
    const tarea = await Tarea.find()

    return res.json({
        message: "tarea eliminada",
        tarea

    })



}




module.exports = CtrlUser