import { Form, Input } from 'semantic-ui-react'

export default function InputPanel(props){
    return (
        <>
            <Form.Field style={props.style}>
                <div style={{width:'100%', display:'flex', margin:'2px 5px', fontSize:'16px', color:'grey'}}>
                <label>{props.label}</label>
                </div>
                <Input placeholder={props.placeholder} name={props.name} value={props.value} onChange={props.onChange}/>
            </Form.Field>
         </>
    )
}