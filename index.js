const fs = require('fs/promises');

const isJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

class Container{
    constructor(file){
        this.file = file;
    }
    async save(product) {
        try {
            const id = await this.getLastId();
            product.id = id;
            const products = await this.getAll();
            products.push(product);
            this.updateAll(products);
        } catch (error) {
            console.log(error);
        }
    }
    async getAll() {
        try {
            await fs.access(this.file);
        } catch (error) {
            await fs.writeFile(this.file, "");
        }
        try {
            const json = await fs.readFile(this.file);
            const products = isJson(json) ? JSON.parse(json) : [];
            return products;
        } catch (error) {
            console.log(error);
        }
    }
    async getLastId() {
        const products = await this.getAll();
        const id = products.length > 0 ? Math.max(...products.map(o => o.id), 0) + 1 : 1;
        return id;
    }
    async updateAll(products) {
        try {
            const json = JSON.stringify(products, null, 2);
            await fs.writeFile(this.file, json);
        } catch (error) {
            console.log(error);
        }
    }
    async getById(id) {
        const products = await this.getAll();
        const product = products.find(p => p.id === id);
        return product;
    }
    async deleteById(id) {
        const products = await this.getAll();
        const newProducts = products.filter(p => p.id !== id);
        this.updateAll(newProducts);
    }
    async deleteAll() {
        const products = [];
        this.updateAll(products);
    }
    async getByRandom() {
        const products = await this.getAll();
        const productsId = products.length;
        const randomId = Math.floor(Math.random() * productsId);
        const product = products[randomId];
        return product;
    }
}
    
const file = "./productos.txt";
const container = new Container(file);

const express = require('express');
const app = express();

app.get('/productos', async (req, res) => {
    res.send(await container.getAll());
});

app.get('/productoRandom', async (req, res) => {
    res.send(await container.getByRandom());
});

const PORT = 8080;

app.listen(PORT, function () {
    console.log(`Aplicación escuchando en el puerto ${PORT}.`);
});


