class FileContainer {

    constructor(path) {

        this.path = path;

    }

async save(object) {

    let objects = await this.getAll();
    
   
    
    if (objects.some(o => o.id == object.id)) return;
    
  
    
    objects.push(object);
    
    
    
    try {
    
    fs.promises.writeFile(this.path, JSON.stringify(objects, null, 2));
    
   
    
    } catch (error) {
    
    throw new Error(`Error en guardar objeto de id ${object.id}`);
    
    }
    
     return 
    
}

async getAll() {
    
    let objects;
    
    try {
    
    objects = await fs.promises.readFile(this.path, 'utf-8');
    
    } catch (error) {
    
    throw new Error(`Error en leer archivo ${this.path}`);
    
    }
    
    if (objects.length == 0) return [];
    
    objects =  [JSON.parse(objects)];
    
    return objects;
    
}
}
// const fs = require('fs')

// const { randomUUID } = require('crypto')


// class Contenedor {
//     #elementos
//     constructor() {
//         this.#elementos = []
//     }

//     guardar(elemento) {
//         this.#elementos.push(elementos)
//     }

//     recuperarTodo() {
//         return this.#elementos
//     }

//     obtenerID() {
//         return id
//     }
// }

// class ContenedorArchivo {
//     #elementos
//     #ruta
//     constructor(ruta) {
//         this.#ruta = ruta
//         this.#elementos = []
        
//     }

//     async guardar(elemento) {
//         this.#elementos.push(elemento)
//         await fs.promises.writeFile(this.#ruta, JSON.stringify(this.#elementos))
//     }

//     async recuperarTodo() {
//         this.#elementos =  JSON.parse(await fs.promises.readFile(this.#ruta, 'utf-8'))
//         return this.#elementos
//     }

//     async leerTodo() {
//         await fs.promises.writeFile(this.#ruta, JSON.stringify(this.#elementos))
//         JSON.parse(await fs.promises.readFile(this.#ruta, 'utf-8'))
//     }

//     // async recuperarId() {
    
// }

// async function test() {

//     const rutaArchivo = './elementos.txt'
//     await fs.promises.writeFile(rutaArchivo, '[]')
    
    
//     const contenedor = new ContenedorArchivo (rutaArchivo)

//     await contenedor.guardar({
//         id: randomUUID(),
//         nombre: "Jorge"
//     })
    
//     await contenedor.guardar({
//         id: randomUUID(),
//         nombre: "Juan"
        
//     })

//     await contenedor.guardar({
//         id: randomUUID(),
//         nombre: "Sol"
        
//     })

//     await contenedor.recuperarTodo()
//     await contenedor.leerTodo()
//     // await contenedor.recuperarId()
    
// }

// test(),
