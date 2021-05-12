import React from 'react'
import {WNavItem, WInput, WCol, WButton, WRow} from 'wt-frontend'
import {useState} from 'react'



const RegionEntry =(props)=>{
     const [editing, toggleEditing] = useState(false);
     const [preEdit, setPreEdit] = useState(props.name);
     const handleEditing = (e) => {
         console.log(props.name)
        e.stopPropagation();
        setPreEdit(props.name);
        toggleEditing(!editing);
    };

    const handleSubmit = (e)=>{
        handleEditing(e);
        const {name,value}= e.target;
        console.log(props.changeName);
        console.log(props.delete);

        props.nameChange(props._id,name,value);
    }

const consolelog =()=>{
    console.log("hello")
}
const deleteEntry =()=>{
    console.log(props._id)
    props.delete(props._id)
}


    const entryStyle = props._id === props.activeid ? 'list-item-active' : 'list-item ';



    return(

    <WRow className = "table-entry">
        <WCol size='3'>
            <WNavItem className={entryStyle} onDoubleClick={handleEditing}>

                {
                    editing ?   <WInput className="table-input" inputClass="table-input-class"
                                
                                    name='name'  autoFocus={true} defaultValue={props.name} onBlur={handleSubmit} 
                                />
                            :   <div className='table-text'>
                                    {props.name}
                                </div>

                }

            {
            <WCol size = "3">
               <div className="button-group">
                    <WButton className={ "table-entry-buttons"} wType="texted" onClick={deleteEntry} >
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