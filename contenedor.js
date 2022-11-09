const fs = require('fs');
// const { randomUUID } = require('crypto')


class FileContainer {
    constructor(path) {
        this.path = path;
    }
    
    
    //Métodos

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
 
    async getById(id) {
        let objects = await this.getAll();
        return objects.find(p => p.id == id) ?? null;
    }
 
    async getAll() {
        let objects;
        try {
            objects = await fs.promises.readFile(this.path, 'utf-8');
        } catch (error) {
            throw new Error(`Error en leer archivo ${this.path}`);
        }
        if (objects.length == 0) return [];
        objects = [...JSON.parse(objects)];
        return objects;
    }
 
    async deleteById(id) {
        let objects = await this.getAll();
        let index = objects.findIndex(o => o.id == id);
        if (index == -1) return;
        objects.splice(index, index == 0 ? index + 1 : index);
        try {
            return fs.promises.writeFile(this.path, JSON.stringify(objects, null, 2));
        } catch (error) {
            throw new Error(`Error en escritura, al borrar objeto de id ${id}`);
        }
    }
 
    async deleteAll() {
        try {
            return fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
        } catch (error) {
            throw new Error("Error en escritura, al borrar todos los objetos");
        }
    }
}
 
async function main() {
    let fc = new FileContainer("productos.txt");
	

    
await fc.save({
         title: 'Pelicula 1',
         price: 190,
         thumbnail: 'random',
         id: 1
     });
     console.log(await fc.getAll());
 
   
    await fc.save({
        title: 'BB Terráqueo',
        price: 345.67,
        thumbnail: 'random',
        id: 4
    });


    console.log(await fc.getAll());
 
    
    // console.log(await fc.getById(4));
 
    
    // console.log(await fc.getById(999));
 
   
    
    // console.log(await fc.deleteById(4));
    // console.log(await fc.getAll());
 
 
   
    // await fc.deleteAll();
    // console.log(await fc.getAll());
 
}


