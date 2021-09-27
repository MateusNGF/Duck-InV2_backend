module.exports = (res, erro = Array) => {
 
    if (erro.dev) {
        sendDev(erro)
    } else if (erro.code == 11000) {
        sendDev(erro)
    }else if(erro.path == "_id") {
        erro.message = `ID da postagem é invalido ou irregular.`
    }

    sendUser(res, erro)
}

function sendUser(res, erro) {
    res.status(erro.code ? erro.code : 200).json({
        status: false,
        message: erro.message ? erro.message : "Erro desconhecido"
    })
}

function sendDev(erro) {
    console.log({
        type: "ERRO_INTERNO",
        body : erro
    })
    erro.code = 500
    erro.message = "Erro Interno, consulte o administrador."

    sendUser()
}