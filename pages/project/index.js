import Layout from "../../components/Layout";
import { Card, Input, Dropdown, Button } from 'semantic-ui-react'
import { checkPropTypes } from "prop-types";
import { forEach } from "async";
import InputPanel from "../../components/InputPanel";
import TablePagination from "../../components/TablePagination";
import CreateRequestModal from '../../components/CreateRequestModal'

const projectData = {
    firstCard: {
        token0: '0xc46180bedf5c78e536f511d00e535ca8b63dfda8',
        token1: '0x852cdfe1879b7e7e5ee4475008dc19b93b7d5667',
        mgrAddr: '0x05ff2b0db69458a0750badebc4f9e13add608c7f',
        projectMeta: 'project introduction',
        colloborators: [{
            address:'0x05ff2b0db69458a0750badebc4f9e13add608c7f',
            contribute: 0.3
        },{
            address:'0x05ff2b0db69458a0750badebc4f9e13add608c7f',
            contribute: 0.6
        }]
    },
    secondaryCard: [{
        value:'0.2',
        meta:'Price',
        desc:'the price of you token0',
    },{
        value:'0.2',
        meta:'Price',
        desc:'the price of you token0',
    },{
        value:'0.2',
        meta:'Price',
        desc:'the price of you token0',
    },{
        value:'0.2',
        meta:'Price',
        desc:'the price of you token0',
    }]
}

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

const BodyWraper = () => {
    const p = projectData.firstCard;
    const s = projectData.secondaryCard;
    const coins = [
        {key:'BNKY', text:'BNKY', value:'BNKY'},
        {key:'BNB', text:'BNB', value:'BNB'},
        {key:'DAI', text:'DAI', value:'DAI'},
    ]
    console.log(s[0])
    return (
        // 上下两部分
        <div style={{display: 'flex', flexFlow: 'column', width: '900px', height: '900px', background:'#aee2b1'}}>
            <div style={{display: 'flex', flexFlow: 'row', justifyContent:'space-between', width: '900px', height: '410px', borderBottom: '1px solid #5f5f5f'}}>
                <div style={{display:'flex', flexFlow: 'row wrap', justifyContent:'space-between' ,width:'500px', height:'400px'}}>
                    <div style={{width:'490px', height:'30px', margin:'1px 5px'}}>
                        <p style={{display:'flex', flexFlow:'column', justifyContent:'start', fontSize:'15px', marginTop:'3px', height: '30px'}}>Project Show</p>
                    </div>
                    <div style={{width:'490px', height:'150px', margin:'1px 5px 5px'}}>
                        <FirstCard token0={p.token0} token1={p.token1} mgrAddr={p.mgrAddr} projectMeta={p.projectMeta} colloborators=''></FirstCard>
                    </div>
                    <div style={{width:'230px', height:'100px', margin:'2px 5px'}}>
                        <SecondaryCard value={s[0].value} meta={s[0].meta} desc={s[0].desc}></SecondaryCard>
                    </div>
                    <div style={{width:'230px', height:'100px', margin:'2px 5px'}}>
                        <SecondaryCard value={s[1].value} meta={s[1].meta} desc={s[1].desc}></SecondaryCard>
                    </div>
                    <div style={{width:'230px', height:'100px', margin:'2px 5px'}}>
                        <SecondaryCard value={s[2].value} meta={s[2].meta} desc={s[2].desc}></SecondaryCard>
                    </div>
                    <div style={{width:'230px', height:'100px', margin:'2px 5px'}}>
                        <SecondaryCard value={s[3].value} meta={s[3].meta} desc={s[3].desc}></SecondaryCard>
                    </div>
                </div>
                <div style={{width:'350px', height:'300px', margin:'44px 5px', display: 'flex', flexDirection:'column'}}>
                    {/* contribute token0 */}
                    <div style={{width:'340px', height:'60px', margin:'2px auto', background:'#fff'}}>
                        <label>Contribute Token0</label>
                        <Input label={<Dropdown defaultValue='BNKY' options={coins}></Dropdown>} 
                               labelPosition='right' 
                               placeholder='0.0'></Input>
                    </div>
                    <div style={{width:'340px', height:'40px', margin:'2px auto'}}>
                        <Button as='a' >Approve</Button>
                        <Button as='a' >Deposit</Button>
                    </div>
                    {/* contribute token1 */}
                    <div style={{width:'340px', height:'60px', margin:'10px 2px 5px 5px', background:'#fff'}}>
                        <label>Contribute Token1</label>
                        <Input label={<Dropdown defaultValue='BNB' options={coins}></Dropdown>} 
                               labelPosition='right' 
                               placeholder='0.0'></Input>
                    </div>
                    <div style={{width:'340px', height:'40px', margin:'2px auto'}}>
                        <Button as='a' >Approve</Button>
                        <Button as='a' >Deposit</Button>
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', flexFlow: 'column', width: '890px', height: '400px', margin:'5px'}}>
              <div style={{width: '890px', height: '40px', margin:'5px 0px 0px 0px', textAlign:'right'}}>
                {/* TODO 如果已经连接钱包且存在项目则可以创建请求 */}
                {/* <Button as='a' >连接钱包</Button> */}
                <CreateRequestModal/>
              </div>  
              <div style={{width: '890px', height: '500px', margin:'5px 0px'}}>
                  <TablePagination></TablePagination>
              </div>  
            </div>
        </div>
    )
}

export default function ProjectShow(){
    return (
        <Layout>
            <BodyWraper></BodyWraper>
        </Layout>
    )
}
