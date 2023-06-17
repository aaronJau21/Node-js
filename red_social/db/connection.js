const mongoose = require('mongoose')

const connection = async() => {

    try {
        
        await mongoose.connect(process.env.DB_URI)

        console.log('Se conecto a la base de datos red_social correctamente ')

    } catch (error) {
        console.log(error)
        throw new Error('No se conecto a la base de datos')
    }

}

module.exports = connection