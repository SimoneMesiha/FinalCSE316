import React 			from 'react';
import Homescreen 		from './components/homescreen/Homescreen';
import { useQuery } 	from '@apollo/client';
import * as queries 	from './cache/queries';
import { jsTPS } 		from './utils/jsTPS';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import ContentsOfRegion from './components/ContentsOfRegion/ContentsOfRegion'
import Viewer           from './components/ContentsOfRegion/viewer'
 
const App = () => {
	let user = null;
    let transactionStack = new jsTPS();
	let refreshTps = false;
    const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER);

    if(error) { console.log(error); }
	if(loading) { console.log(loading); }
	if(data) { 
		let { getCurrentUser } = data;
		if(getCurrentUser !== null) { user = getCurrentUser; }
    }
	return(
		<BrowserRouter>
			<Switch>
				<Route 
					path =  "/view/:id"
					name = "viewer"
					////component={viewerr}
					render={() => 
							<Viewer tps={transactionStack} fetchUser={refetch} user={user}/>
						} 
				
				/>


			 	<Route path = "/home/:id" 
				  //component={ContentsOfRegion} 
				  component={(props)=><ContentsOfRegion{...props} key={Math.floor(Math.random*100000000)+1} />}
				 
				

				 />


				<Redirect exact from="/" to={ {pathname: "/home"} } />
				<Route 
					path="/home" 
					name="home" 
					render={() => 
						<Homescreen tps={transactionStack} fetchUser={refetch} user={user} refreshTps={refreshTps}/>
					} 
				/>
				

			</Switch>
		</BrowserRouter>
	);
}

export default App;