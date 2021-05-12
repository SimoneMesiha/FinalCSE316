import React 			from 'react';
import RegionEntry from '../mainRegion/RegionEntry'



const ContentsOfRegion = (props)=>{
    const {_id,name} = props.location.state

    let consoleProps=()=>{
        console.log(props.location.state)
    }
    return(
        <div onClick={consoleProps}>
            
       {name}</div>
    )
}

export default ContentsOfRegion;