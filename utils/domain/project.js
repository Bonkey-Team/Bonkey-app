import { getContract } from '../index'
import { BONKEY_FACTORY_ABI, BONKEY_FACTORY_ADDRESS } from '../../constants/abis/bonkeyfatory'

export async function createProject(stToken, tgToken, price, rateProposal, rateWithdraw, rateCommission, projectMeta, provider, account) {
    // contractFactory.createProject('0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c','0xd08a0d5dbe7840d059fd50c953e3340e65606ea4',10,90,90,10,"hello", overrides).then(p => console.log('ddd',p)).catch((err)=>console.log(err))
    console.log("when create, provider: ", provider, ", account is ", account)
    const contractFactory = getContract(BONKEY_FACTORY_ADDRESS, BONKEY_FACTORY_ABI['abi'], provider, account);
    const overrides = {
        gasLimit: 2000000
    }
    console.log("when create, factory is : ", contractFactory)
    console.log("when create, param is : ", projectMeta)
 
    return contractFactory.createProject(stToken,tgToken,parseInt(price),parseInt(rateProposal),parseInt(rateWithdraw),parseInt(rateCommission),projectMeta, overrides);
}

// fetch total project count
export async function fetchProjectCount(provider){
    console.log("when create, provider: ", provider, ", account is ")
    const contractFactory = getContract(BONKEY_FACTORY_ADDRESS, BONKEY_FACTORY_ABI['abi'], provider);
    const overrides = {
        gasLimit: 2000000
    }
    console.log("when create, factory is : ", contractFactory)
    return contractFactory.allPairsLength(overrides)
}