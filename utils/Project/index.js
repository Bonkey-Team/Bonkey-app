import { getContract } from '../index'
import { BONKEY_FACTORY_DEFINETION, BONKEY_FACTORY_ADDRESS } from '../../constants/abis/bonkeyfatory'
import { PROJECT_DEFINETION } from '../../constants/abis/project'

export async function createProject(stToken, tgToken, price, rateProposal, rateWithdraw, rateCommission, projectMeta, provider, account) {
    // contractFactory.createProject('0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c','0xd08a0d5dbe7840d059fd50c953e3340e65606ea4',10,90,90,10,"hello", overrides).then(p => console.log('ddd',p)).catch((err)=>console.log(err))    
    const contractFactory = getContract(BONKEY_FACTORY_ADDRESS, BONKEY_FACTORY_DEFINETION['abi'], provider, account);
    const overrides = {
        gasLimit: 2000000
    }
 
    return contractFactory.createProject(stToken,tgToken,parseInt(price),parseInt(rateProposal),parseInt(rateWithdraw),parseInt(rateCommission),projectMeta, overrides);
}

// fetch total project count
export async function fetchProjectCount(provider){
    const contractFactory = getContract(BONKEY_FACTORY_ADDRESS, BONKEY_FACTORY_DEFINETION['abi'], provider);
    const overrides = {
        gasLimit: 2000000
    }
    
    return contractFactory.allPairsLength(overrides)
}

export async function fetchProject(provider, index){
    const contractFactory = getContract(BONKEY_FACTORY_ADDRESS, BONKEY_FACTORY_DEFINETION['abi'], provider);
    const overrides = {
        gasLimit: 2000000
    }
    
    return contractFactory.allPairs(index, overrides)
}

export async function getProjectInfo(provider, address){
    const project = getContract(address, PROJECT_DEFINETION['abi'], provider);
    return project
}