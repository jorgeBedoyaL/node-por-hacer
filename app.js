//const argv = require('yargs').argv;
const argv = require('./config/yargs').argv;
// Importar el paquete colors instalado por defecto en node
const colors = require('colors');

// Importar el archivo por-hacer.js 
const porHacer = require('./por-hacer/por-hacer');


//console.log(argv);

let comando = argv._[0];
switch (comando) {
    case 'crear':
        //console.log('Crear por hacer');
        // Invocar a la funcion crear del archivo por-hacer.js
        // Enviandole la descripcion del comando crear enviado por consola
        // y como retorna algo que lo guarde en tarea
        let tarea = porHacer.crear(argv.descripcion);
        // mostrar tarea
        console.log(tarea);
        break;
    case 'listar':
        //console.log('Mostrar todas las tareas por hacer');
        // Obtener listado de la funcion getListado del archivo por-hacer.js
        let listado = porHacer.getListado();

        // Mostrar todas las tareas y si esta completado o no enmarcado en verde
        for (let tarea of listado) {
            console.log('=========Por Hacer============='.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('==============================='.green);
        }
        break;
    case 'actualizar':
        //console.log('Actualiza una tarea por hacer');
        // Obtenemos true o false si ha cambiado llevando la descripcion y el completado por consola
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case 'borrar':
        //voy a llamar a la funcion borrar y voy a mandar la descripcion enviado por consola
        let borrado = porHacer.borrar(argv.descripcion);
        // mostrar borrado si lo logro hacer o no
        console.log(borrado);
        break;
    default:
        console.log('Comando no es reconocido')
}