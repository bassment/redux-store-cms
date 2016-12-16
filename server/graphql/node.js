const {
    nodeDefinitions,
    fromGlobalId
} = require('graphql-relay');

const {getObjectById} = require('../rethinkdb');

const {nodeInterface, nodeField} = nodeDefinitions(
    (globalId) => {
        const {type, id} = fromGlobalId(globalId);
        return getObjectById(type.toLowerCase(), id);
    },
    (object) => {
        const {productType} = require('./types');

        if (object.image) {
            return productType;
        }

        return null;
    }
);

module.exports = {
    nodeInterface,
    nodeField
};
