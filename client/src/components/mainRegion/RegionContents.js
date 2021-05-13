import React            from 'react';
import RegionList      from './RegionList';

const RegionContents =(props)=>{
    return (
        <>
        
            <RegionList
                 listIDs = {props.listIDs} delete={props.delete} nameChange ={props.nameChange}


                 fetchUser ={props.fetchUser} auth={props.auth}
                 setShowCreate ={props.setShowCreate} setShowLogin={props.setShowLogin}
                 reloadTodos ={props.reloadTodos} setActiveRegion = {props.loadRegion}
            />
        </>
    );
};




export default RegionContents;