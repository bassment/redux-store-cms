const {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt} = require('graphql');

// Data

const goldbergs = {
    1: {
        character: "Beverly Goldberg",
        actor: "Wendi McLendon-Covey",
        role: "matriarch",
        traits: "embarrassing, overprotective",
        id: 1
    },
    2: {
        character: "Murray Goldberg",
        actor: "Jeff Garlin",
        role: "patriarch",
        traits: "gruff, lazy",
        id: 2
    },
    3: {
        character: "Erica Goldberg",
        actor: "Hayley Orrantia",
        role: "oldest child",
        traits: "rebellious, nonchalant",
        id: 3
    },
    4: {
        character: "Barry Goldberg",
        actor: "Troy Gentile",
        role: "middle child",
        traits: "dim-witted, untalented",
        id: 4
    },
    5: {
        character: "Adam Goldberg",
        actor: "Sean Giambrone",
        role: "youngest child",
        traits: "geeky, pop-culture obsessed",
        id: 5
    },
    6: {
        character: "Albert 'Pops' Solomon",
        actor: "George Segal",
        role: "grandfather",
        traits: "goofy, laid back",
        id: 6
    }
};

// GraphQL helpers

const getGoldberg = id => goldbergs[id];

// GraphQL MODEL Type

const goldbergType = new GraphQLObjectType({
    name: "Goldber",
    description: "Member of The Goldbergs",
    fields: {
        character: {
            type: GraphQLString,
            description: "Name of the character"
        },
        actor: {
            type: GraphQLString,
            description: "Actor playing the character"
        },
        role: {
            type: GraphQLString,
            description: "Family role"
        },
        traits: {
            type: GraphQLString,
            description: "Traits this Goldberg is known for"
        },
        id: {
            type: GraphQLInt,
            description: "ID of this Goldberg"
        }
    }
});

// GraphQL QUERY Type

const queryType = new GraphQLObjectType({
    name: "query",
    description: "Goldberg query",
    fields: {
        goldberg: {
            type: goldbergType,
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            resolve: (_, args) => getGoldberg(args.id)
        }
    }
});

// GraphQL Schema

const schema = new GraphQLSchema({query: queryType});

module.exports = schema;
