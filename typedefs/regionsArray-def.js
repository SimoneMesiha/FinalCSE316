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
		parent: String
	}
	
	
	extend type Query {
		getAllRegions: [RegionsArray]
		getRegionsArrayById(_id: String!): RegionsArray 
	}
	extend type Mutation {
		  createmap(regionarray : RegionInput): RegionsArray
		  deletemap(_id : String!): Boolean
		  addRegion(regionInput: RegionInput!): String
		  updateRegionField(_id: String!, field: String!, value: String!):String
		  addSubregion(subregion: RegionInput, _id: String): RegionsArray
		  
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
	   parent: String
   }
`;

module.exports = { typeDefs: typeDefs }