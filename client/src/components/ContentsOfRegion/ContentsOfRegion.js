import React 			from 'react';
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




const ContentsOfRegion = (props)=>{
    const {_id,name} = props.location.state

    let consoleProps=()=>{
        console.log(props.location.state)
    }
    return(
        <WLayout wLayout="header">
            <WLHeader>
				<WNavbar color="colored">
					<ul>
						
							<Logo className='logo' />
					</ul>
					<ul>
					<div>Parent Here </div>
						
							{/* WNAVITEM IS ADDED BY ME */}
						{/* <NavbarOptions
							fetchUser={props.fetchUser} 	auth={auth} 
							setShowCreate={setShowCreate} 	setShowLogin={setShowLogin}
							reloadTodos={refetch} 			setActiveRegion={loadRegion}
						/> */}
					</ul>
                    <ul>
                        <div>
                           {name}
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
                                        <WButton className={ "table-entry-buttons"} wType="texted" >
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
                        </WLayout>




                        </div>
                   
                    
          
                }

            </WLMain>


        </WLayout>
    )
}

export default ContentsOfRegion;