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
import {useHistory} from  'react-router-dom'
import { UniqueDirectiveNamesRule } from 'graphql';



//Entry has eberything. entry.name, entry.subregions.....



const ContentsOfRegion = (props)=>{

    let idk =  () =>{
    //    console.log(info)
    //    const a =info.filter(element=>element._id !== entry._id);
    //    a.shift(entry)
    //    info = a 
    //    console.log(a)
       
        
        // console.log(entry._id + "target")

        for(let i=0;i<info.length;i++){
            // console.log(info[i]._id +" at index "+i)
        }

        for(let i=0;i<info.length;i++){
            
            if(info[i]._id==entry._id){
                // console.log("found it " + i);
                return i;
            }else{
                return -1
            }
        }


        // const indexFinder = info.filter(element=> element._id == entry._id);
        // console.log(indexFinder)
        // return indexFinder;
    }




    const {entry, mapArray, refetch:refetchItems, userId} = props.location.state
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
            console.log(info)
            // console.log(idk()+ " fsklflkdafjklaf")
            // console.log(info[idk()])
            
		}
    }
   
    const [activeRegion, setActiveRegion] 		= useState({});
    const mutationOptions = {
		refetchQueries: [{ query: GET_DB_REGIONS }], 
		awaitRefetchQueries: true,
		onCompleted: () => reloadRegion()
	}
    const[SubReginAdder] = useMutation(mutations.ADD_SUBREGION, mutationOptions)
    const [DeleteSubregion] = useMutation(mutations.DELETE_SUBREGION)

    const add_subregion = async () => {
		// console.log("maps length before = "+ mapArray.length)
        // console.log(entry._id)
		let list = {
			    _id: '',
				name: 'sub',
				subregion: [],
				capital: 'sub',
				leader: 'sub',
				flag: 'sub',
				landmark: [],
				isitmap : false,
				owner : userId._id,
				parent: entry._id
		}

        console.log(list + "fsfasf "+userId._id);

		const { data } =  SubReginAdder({variables: {regionarray:list, id:entry._id} , refetchQueries:[{query:GET_DB_REGIONS}]} );
		// if(data) {
		// 	loadRegion(data.CREATE_MAP);
		// } 
        // setActiveRegion({info});
      
		window.location.reload("true")
	};
    const deleteSubregion = async (_id) => {
        console.log(info);
        


		const {data} =  await DeleteSubregion({ variables: { _id: _id, parentId:entry._id}, refetchQueries: [{ query: GET_DB_REGIONS }] });
        
        //refetch();
        //setTimeout(()=> {window.location.reload("true")},20000)
        window.location.reload("true")
        

	};







    
    let consoleProps=()=>{
        console.log(props.location.state)
    }
    let subregionPrint=()=>{
        console.log(entry.subregion)
    }
    let mapArrayTest=()=>{
        console.log(mapArray);
    }
    
    let landmarkPrinter =()=>{
        let a=""
        for(let i=0;i<landmark.length;i++){
            a+= landmark[i];
        }
        return a;
    }

    const name = entry.name;
    const capital = entry.capital;
    const leader = entry.leader;
    const flag = entry.flag;
    const landmark = entry.landmark;


    const [editingName, toggleNameEdit] = useState(false);
    const [editingCapital, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);
    const [editingFlag, toggleFlagEdit] = useState(false);
    const [editingLandmark, toggleLandmarkEdit] = useState(false);

    // let indexx= async()=>{
    //     let indexFinder = info.findIndex(element=>{element===entry});
    //     return indexFinder
    // }
    





    return(
        <WLayout wLayout="header">
            <WLHeader>
				<WNavbar color="colored">
					<ul>
						
							<Logo className='logo' />
					</ul>
					<ul>
					<div> Parent Here </div>
						
							{/* WNAVITEM IS ADDED BY ME */}
						{/* <NavbarOptions
							fetchUser={props.fetchUser} 	auth={auth} 
							setShowCreate={setShowCreate} 	setShowLogin={setShowLogin}
							reloadTodos={refetch} 			setActiveRegion={loadRegion}
						/> */}
					</ul>
                    <ul>
                        <div>
                           {entry.name}
                        </div>
                    </ul>

                    <ul>
                        <div>Logout here</div>
                    </ul>
				</WNavbar>
			</WLHeader>

            <WLMain >
                {
                    	<div className="container-details">
						
						<WLayout wLayout = "header">
							<WLHeader >
							
								<WNavbar className ="topNavBar" color="colored">
									
                                        <ul className="plusButton">
                                        <WButton onClick={add_subregion}  className={ "table-entry-buttons"} wType="texted" >
                                             <i className="material-icons" color={'green'}>add</i>
                                        </WButton>
                                        </ul>
                                    <div className="button-group">
                                        <ul>
                                         <WButton className={ "table-entry-buttons"} wType="texted" >
                                             <i className="material-icons">undo</i>
                                        </WButton>
                                        </ul>

                                        <ul>
                                        <WButton className={ "table-entry-buttons"} wType="texted" >
                                             <i className="material-icons">redo</i>
                                        </WButton>
                                        </ul>
                                    </div>

								</WNavbar>
							
							</WLHeader>
                            {/* the upper works fine */}
                                

                            <WMMain>
                                <div className="container-details-secondary">
                                    <WLayout wLayout="header">

                                    <WLHeader>
                                        <WNavbar className="lowerNavBar" color="colored">
                                            <ul>
                        
                                            </ul>

                                        <div className="button-group">
                                            <ul>
                                                
                                                <WButton className={ "table-entry-buttons"}wType="texted">
                                                    <i className ="material-icons">sort</i>
                                                    name
                                                </WButton>
                                            </ul>
                                        </div>

                                         <div className="button-group">
                                            <ul>
                                                
                                                <WButton className={ "table-entry-buttons"}wType="texted">
                                                    <i className ="material-icons">sort</i>
                                                    capital
                                                </WButton>
                                            </ul>
                                        </div>

                                        <div className="button-group">
                                            <ul>
                                                
                                                <WButton className={ "table-entry-buttons"}wType="texted">
                                                    <i className ="material-icons">sort</i>
                                                    leader
                                                </WButton>
                                            </ul>
                                        </div>

                                         <div className="button-group">
                                            <ul>
                                                
                                                <WButton className={ "table-entry-buttons"}wType="texted">
                                                    <i className ="material-icons">sort</i>
                                                    flag
                                                </WButton>
                                            </ul>
                                        </div>

                                        <div className="button-group">
                                            <ul>
                                                
                                                <WButton className={ "table-entry-buttons"}wType="texted">
                                                    <i className ="material-icons">sort</i>
                                                    landmark
                                                </WButton>
                                            </ul>
                                        </div>
                                        

                                        </WNavbar>

                                    </WLHeader>
                                    {/* the above works so now into the body */}


                                    <WMMain className="setOverFlow">
                                        
                                        
                                            {
                                               info[idk()]!=null &&
                                                info[idk()].subregion.map(subs=>(
                                                    <WRow className="table-entry" >

                                                        <WCol size="1">
                                                            {

                                                            }
                                                                                                                                                                      <WButton onClick={()=>deleteSubregion(subs)}                               className=  {"table-entry-buttons"} wType="texted" >
                                             <i className="material-icons" color={'green'}>delete</i>
                                        </WButton>

                                                        </WCol>






                                                        <WCol size='3' >
                                                       
                                                        
                                                            
                                                        {

                                                    
                                                            editingName || name===''?
                                                            <WInput
                                                                className='table-input'
                                                                onBlur={()=>toggleNameEdit(!editingName)}
                                                                autoFocus ={true}
                                                                defaultValue={subs}
                                                                type='text'
                                                                wType='outlined'
                                                                barAnimation='solid'
                                                                inputClass="table-input-class"

                                                                    
                                                            />
                                                           
                                                            

                                                            :


                                                                    


                                                            <div className="table-text"
                                                                 onClick={() => toggleNameEdit(!editingName)}
                                                            >
                                                                {subs}
                                
                                                            </div>
                                                            
                                                            
                                                        }
                                                    </WCol>



                                                        <WCol size='3' >
                                                       
                                                        
                                                    
                                                        {

                                                            
                                                            editingCapital || capital===''?
                                                            <WInput
                                                                className='table-input'
                                                                 onBlur={()=>console.log("a")}
                                                                autoFocus ={true}
                                                                defaultValue={capital}
                                                                type='text'
                                                                wType='outlined'
                                                                barAnimation='solid'
                                                                inputClass="table-input-class"
                                                            />


                                                            

                                                            :


                                                                    


                                                            <div className="table-text"
                                                                 onClick={() => toggleCapitalEdit(!editingCapital)}
                                                            >
                                                                {capital}
                                
                                                            </div>
                                                            
                                                        }
                                                    </WCol>


                                                     <WCol size='2' >
        
                                                        {

                                                            
                                                            editingLeader || leader===''?
                                                            <WInput
                                                                className='table-input'
                                                                 onBlur={()=>console.log("a")}
                                                                autoFocus ={true}
                                                                defaultValue={leader}
                                                                type='text'
                                                                wType='outlined'
                                                                barAnimation='solid'
                                                                inputClass="table-input-class"
                                                            />                                                            

                                                            :
                                                            <div className="table-text"
                                                                 onClick={() => toggleLeaderEdit(!editingLeader)}
                                                            >
                                                                {leader}
                                
                                                            </div>
                                                            
                                                        }
                                                    </WCol>

                                                     <WCol size='2' >
                                                        {
                                                            <div className="table-text">
                                                                {flag}
                                                            </div>
                                                    }
                                                    </WCol>

                                                        
                                                        
                                                    <WCol size='1' >
        
                                                        {

                                                            <div className="table-text"
                                                                
                                                            >
                                                                {landmark+"..."}
                                
                                                            </div>
                                                            
                                                        }
                                                    </WCol>




                                                </WRow>
                                                ))
                                            }
                                            
                                            
                                    
                                            
                                    </WMMain>



                                    </WLayout>
                                </div>

                            </WMMain>


                        </WLayout>




                        </div>
                   
                    
          
                }

            </WLMain>


        </WLayout>
    )
}

export default ContentsOfRegion;