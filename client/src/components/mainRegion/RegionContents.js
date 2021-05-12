import React            from 'react';
import RegionList      from './RegionList';

const RegionContents =(props)=>{
    return (
        <>
        
            <RegionList
                 listIDs = {props.listIDs} delete={props.delete} nameChange ={props.nameChange}
            />
        </>
    );
};




export default RegionContents;