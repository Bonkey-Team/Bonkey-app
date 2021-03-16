import React from 'react'
import { Button, Input, Modal, Dropdown, TextArea } from 'semantic-ui-react'


const CreatRequestView = () => (

        <div style={{width: '720px', height:'460px', display:'flex', flexDirection:'column'}}>
            <div style={{width: '720px', height:'20px', display:'flex', flexDirection:'column'}}>
                <label>Description</label>
            </div>
            <div style={{width: '720px', height:'100px', display:'flex', flexDirection:'column'}}>
                <TextArea placeholder='Chinese word same as English' style={{ minHeight: 100, border:'1px solid #e3e5e6' }} />
            </div>
            <div style={{width: '720px', height:'20px', display:'flex', flexDirection:'column', marginTop:'10px'}}>
                <label>Value in ether</label>   
            </div>
            <div style={{width: '720px', height:'20px', display:'flex', flexDirection:'column'}}>
            <Input
                label={<Dropdown defaultValue='BNB' options={[{key:'BNB', text:'BNB', value:'BNB'}]} />}
                labelPosition='right'
                placeholder='0.0'
            />
            </div>
        </div>
    
)

function CreateRequestModal() {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button primary>Create Request</Button>}
    >
      <Modal.Header>Create Request</Modal.Header>
      <Modal.Content>
        <CreatRequestView/>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Cancel!
        </Button>
        <Button
          content="Create!"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default CreateRequestModal
