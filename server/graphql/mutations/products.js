const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const {
    mutationWithClientMutationId
} = require('graphql-relay');

const {createProduct} = require('../../rethinkdb');
const {productType} = require('../types');

const createProductMutation = mutationWithClientMutationId({
    name: "AddProduct",
    description: "Products of the baby store",
    inputFields: {
        title: {
            type: new GraphQLNonNull(GraphQLString),
            description: "Name of the product"
        },
        price: {
            type: new GraphQLNonNull(GraphQLInt),
            description: "Price of the product"
        },
        image: {
            type: new GraphQLNonNull(GraphQLString),
            description: "Url for the product's preview image"
        }
    },
    outputFields: {
        product: {
            type: productType
        }
    },
    mutateAndGetPayload: (args) => new Promise(function(resolve, reject) {
        createProduct(args)
            .then(product => resolve({product}))
            .catch(reject);
    })
});

module.exports = {createProductMutation};
