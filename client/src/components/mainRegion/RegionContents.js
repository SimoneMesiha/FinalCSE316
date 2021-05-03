import React            from 'react';
import RegionList      from './RegionList';

const RegionContents =(props)=>{
    return (
        <>
        
            <RegionList
                 listIDs = {props.listIDs}
            />
        </>
    );
};




export default RegionContents;