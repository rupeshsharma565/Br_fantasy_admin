import React, { Component } from 'react';  
import Select from 'react-select';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {CONST} from './../_config/index'

class RmInput extends React.Component { 
    constructor(props){
        super(props)
        this.state={
            details:props.details,
            dropvalue:props.dropvalue
        }
    } 

    
   render() { 
       let {details}=this.state; 
       let keylistvalue=(details.keylistvalue)?JSON.parse(details.keylistvalue):{};
          if(details.keytype==="enum"){return (
             <Select options={keylistvalue} required
                      name="addStatus" 
                      value={details[details.keyname]} 
                      onChange={(e)=>this.props.triggerUpdate(e)} 
             isSearchable={true} />)
             }
             else if(details.keyvaltype==="number"){return( <input type="number" value={details.keyvalue} onChange={(e)=>this.props.triggerUpdate(e)} pattern={CONST.PATTERN.number} required />)}
             else if(details.keyvaltype==="percentage"){return( <input type="number" min={0} max={100} value={details.keyvalue} onChange={(e)=>this.props.triggerUpdate(e)} pattern={CONST.PATTERN.percentage} required />)}
             else return(<span> </span>)
         
      
   }  
}  

export default RmInput;