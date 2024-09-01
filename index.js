const express = require('express');
const app = express();

app.use(express.json());

const productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
];

const clientes = [
    { id: 1, nombre: 'Cliente 1' },
    { id: 2, nombre: 'Cliente 2' },
    { id: 3, nombre: 'Cliente 3' }
];

app.get('/', (req, res) => {
    res.send('Bienvenido a la API');
});

app.get('/productos', (req, res) => {
    res.json(productos);
});

app.get('/clientes', (req, res) => {
    res.json(clientes);
});

// Ruta PUT para actualizar un cliente existente
app.put('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let cliente = clientes.find(c => c.id === id);
    if (cliente) {
        Object.assign(cliente, req.body);
        res.json(cliente);
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});

app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let producto = productos.find(p => p.id === id);
    if (producto) {
        Object.assign(producto, req.body);
        res.json(producto);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = productos.findIndex(p => p.id === id);
    if (index !== -1) {
        productos.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
//1