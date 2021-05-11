import { gql } from "@apollo/client";

export const GET_DB_USER = gql`
	query GetDBUser {
		getCurrentUser {
			_id
			firstName
			lastName
			email
		}
	}
`;

export const GET_DB_REGIONS = gql`
	query GetDBRegions {
		getAllRegions {
			_id
			name
			subregion
			capital
            leader
            flag
            landmark
			isitmap
			owner
			parent
		}
	}
`;
