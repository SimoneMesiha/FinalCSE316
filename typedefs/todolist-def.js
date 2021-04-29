const { gql } = require('apollo-server');


const typeDefs = gql `
	type RegionsArray {
		_id: String!
		name: String!
		elements: [Element]!
		subregion: [RegionsArray]
		
	}
	type Element {
		 _id: String!
       	 id: Int!
         capital: String!
         leader: String!
         flag: String!
         landmark:  [LandMark]
	}
	type LandMark{
		Landmark: String!
	}
	extend type Query {
		getAllRegions: [RegionsArray]
		getRegionsArrayById(_id: String!): RegionsArray 
	}
	extend type Mutation {
		  addRegion(regionInput: RegionInput!): String
	}


	input RegionInput {
       _id: String
       id: Int
       name: String
       Element: [ElementInput]
   }
   input ElementInput {
       _id: String
       id: Int
       capital: String
       leader: String
       flag: String
       lankMart:  []
	  Subregion: []
   }
  input LandMarkInput {
       _id: String
 
       name: String
   }

	}
`;

module.exports = { typeDefs: typeDefs }