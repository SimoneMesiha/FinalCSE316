import React from 'react'
import {WNavItem, WInput} from 'wt-frontend'
import {useState} from 'react'



const RegionEntry =(props)=>{
     const [editing, toggleEditing] = useState(false);
     const [preEdit, setPreEdit] = useState(props.name);
     const handleEditing = (e) => {
        e.stopPropagation();
        setPreEdit(props.name);
        toggleEditing(!editing);
    };

const consolelog =()=>{
    console.log("hello")
}


    const entryStyle = props._id === props.activeid ? 'list-item-active' : 'list-item ';



    return(
        <WNavItem className={entryStyle} onDoubleClick ={consolelog}>

            {
                editing ?   <WInput className="list-item-edit" inputClass="list-item-edit-input"
                               
                                name='name'  autoFocus={true} defaultValue={props.name} 
                            />
                        :   <div className='list-text'>
                                {props.name}
                            </div>

            }





        </WNavItem>
    )

}
export default RegionEntry