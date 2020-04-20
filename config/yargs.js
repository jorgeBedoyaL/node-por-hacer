const descripcion = {
    demand: true, // comando obligado
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
};

const completado = {
    default: true, // comando obligado
    alias: 'c',
    desc: 'Marca como completado o pendiente la tarea'

}

// Definir el comando crear
const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', {
        descripcion // descripcion: descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'Borra una tarea', {
        descripcion
    })
    .help()
    .argv;

//Exportar los comandos
module.exports = {
    argv
}