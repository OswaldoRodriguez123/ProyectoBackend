
const express = require('express');
const Container = require('../util/product');

const router = express.Router();
const container = new Container();

router.get('/', async (req, res) => {
    res.json(await container.getAll());
});

router.post('/', async (req, res) => {
    const data = req.body;
    res.json(await container.save(data));
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    res.json(await container.getById(id));
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    res.json(await container.updateById(id, data));
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    res.json(await container.deleteById(id));
});

module.exports = router;