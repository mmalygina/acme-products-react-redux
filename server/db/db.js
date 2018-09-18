const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/acme-products-react-redux');
const faker = require('faker')

const Product = conn.define('product', {
    name: {
        type: Sequelize.STRING
    },
    rating: Sequelize.INTEGER
})

const generateRating = () => {
    return Math.floor((Math.random() * 10) + 1);
}

const seed = async() => {
    await Promise.all([
        Product.create({name: faker.commerce.productName(), rating: generateRating()}),
        Product.create({name: faker.commerce.productName(), rating: generateRating()}),
        Product.create({name: faker.commerce.productName(), rating: generateRating()})
     ])
}

module.exports = {
    conn,
    seed,
    Product,
    generateRating
}