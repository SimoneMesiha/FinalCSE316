import React from 'react'
import RegionEntry from './RegionEntry'

const RegionList = (props) =>{
    let tempId=0
    return(
        <>
        {
            props.listIDs && props.listIDs.map(entry=>(
                <RegionEntry
                id = {tempId++} name = {entry.name} delete ={props.delete} _id={entry._id}

                />
            )
                
                
                
            )
        }
        </>
    );
}
export default RegionList;