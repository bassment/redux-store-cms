const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const {globalIdField} = require('graphql-relay');
const {nodeInterface} = require('../node');

const productType = new GraphQLObjectType({
    name: "Products",
    description: "Products of the baby store",
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: obj => obj.id
        },
        title: {
            type: GraphQLString,
            description: "Name of the product"
        },
        price: {
            type: GraphQLInt,
            description: "Price of the product"
        },
        image: {
            type: GraphQLString,
            description: "Url for the product's preview image"
        }
    },
    interfaces: [nodeInterface]
});

module.exports = {
    productType
};
