// Importar el file system para guardar mi archivo
const fs = require('fs');

// Definir el arreglo listado
let listadoPorHacer = [];

// Crear la funcion que guardará los datos al json
const guardarDB = () => {
    // Tranformar la data del array listadoPorHacer en formato json
    let data = JSON.stringify(listadoPorHacer);
    // Guardar los datos en el archivo data.json
    // Solo sobreescribimos no agregamos el arreglo
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {
    try {
        // Obtener el arreglo
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

const crear = (descripcion) => {

    //Asigna todos los registros del archivo data.json al arreglo listadoPorHacer
    cargarDB();

    // Crear objeto
    let porHacer = {
            descripcion, // descripcion : descripcion
            completado: false
        }
        // Agregar objeto al arreglo
    listadoPorHacer.push(porHacer);
    //Guarda la ultima descripcion añadiendolo al arreglo
    guardarDB();

    //mostrar
    return porHacer;
}

const getListado = () => {
    //Obtener los registros del data.json 
    cargarDB();
    //Retornamos el listadoPorhacer declarado en la funcion cargarDB()
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    // Cargar el arreglo en el array listadoPorHacer
    cargarDB();
    // Actualizar la tarea que coincida con la descripcion enviada y la descripcion de listadoPorHacer
    // Obtener la posicion de esta tarea si la descripcion es igual a la enviada y la que esta en la listaPorHacer
    // Sino coincide va indicar un -1 de 0 para arriba es la posicion del elemento
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)
    if (index >= 0) {
        // Cambiamos el completado en la posicion que coincida
        listadoPorHacer[index].completado = completado;
        //Guardar DB
        guardarDB();
        //Validamos si la tarea se hizo correctamente
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    // Cargar el arreglo en el array listadoPorHacer por sino no voy ha saber que borrar
    cargarDB();
    // filter: quitar o filtrar algun elemento en particular y esta funcion devuelve un nuevo arreglo 
    // Obtiene el listado menos la descripcion que envio por consola si coincide sino muestra todo igual
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion)

    // Si el listadoPorHacer y nuevoListado tienen el mismo largo no se borro nada
    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

//Exportar
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}