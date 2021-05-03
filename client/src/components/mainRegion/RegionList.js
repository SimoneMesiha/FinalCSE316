import React from 'react'
import RegionEntry from './RegionEntry'

const RegionList = (props) =>{
    let tempId=0
    return(
        <>
        {
            props.listIDs && props.listIDs.map(entry=>(
                <RegionEntry
                id = {tempId++} name = {entry.name}

                />
            )
                
                
                
            )
        }
        </>
    );
}
export default RegionList;