import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { Input } from 'semantic-ui-react'
import TablePagination from "../../components/TablePagination";
import CreateProposeModal from '../../components/CreateProposeModal'
import { AuthButon as Button} from '../../components/AuthButton'
import { FirstCard, SecondaryCard } from '../../components/CustomCard'
import { getProjectContract, getProjectInfo, deposit } from '../../utils/Project'
import { allowance, balanceOf, getToken } from '../../utils/Bep20'
import { injectedConnector } from '../../components/WalletButton'
import Web3 from 'web3';

const fillViewData = ( contract, provider ) => {
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
    try{
        const web3 = new Web3(provider)
        const price = contract.price
        projectInfo.price = web3.utils.fromWei(price.toString(10), 'ether')
        const rateProposal = contract.rateProposal
        projectInfo.rateProposal= rateProposal.toString(10)
        projectInfo.rateRequest = contract.rateRequest
        const rateCommission = contract.rateCommission
        projectInfo.rateCommission= rateCommission.toString(10)
    }catch(error){
        console.log('fill view meta error: ', error)
    }
    return projectInfo    
}

const BodyWraper = ( props ) => {
    const { library, account, active, activate } = useWeb3React() 
    
    // set state
    const [ data, setData ] = useState({
        token0: 0,
        token1: 0,
        address:'0x',
        contributeToken0: 0,
        contributeToken1: 0,
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
        }
    })
    const [ symbol, setSymbol ] = useState({})
    const [ tokenBalance, setTokenBalance ] = useState({sourceToken:0, targetToken:0})

    // fetch project info, rendering when active change
    useEffect(() => {
        const fetchData = async () => {
            const p = await getProjectInfo(library, props.projectAddress)
            let projectInfo = fillViewData(p, library)
            setData({...data, project: projectInfo})   
        }
        if(props.projectAddress === undefined || props.projectAddress === '0x'){
            return
        }
        try{
            fetchData()
        }catch(err){
            console.log('render project info error: ', err)
        }
    }, [active])

    // fetch token0 balance
    useEffect(() => {
        const fetchData = async () => {
            const contract = await getProjectContract(library, props.projectAddress, account)
            const token = await contract._source_token()
            const token0Balance = await balanceOf(library, account, token, contract.address)
            setTokenBalance({...tokenBalance, sourceToken: token0Balance.toString(10)})
        }
        fetchData()
    }, [tokenBalance.sourceToken])

    // fetch token1 balance, rendering follows page rendering
    useEffect(() => {
        const fetchData = async () => {
            const contract = await getProjectContract(library, props.projectAddress, account)
            const token = await contract._target_token()
            const token1Balance = await balanceOf(library, account, token, contract.address)
            setTokenBalance({...tokenBalance, targetToken: token1Balance.toString(10)})
        }
        fetchData()
    }, [tokenBalance.targetToken])

    

    // get token symbol
    useEffect(() => {
        const fetchTokenSymbol = async () => {
            try{
                const contract = await getProjectContract(library, props.projectAddress, account)
                const sourceToken = await contract._source_token();
                const targetToken = await contract._target_token();
                const stoken = await getToken(library, account, sourceToken)
                const ttoken = await getToken(library, account, targetToken)
                const sSymbol = await stoken.symbol()
                const tSymbol = await ttoken.symbol()
                setSymbol({s: sSymbol, t: tSymbol})
            }catch(err){
                console.log('fetch token symbol error. ', err)
            }
        }
        if(props.projectAddress === undefined || props.projectAddress === '0x'){
            return
        }
        fetchTokenSymbol()
    }, [props.projectAddress])

    // this method
    // data.contributeToken0 , data.contributeToken0
    const approveToken = async ( token, amount ) => {
        if(amount === 0){
            alert("input amount")
            return
        }
        allowance(library, account, account, token, data.project.address, amount)
            .then(r => console.log('succeed approved: ', r))
            .catch(e => console.log('error while approved: ', e))
    }

    const despositToken = async ( token, amount ) => {
        if(amount === 0){
            alert("input amount")
            return
        }
        await deposit(library, account, data.project.address, token, amount)
    }

    const withdrawToken = async ( token, amount ) => {
        if(data.contributeToken0 === 0){
            alert("input amount")
            return
        }       
    }

    return (
        // 上下两部分
        <div style={{display: 'flex', flexFlow: 'column', width: '900px', height: '1000px', background:'#aee2b1'}}>
            <div style={{display: 'flex', flexFlow: 'row', justifyContent:'space-between', width: '900px', height: '510px', borderBottom: '1px solid #5f5f5f'}}>
                <div style={{display:'flex', flexFlow: 'row wrap', justifyContent:'space-between' ,width:'500px', height:'500px'}}>
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
                    <div style={{width:'230px', height:'100px', margin:'2px 5px'}}>
                        <SecondaryCard value={tokenBalance.sourceToken} meta='source token balance' desc='source token balance'></SecondaryCard>
                    </div>
                    <div style={{width:'230px', height:'100px', margin:'2px 5px'}}>
                        <SecondaryCard value={tokenBalance.targetToken} meta='target token balance' desc='target token balance'></SecondaryCard>
                    </div>
                </div>
                <div style={{width:'350px', height:'300px', margin:'44px 5px', display: 'flex', flexDirection:'column'}}>
                    {/* contribute token0 */}
                    <div style={{width:'340px', height:'60px', margin:'2px auto', background:'#fff'}}>
                        <label>Contribute Token0</label>
                        <Input label={symbol.s}
                               labelPosition='right' 
                               placeholder='0.0'
                               value={data.contributeToken0}
                               onChange={e => setData({...data, contributeToken0:e.target.value})}></Input>
                    </div>
                    <div style={{width:'340px', height:'40px', margin:'2px auto'}}>
                        <Button as='a' onClick={() => approveToken(data.project.token0, data.contributeToken0)}>Approve</Button>
                        <Button as='a' onClick={() => despositToken(data.project.token0, data.contributeToken0)}>Deposit</Button>
                        <Button as='a' onClick={() => withdrawToken(data.project.token0, data.contributeToken0)}>Withdraw</Button>
                    </div>
                    {/* contribute token1 */}
                    <div style={{width:'340px', height:'60px', margin:'10px 2px 5px 5px', background:'#fff'}}>
                        <label>Contribute Token1</label>
                        <Input label={symbol.t}
                               labelPosition='right' 
                               placeholder='0.0'
                               value={data.contributeToken1}
                               onChange={e => setData({...data, contributeToken1: e.target.value})}></Input>
                    </div>
                    <div style={{width:'340px', height:'40px', margin:'2px auto'}}>
                        <Button as='a' onClick={() => approveToken(data.project.token1, data.contributeToken1)}>Approve</Button>
                        <Button as='a' onClick={() => despositToken(data.project.token1, data.contributeToken1)}>Deposit</Button>
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
    return (
        <>
            <BodyWraper projectAddress='0x21D649AA34C3c116156071245B9B94C8636A0Bbd'></BodyWraper>
        </>
    )
}
