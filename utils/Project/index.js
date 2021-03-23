import { getContract } from '../index'
import { BONKEY_FACTORY_DEFINETION, BONKEY_FACTORY_ADDRESS } from '../../constants/abis/bonkeyfatory'
import { PROJECT_DEFINETION } from '../../constants/abis/project'

export async function createProject(stToken, tgToken, price, rateProposal, rateWithdraw, rateCommission, projectTitle, projectContent, provider, account) {
    // contractFactory.createProject('0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c','0xd08a0d5dbe7840d059fd50c953e3340e65606ea4',10,90,90,10,"hello", overrides).then(p => console.log('ddd',p)).catch((err)=>console.log(err))    
    const contractFactory = getContract(BONKEY_FACTORY_ADDRESS, BONKEY_FACTORY_DEFINETION['abi'], provider, account);
    const overrides = {
        gasLimit: 8000000
    }
 
    const projectMeta = {
        title: projectTitle,
        content: projectContent
    }

    const pmeta = encodeURIComponent(JSON.stringify(projectMeta))
    return contractFactory.createProject(
        stToken,
        tgToken,
        price,
        parseInt(rateProposal),
        parseInt(rateWithdraw),
        parseInt(rateCommission), 
        pmeta,
        overrides
        );
}

// fetch total project count
export async function fetchProjectCount(provider){
    const contractFactory = await getContract(BONKEY_FACTORY_ADDRESS, BONKEY_FACTORY_DEFINETION['abi'], provider);
    // const overrides = {
    //     gasLimit: 8000000
    // }
    const size = await contractFactory.allPairsLength()
    return size
}

export async function fetchProject(provider, index){
    const contractFactory = getContract(BONKEY_FACTORY_ADDRESS, BONKEY_FACTORY_DEFINETION['abi'], provider);
    const overrides = {
        gasLimit: 2000000
    }
    
    return contractFactory.allPairs(index, overrides)
}

export async function getProjectContract(provider, address, account){
    const project = await getContract(address, PROJECT_DEFINETION['abi'], provider, account);
    return project
}

export async function getProjectInfo(provider, address1, account){
    const contract = await getProjectContract(provider, address1, account);
    const address = contract.address
    const st = await contract._source_token()
    const tt = await contract._target_token()
    const p = await contract._price()
    const mrtpp = await contract._min_rate_to_pass_proposal()
    const mrtpr = await contract._min_rate_to_pass_request()
    const cr = await contract._commission_rate()
    const pm = await contract._project_meta()
    let title = ''
    let content = ''
    try{
        const pmStr = decodeURIComponent(pm)
        const json = JSON.parse(pmStr)
        title = json['title']
        content = json['content']
    }catch(err){
        console.log("convert json error : ", err)
        title = pm
        content = pm
    }
    
    return {address: address, sourceToken: st, targetToken: tt, price: p, rateProposal: mrtpp, 
            rateRequest: mrtpr.toString(10), rateCommission: cr, title: title, content: content
    }
}

export async function deposit(provider, account, address, tokenAddress, amount) {
    const projectContract = await getProjectContract(provider, address, account);
    projectContract.deposit(tokenAddress, amount)
        .then(r => console.log('deposit submit succeed.', r))
        .catch(err => console.log('deposit submit error.', err))
}