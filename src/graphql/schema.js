import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

const peopleData = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Sara Smith' },
  { id: 3, name: 'Budd Deey' },
];

let requestCount = 0;

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      resolve: () => {
        console.log('network request');
        requestCount++;
        if (requestCount > 1) {
          // since this template does not show queries in the network tab, I've added
          // this console.error to show the problem.
          console.error('The same query executed 3 times created 3 network requests' +
          ' when queryDeduplication was not set to false.');
        }
        return peopleData;
    },
    },
  },
});

export const schema = new GraphQLSchema({ query: QueryType });
