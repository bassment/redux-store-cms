const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLID
} = require('graphql');

const {
    globalIdField,
    connectionDefinitions,
    connectionFromPromisedArray,
    connectionArgs,
    mutationWithClientMutationId
} = require('graphql-relay');

const {getAllProducts, getProductById} = require('../rethinkdb');
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
            args: connectionArgs,
            resolve:  (_, args) => connectionFromPromisedArray(
                getAllProducts(),
                args
            )
        },
        product: {
            type: productType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                    description: 'Find a product by its ID'
                }
            },
            resolve: (_, {id}) => {
                return getProductById(id)
                    .then(product => product[0]);
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
