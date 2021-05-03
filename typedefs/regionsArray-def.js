const { gql } = require('apollo-server');


const typeDefs = gql `
	type RegionsArray {
		_id: String!
		name: String!
		subregion: [String]!
		capital: String!
        leader: String!
        flag: String!
        landmark:  [String]!
		isitmap: Boolean!
		owner : String
	}
	
	
	extend type Query {
		getAllRegions: [RegionsArray]
		getRegionsArrayById(_id: String!): RegionsArray 
	}
	extend type Mutation {
		  createmap(regionarray : RegionInput): RegionsArray
		  addRegion(regionInput: RegionInput!): String
		  updateRegionField(_id: String!, field: String!, value: String!):String
	}


	input RegionInput {
       _id: String
       name: String
	   subregion: [String]
	   capital: String!
       leader: String!
       flag: String!
       landmark:  [String]

	   isitmap: Boolean!
	   owner : String
   }
`;

module.exports = { typeDefs: typeDefs }