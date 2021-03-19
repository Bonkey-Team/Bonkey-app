import { Card } from 'semantic-ui-react'

const FirstCard = (props) =>{
    return (
        <Card style={{width:'100%', height:'100%'}}>
            <Card.Content>
                <Card.Header style={{margin:'5px auto', fontSize:'14px'}}>Token0: {props.token0}</Card.Header>
                <Card.Header style={{margin:'5px auto', fontSize:'14px'}}>Token1: {props.token1}</Card.Header>
                <Card.Meta style={{margin:'5px auto'}}>Manager Address: {props.mgrAddr}</Card.Meta>
                <Card.Description style={{margin:'5px auto'}}><a>{props.projectMeta}</a></Card.Description>
                <Card.Description style={{margin:'5px auto'}}><a>View Colloborators</a></Card.Description>
            </Card.Content>
        </Card>
    )
}

const SecondaryCard = (props) =>{
    return (
        <Card style={{width:'100%', height:'100%'}}>
            <Card.Content>
                <Card.Header style={{margin:'5px auto', fontSize:'12px'}}>{props.value}</Card.Header>
                <Card.Meta style={{margin:'5px auto'}}>{props.meta}</Card.Meta>
                <Card.Description style={{margin:'5px auto'}}>{props.desc}</Card.Description>
            </Card.Content>
        </Card>
    )
}

export { FirstCard, SecondaryCard }