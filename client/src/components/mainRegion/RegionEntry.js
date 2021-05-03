import React from 'react'
import {WNavItem, WInput, WCol, WButton, WRow} from 'wt-frontend'
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
// const deleteEntry =()=>{
//     props.delete(props._id)
// }


    const entryStyle = props._id === props.activeid ? 'list-item-active' : 'list-item ';



    return(

    <WRow className = "table-entry">
        <WCol size='3'>
            <WNavItem className={entryStyle} >

                {
                    editing ?   <WInput className="table-input" inputClass="table-input-class"
                                
                                    name='name'  autoFocus={true} defaultValue={props.name} 
                                />
                            :   <div className='table-text'>
                                    {props.name}
                                </div>

                }

            {
            <WCol size = "3">
               <div className="button-group">
                    <WButton className={ "table-entry-buttons"} wType="texted" onClick={consolelog} >
                        <i className="material-icons">delete</i>
                    </WButton>
               </div>
            </WCol>

            }
        </WNavItem>
         </WCol>
    </WRow>
    )

}
export default RegionEntry