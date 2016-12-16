const r = require('rethinkdb');
const {RDB_HOST: host, RDB_PORT: port, RDB_NAME: db, RDB_TABLES: tables} = require('../config');

const onConnect = () => {
    return r.connect({host, port})
        .then(connection => {
            connection['_id'] = Math.floor(Math.random() * 10001);
            return connection;
        });
};

const getAllProducts = (price) => {
    return onConnect()
        .then(connection => {
            return r.db(db).table(tables.products)
                .run(connection);
        })
        .then(cursor => cursor.toArray());
};

const getProductById = (id) => {
    return onConnect()
        .then(connection => {
            return r.db(db).table(tables.products)
                .filter(r.row('id').eq(id))
                .run(connection);
        })
        .then(cursor => cursor.toArray());
};

const getObjectById = (type, id) => {
    const types = {
        product: getProductById
    };

    return types[type](id);
};

const createProduct = ({title, price, image}) => {
    const product = {title, price, image};

    return onConnect()
        .then(connection => {
            return r.db(db).table(tables.products)
                .insert(product)
                .run(connection)
                .then(result => {
                    product.id = result['generated_keys'][0];
                    return product;
                });
        });
};

module.exports = {
    onConnect,
    getAllProducts,
    getProductById,
    getObjectById,
    createProduct
};
