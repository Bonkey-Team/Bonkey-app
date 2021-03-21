import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { Input, Dropdown } from 'semantic-ui-react'
import TablePagination from "../../components/TablePagination";
import CreateProposeModal from '../../components/CreateProposeModal'
import { AuthButon as Button} from '../../components/AuthButton'
import { FirstCard, SecondaryCard } from '../../components/CustomCard'
import { getProjectInfo } from '../../utils/Project'
import { TRUNCATE_PROJECT_MATE_LEN } from '../../constants/index'
import Web3 from 'web3';


const fillViewData = ( contract, provider ) => {
    const web3 = new Web3(provider)
    let projectInfo =  
        {
            address: contract.address,
            token0: contract.sourceToken,
            token1: contract.targetToken,
            manager: contract.manager,
            price: 0,
            rateProposal: 0,
            rateCommission: 0,
            rateRequest: 0,
            projectTitle: 'title',
            colloborators: [{
                address:'0x05ff2b0db69458a0750badebc4f9e13add608c7f',
                contribute: 0.3
            },{
                address:'0x05ff2b0db69458a0750badebc4f9e13add608c7f',
                contribute: 0.6
            }]
        }
        console.log('contract is : ', contract) 
    const price = contract.price
    projectInfo.price = web3.utils.fromWei(price.toString(), 'ether')
    const rateProposal = contract.rateProposal
    projectInfo.rateProposal= rateProposal.toString()
    // const rateRequest = await contract._min_rate_to_pass_request()
    const rateRequest = 0
    // console.log('rate proposal is : ', contract._min_rate_to_pass_request())
    
    projectInfo.rateRequest= rateRequest.toString()
    const rateCommission = contract.rateCommission
    projectInfo.rateCommission= rateCommission.toString()
    return projectInfo    
}

const getRequests = async ( contract ) => {

}
const BodyWraper = ( props ) => {
    const { library, account, active } = useWeb3React() 
    const router = useRouter()
    // if(!active){
    //     router.push('/BonkeyFactory')
    //     return;
    // }
    // get request param
    
    
    
    // set state
    const [ data, setData ] = useState({
        project: {
            manager: '0x',
            token0: '0x',
            token1: '0x',
            price: 0,
            rateProposal: 0,
            rateCommission: 0,
            rateRequest: 0,
            title: '',
            content: ''
        },
        requests: [
            {},
            {}
        ]
    })
    
    useEffect(() => {
        
        // console.log("project address is : ", router.query)
        const p = getProjectInfo(library, props.projectAddress)
        
        p.then(async a => {
            let projectInfo = await fillViewData(a, library)
            console.log('before setdata, project if : ', projectInfo)
            setData({project: projectInfo})
        }).catch(err => console.log("error: ", err))
    }, [active])
    
    const coins = [
        {key:'BNKY', text:'BNKY', value:'BNKY'},
        {key:'BNB', text:'BNB', value:'BNB'},
        {key:'DAI', text:'DAI', value:'DAI'},
    ]
    
    return (
        // 上下两部分
        <div style={{display: 'flex', flexFlow: 'column', width: '900px', height: '900px', background:'#aee2b1'}}>
            <div style={{display: 'flex', flexFlow: 'row', justifyContent:'space-between', width: '900px', height: '410px', borderBottom: '1px solid #5f5f5f'}}>
                <div style={{display:'flex', flexFlow: 'row wrap', justifyContent:'space-between' ,width:'500px', height:'400px'}}>
                    <div style={{width:'490px', height:'30px', margin:'1px 5px'}}>
                        <p style={{display:'flex', flexFlow:'column', justifyContent:'start', fontSize:'15px', marginTop:'3px', height: '30px'}}>Project Show</p>
                    </div>
                    <div style={{width:'490px', height:'150px', margin:'1px 5px 5px'}}>
                        <FirstCard token0={data.project.token0} token1={data.project.token1} mgrAddr={data.project.manager} projectMeta={data.project.title} colloborators=''></FirstCard>
                    </div>
                    <div style={{width:'230px', height:'100px', margin:'2px 5px'}}>
                        <SecondaryCard value={data.project.price} meta='price' desc='price'></SecondaryCard>
                    </div>
                    <div style={{width:'230px', height:'100px', margin:'2px 5px'}}>
                        <SecondaryCard value={data.project.rateProposal} meta='min rate to pass proposal' desc='min rate to pass proposal'></SecondaryCard>
                    </div>
                    <div style={{width:'230px', height:'100px', margin:'2px 5px'}}>
                        <SecondaryCard value={data.project.rateCommission} meta='commission rate' desc='commission rate'></SecondaryCard>
                    </div>
                    <div style={{width:'230px', height:'100px', margin:'2px 5px'}}>
                        <SecondaryCard value={data.project.rateRequest} meta='min rate to pass request' desc='min rate'></SecondaryCard>
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
                        <Button as='a' >Withdraw</Button>
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
                        <Button as='a' >Withdraw</Button>
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', flexFlow: 'column', width: '890px', height: '400px', margin:'5px'}}>
              <div style={{width: '890px', height: '40px', margin:'5px 0px 0px 0px', textAlign:'right'}}>
                {/* TODO 如果已经连接钱包且存在项目则可以创建请求 */}
                {/* <Button as='a' >连接钱包</Button> */}
                <CreateProposeModal projectAddress={data.project.address}/>
              </div>  
              <div style={{width: '890px', height: '500px', margin:'5px 0px'}}>
                  <TablePagination projectAddress={data.project.address}></TablePagination>
              </div>  
            </div>
        </div>
    )
}

export default function ProjectShow(){
    const router = useRouter()
    const projectAddress = router.query.address
    console.log("request url : ", router.query)
    return (
        <>
            <BodyWraper projectAddress={projectAddress}></BodyWraper>
        </>
    )
}
