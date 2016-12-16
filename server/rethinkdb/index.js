const r = require('rethinkdb');
const {RDB_HOST: host, RDB_PORT: port, RDB_NAME: db, RDB_TABLES: tables} = require('../config');

const onConnect = () => {
    return r.connect({host, port})
        .then(connection => {
            connection['_id'] = Math.floor(Math.random() * 10001);
            return connection;
        });
};

const getAllProducts = (order = 'ASC') => {
    const table = r.db(db).table(tables.products);

    let desideOnOrder;
    if (order === 'ASC') {
        desideOnOrder = table.orderBy('title');
    } else if (order === 'DESC') {
        desideOnOrder = table.orderBy(r.desc('title'));
    } else {
        return Promise.reject("orderBy argument only accepts 'ASC' or 'DESC' options");
    }

    return onConnect()
        .then(connection => {
            return desideOnOrder
                .run(connection);
        })
        .then(cursor => cursor.toArray());
};

const getProductBy = (type, value) => {
    return onConnect()
        .then(connection => {
            return r.db(db).table(tables.products)
                .filter(r.row(type).eq(value))
                .run(connection);
        })
        .then(cursor => cursor.toArray());
};

const getObjectById = (type, id) => {
    const types = {
        product: getProductById
    };

    return types[type]('id', id);
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
    getProductBy,
    getObjectById,
    createProduct
};
