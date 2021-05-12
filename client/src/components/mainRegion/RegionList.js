import React from 'react'
import RegionEntry from './RegionEntry'

const RegionList = (props) =>{
    let tempId=0
    return(
        <>
        {
            props.listIDs && props.listIDs.map(entry=>(
                <RegionEntry
                id = {tempId++} name = {entry.name} delete ={props.delete} _id={entry._id} nameChange ={props.nameChange}

                />
            )
                
                
                
            )
        }
        </>
    );
}
export default RegionList;