let { products } = require('../../data/data');

class Product{
    async getLastId() {
        const products = await this.getAll();
        const id = products.length > 0 ? Math.max(...products.map(o => o.id), 0) + 1 : 1;
        return id;
    }
    async save(data) {
        try {
            const id = await this.getLastId();
            data.id = id;
            products.push(data);
        } catch (error) {
            console.log(error);
        }
        return await this.getAll();
    }
    async getAll() {
        return products;
    }
    async getById(id) {
        const product = products.find(p => p.id === +id);
        if (!product) return this.notFound();
        return product;
    }
    async updateById(id, data) {
        const productIndex = products.findIndex(p => p.id === +id);
        if (productIndex < 0) return this.notFound();
        Object.keys(data).forEach(k => {
            products[productIndex][k] = data[k];
        });
        return await this.getAll();
    }
    async deleteById(id) {
        const product = await this.getById(id);
        if (!product) return this.notFound();
        products = products.filter(p => p.id !== +id);
        return await this.getAll();
    }
    notFound() {
        return { 'error': 'Producto no encontrado' };
    }
}

module.exports = Product;