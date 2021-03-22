import { Contract } from '@ethersproject/contracts'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value) {
    try {
      return getAddress(value)
    } catch {
      return false
    }
  }

  
// account is not optional
export function getSigner(library, account) {
    return library.getSigner(account).connectUnchecked()
  }
  
  // account is optional
  export function getProviderOrSigner(library, account) {
    return account ? getSigner(library, account) : library
  }
  
  // account is optional
  export function getContract(address, ABI, library, account) {
    if (!isAddress(address) || address === AddressZero) {
      throw Error(`Invalid 'address' parameter '${address}'.`)
    }
  
    return new Contract(address, ABI, getProviderOrSigner(library, account))
  }

export  const calculatePagenation = (totalCount, activeItem, pageSize) => {
    if(totalCount < 1) {
      return { startIndex:0, endIndex:0, pages:0 }
    }
    const pageCount = totalCount % pageSize === 0 ? totalCount / pageSize : totalCount / pageSize + 1
    
    if(activeItem < 1){
      activeItem = 1        
    }else if(activeItem > pageCount){
      activeItem = pageCount
    }else if(activeItem === undefined){
      activeItem = 1
    }
    
    const startIndex = (activeItem - 1) * pageSize
    const endIndex = startIndex + pageSize > totalCount ? totalCount : startIndex + pageSize

    let pages = []
    for(var i = 1; i <= pageCount; i ++){
      pages.push(i)
    }
    return { startIndex: startIndex, endIndex: endIndex, pages: pages, activeItem1: activeItem }
}