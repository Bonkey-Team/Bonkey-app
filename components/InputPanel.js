import { Form } from 'semantic-ui-react'

export default function InputPanel(props){
    return (
        <>
            <Form.Field style={{marginBottom:'10px', width:'100%'}}>
            <div style={{width:'100%', display:'flex', margin:'2px 5px', fontSize:'16px', color:'grey'}}>
            <label>{props.label}</label>
            </div>
            <input placeholder={props.placeholder}/>
            </Form.Field>
         </>
    )
}