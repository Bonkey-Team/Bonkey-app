import { Form } from 'semantic-ui-react'

export default function InputAreaPanel(props){
    return (
        <>
            <Form.Field style={{marginBottom:'10px'}}>
            <div style={{width:'100%', display:'flex', margin:'2px 5px', fontSize:'16px', color:'grey'}}>
            <label>{props.label}</label>
            </div>
            <textarea placeholder={props.placeholder} name={props.name} value={props.value} onChange={props.onChange}/>
            </Form.Field>
         </>
    )
}