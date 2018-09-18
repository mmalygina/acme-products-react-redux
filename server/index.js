const express = require('express');
const { conn, seed, Product } = require('./db/db');
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();
module.exports = app;

conn.sync({ force: true })
  .then(async () => {
    await seed();
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
  })

app.use(require('body-parser').json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

app.get('/api/products', (req, res, next) => {
    Product.findAll().then((products) => {
        res.send(products)
    }).catch(next)
})

app.get('/api/products/:id', (req, res, next) => {
    console.log('here', req.params.id);
    Product.findById(req.params.id).then((product) => {
        res.send(product)
    }).catch(next)
})

app.delete('/api/products/:id', (req, res, next) => {
    Product.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => res.status(204))
    .catch(next)
})

app.post('/api/products', (req, res, next)=> {
    Product.create(req.body)
        .then((product) => {
            console.log('in post ', product)
            return res.send(product)})
        .catch(next);
});
  


