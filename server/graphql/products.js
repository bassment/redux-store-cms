const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql');
const {getProductByPrice} = require('../rethinkdb');

// GraphQL MODEL Type

const productType = new GraphQLObjectType({
    name: "Products",
    description: "Products of the baby store",
    fields: {
        title: {
            type: GraphQLString,
            description: "Name of the product"
        },
        price: {
            type: GraphQLInt,
            description: "Price of the product"
        },
        'image': {
            type: GraphQLString,
            description: "Url for the product's preview image"
        }
    }
});

// GraphQL QUERY Type

const queryType = new GraphQLObjectType({
    name: "query",
    description: "Product query",
    fields: {
        product: {
            type: productType,
            args: {
                price: {
                    type: GraphQLInt
                }
            },
            resolve: (_, args) => getProductByPrice(args.price).then(arr => arr[0])
        }
    }
});

// GraphQL Schema

const schema = new GraphQLSchema({query: queryType});

module.exports = schema;
