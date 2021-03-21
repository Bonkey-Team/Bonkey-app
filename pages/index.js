import React, { useEffect, useState } from 'react';
import { Segment, Grid, Card, Header, Image, Form, Message } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';
import InputPanel  from '../components/InputPanel'
import InputAreaPanel  from '../components/InputAreaPanel'
import { createProject as  CreateProject1 } from '../utils/Project'
import { useWeb3React } from '@web3-react/core'
import { AuthButon as Button } from '../components/AuthButton'
import Web3 from 'web3';

const CreateProject = () => {
  const { library, account } = useWeb3React()

  const [post, setPost] = useState({})


  const sourceToken = 0;
  
  useEffect(() => {
    console.log("sourceToken changed. new value : ", post)
  }, [post])


  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  const submit = async () => {
    // do submit
    web3 = new Web3(library)
    setPost({...post, loading: true})
    try{
      console.log("before submit : ", post)
      CreateProject1(post.stToken, 
                     post.tgToken, 
                     web3.utils.toWei(post.price.toString(), 'ether'), 
                     post.rateProposal, 
                     post.rateWithdraw, 
                     post.rateCommission, 
                     post.projectTitle,
                     post.projectContent,
                     library, 
                     account).then(r => console.log('create project succeed!'))
                             .catch(err => {
                               console.log('create project error. ', err)
                               alert('create project error. ', err)
                              });

      console.log("after submit : ", post)
    }catch(err){
      console.log('submit form error: ', err)
    }
    setPost({...post, loading: false})
  }

  return (
        <Grid textAlign='center' style={{ height: '100' }}>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size='large' onSubmit={submit}>
              <Segment stacked style={{width: '500px', align: 'center'}}>
                <Header as='h2' color='orange' textAlign='left'>
                Create Project 
                </Header>
                <Card style={{width:'100%'}}>
                  <InputPanel label='Source Token' placeholder='0x' name='stToken' 
                              value={post.stToken} onChange={e => setPost({...post, stToken: e.target.value})}/>
                  <InputPanel label='Target Token' placeholder='0x'
                              value={post.tgToken} onChange={e => setPost({...post, tgToken: e.target.value})}/>
                </Card>
                <Card style={{width:'100%', display:'flex', flexFlow:'row wrap', justifyContent:'space-between'}}>
                  <InputPanel label='Price' placeholder='0.0' style={{flex:'0 0 45%'}}
                              value={post.price} onChange={e => setPost({...post, price: e.target.value})}/>
                  <InputPanel label='Min Rate To Pass Proposal' placeholder='0.0' style={{flex:'0 0 45%'}}
                              value={post.rateProposal} onChange={e => setPost({...post, rateProposal: e.target.value})}/>
                  <InputPanel label='Min Rate To Withdraw' placeholder='0.0' style={{flex:'0 0 45%'}}
                              value={post.rateWithdraw} onChange={e => setPost({...post, rateWithdraw: e.target.value})}/>
                  <InputPanel label='Commission Rate' placeholder='0.0' style={{flex:'0 0 45%'}}
                              value={post.rateCommission} onChange={e => setPost({...post, rateCommission: e.target.value})}/>
                </Card>
                <Card style={{width:'100%', display:'flex', flexFlow:'column'}}>
                  <InputPanel label='Project Title' placeholder='title'
                              value={post.projectTitle} onChange={e => setPost({...post, rateprojectTitleCommission: e.target.value})}/>
                  <InputAreaPanel label='Project Content' placeholder='describe you project'
                              value={post.projectContent} onChange={e => setPost({...post, projectContent: e.target.value})}/>
                </Card>               
                <Button color='orange' fluid size='large' loading={post.loading} style={{width:'100%'}}>
                  Create 
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
    
  )
}

export default CreateProject;
