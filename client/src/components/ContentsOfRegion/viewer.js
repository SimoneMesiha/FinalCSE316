import React 			from 'react';
import  { useState } from 'react';
import RegionEntry from '../mainRegion/RegionEntry'
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import WCard from 'wt-frontend/build/components/wcard/WCard';
import WCContent from 'wt-frontend/build/components/wcard/WCContent';
import WCFooter from 'wt-frontend/build/components/wcard/WCFooter';
import WCMedia from 'wt-frontend/build/components/wcard/WCMedia';
import { WInput, WCol, WButton, WRow} from 'wt-frontend'

import Logo from '../navbar/Logo'
import NavbarOptions from '../navbar/NavbarOptions'
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';

import * as mutations from '../../cache/mutations'
import { GET_DB_REGIONS } 				from '../../cache/queries';
import { useMutation, useQuery } 		from '@apollo/client';
import loadRegion from '../homescreen/Homescreen'
import reloadRegion from '../homescreen/Homescreen'
import {Link, useHistory} from  'react-router-dom'
import { UniqueDirectiveNamesRule } from 'graphql';
import {useParams} from 'react-router-dom'
// import e from 'express';


const Viewer=(props)=>{
    let info =[]

    const { loading, error, data, refetch } = useQuery(GET_DB_REGIONS);
	//console.log("the data ")

	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
		//Assign todolists 
		for(let todo of data.getAllRegions) {
			info.push(todo);
			// console.log(mapArray);
            // console.log(entry)
           // console.log(info)
            // console.log(idk()+ " fsklflkdafjklaf")
            // console.log(info[idk()])
            
		}
    }
    const {id}= useParams();


    let z = info.filter(element=>element._id ==id)
    let leader =info.filter(element=>element._id ==z[0].leader)
    
    //const history = useHistory();
    //const {id}= useParams();
    console.log(z)
    console.log(z[0].name)
    return(
       <div>
           <div className="rightbox">
               <ul>
                  {z[0].landmark.map(element=>{
                      return <li>
                          {element}
                      </li>
                  })}
               </ul>    
           </div>

           <div className="leftbox">
               <h1>Region Name: {z[0].name} </h1>
               <h1>Parent Region: {z[0].parent}</h1>
               <h1>Region Capital: {z[0].capital}</h1>
               <h1>Region Leader: {z[0].leader}</h1>
               <h1># of subregions: {z[0].subregion.length}</h1>




           </div>



       </div>
    )
};

export default Viewer;