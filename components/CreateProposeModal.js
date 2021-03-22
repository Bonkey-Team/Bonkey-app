import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from 'react'
import { Input, Modal, Dropdown, TextArea, Button } from 'semantic-ui-react'
import { getProjectContract } from '../utils/Project'
import Web3 from 'web3'

// create a proposal
function CreateProposeModal(props) {
  const [ data, setData ] = useState({open: false, content:'', amount:0, loading:false })
  const { active, library, account } = useWeb3React()
  const web3 = new Web3(library)

  const submit = async () => {
    setData({ loading: true})

    try{
      const { content, amount } = data;
      console.log(props.projectAddress)
      // create a proposal
      const contract = await getProjectContract(library, props.projectAddress, account)
      console.log(contract)
      const overrides = {
        gasLimit: 6000000
      }
      await contract.propose(content, web3.utils.toWei(amount, 'ether'), 8000000, overrides)
    }catch(err){
      console.log("submit error !", err)
    }
    setData({...data, open:false, loading: false})
  }

  return (
    <Modal
      onClose={() => setData({open:false})}
      onOpen={() => setData({open:true})}
      open={data.open}
      trigger={<Button disabled={!active} color='orange'>Create Proposal</Button>}
      style={{marginBottom:'100px'}}
    >
      <Modal.Header>Create Proposal</Modal.Header>
      
        <Modal.Content>
          <div style={{width: '720px', height:'20px', display:'flex', flexDirection:'column'}}>
              <label>Description</label>
          </div>
          <div style={{width: '720px', height:'100px', display:'flex', flexDirection:'column'}}>
              <TextArea value={data.content} onChange={e => setData({...data, content: e.target.value})} placeholder='Chinese word same as English' style={{ minHeight: 100, border:'1px solid #e3e5e6' }} />
          </div>
          <div style={{width: '720px', height:'20px', display:'flex', flexDirection:'column', marginTop:'10px'}}>
              <label>Value in bsc</label>   
          </div>
          <div style={{width: '720px', height:'20px', display:'flex', flexDirection:'column'}}>
          <Input
              value={data.amount}
              onChange={e => setData({...data, amount: e.target.value})}
              label={<Dropdown defaultValue='BNB' options={[{key:'BNB', text:'BNB', value:'BNB'}]} />}
              labelPosition='right'
              placeholder='0.0'
          />
          </div>
        </Modal.Content>
        <Modal.Actions style={{marginTop:'100px'}}>
          <Button color='black' onClick={() => setData({open: false})}>
            Cancel!
          </Button>
          <Button
            content="Create!"
            labelPosition='right'
            icon='checkmark'
            onClick={() => submit()}
            positive
            loading={data.loading}
          />
        </Modal.Actions>
    </Modal>
  )
}

export default CreateProposeModal
