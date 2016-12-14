const r = require('rethinkdb');
const {RDB_HOST: host, RDB_PORT: port, RDB_NAME: db, RDB_TABLES: tables} = require('../config');

const onConnect = () => {
    return r.connect({host, port})
        .then(connection => {
            connection['_id'] = Math.floor(Math.random() * 10001);
            return connection;
        });
};

const getProductByPrice = (price) => {
    return onConnect()
        .then(connection => {
            return r.db(db).table(tables.products)
                .filter(r.row('price').eq(price))
                .run(connection);
        })
        .then(cursor => cursor.toArray());
};

const getProducts = (price) => {
    return onConnect()
        .then(connection => {
            return r.db(db).table(tables.products)
                .run(connection);
        })
        .then(cursor => cursor.toArray());
};

module.exports = {onConnect, getProductByPrice};
