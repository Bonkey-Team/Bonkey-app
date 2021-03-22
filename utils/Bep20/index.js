import { getContract } from '../index'
import { BEP20TOKEN_DEFINETION } from '../../constants/abis/bep20token'

export async function getToken(provider, account, tokenAddress) {
    // contractFactory.createProject('0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c','0xd08a0d5dbe7840d059fd50c953e3340e65606ea4',10,90,90,10,"hello", overrides).then(p => console.log('ddd',p)).catch((err)=>console.log(err))    
    const token = getContract(tokenAddress, BEP20TOKEN_DEFINETION['abi'], provider, account);
    return token
}

export async function allowance(provider, account, sender, tokenAddress, contractAddress, amount) {
    // contractFactory.createProject('0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c','0xd08a0d5dbe7840d059fd50c953e3340e65606ea4',10,90,90,10,"hello", overrides).then(p => console.log('ddd',p)).catch((err)=>console.log(err))    
    const token = await getToken(provider, account, tokenAddress)
    console.log('before allowance, token is : ', token, ', sender is:', sender, ', contract is : ', contractAddress, ', amount : ', amount)
    // return await token.allowance(sender, contractAddress)
    // for test below
    await token.allowance(sender, contractAddress).then(e => console.log('1. allowance succeed:',e))
    .catch(e => console.log('1. allowance error: ', e))
    await token.approve(contractAddress, amount).then(e => console.log('2. appove succeed:',e))
    .catch(e => console.log('2. appove error: ', e))
    // const overrides = {
    //     gasLimit: 6000000
    // }
    // token.transferFrom(sender, contractAddress, amount, overrides).then(e => console.log('3. transform succeed:',e))
    //                                                     .catch(e => console.log('3. transform error: ', e))
}

export async function balanceOf(provider, account, tokenAddress, contractAddress) {
    const token = await getToken(provider, account, tokenAddress)
    
    return await token.balanceOf(contractAddress)
}