const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString
} = require('graphql');

const {
    globalIdField,
    connectionDefinitions,
    connectionFromPromisedArray,
    connectionArgs,
    mutationWithClientMutationId
} = require('graphql-relay');

const {getAllProducts, getProductBy} = require('../rethinkdb');
const {getFirst} = require('../helpers');
const {nodeField} = require('./node');
const {productType} = require('./types');
const {createProductMutation} = require('./mutations');

const {connectionType: ProductConnection} = connectionDefinitions({
    nodeType: productType,
    connectionFields: () => ({
        totalCount: {
            type: GraphQLInt,
            description: 'Total number of products',
            resolve: (conn) => conn.edges.length
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "Query",
    description: "Root query type",
    fields: {
        node: nodeField,
        allProducts: {
            type: ProductConnection,
            description: 'List of all products',
            args: Object.assign(connectionArgs, {
                orderBy: {
                    type: GraphQLString
                }
            }),
            resolve:  (_, args) => {
                const {orderBy} = args;
                return orderBy ? connectionFromPromisedArray(getAllProducts(orderBy), args)
                    : connectionFromPromisedArray(getAllProducts(), args);
            }
        },
        product: {
            type: productType,
            args: {
                id: {
                    type: GraphQLID,
                    description: 'Find a product by its ID'
                },
                price: {
                    type: GraphQLInt,
                    description: 'Find a product by its Price'
                }
            },
            resolve: (_, {id, price}) => {
                const type = id ? ['id', id] : price ? ['price', price] : null;
                return type ? getProductBy(...type).then(getFirst)
                    : Promise.reject('Please provide at least on of these: Product ID or Product Price');

            }
        },
    }
});

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'The root mutation query type.',
    fields: {
        createProduct: createProductMutation
    }
});

module.exports = new GraphQLSchema({query: RootQuery, mutation: RootMutation});
