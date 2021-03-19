import React, { useEffect, useState } from 'react';
import { Segment, Grid, Input, Header, Image, Form, Message } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';
import InputPanel  from '../components/InputPanel'
import InputAreaPanel  from '../components/InputAreaPanel'
import { createProject as  CreateProject1 } from '../utils/Project'
import { useWeb3React } from '@web3-react/core'
import { AuthButon as Button } from '../components/AuthButton'

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
    setPost({...post, loading: true})
    try{
      console.log("before submit : ", post)
      CreateProject1(post.stToken, 
                     post.tgToken, 
                     post.price, 
                     post.rateProposal, 
                     post.rateWithdraw, 
                     post.rateCommission, 
                     post.projectMeta,
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
                <InputPanel label='Source Token' placeholder='0x' name='stToken' 
                            value={post.stToken} onChange={e => setPost({...post, stToken: e.target.value})}/>
                <InputPanel label='Target Token' placeholder='0x'
                            value={post.tgToken} onChange={e => setPost({...post, tgToken: e.target.value})}/>
                <InputPanel label='Price' placeholder='0.0'
                            value={post.price} onChange={e => setPost({...post, price: e.target.value})}/>
                <InputPanel label='Min Rate To Pass Proposal' placeholder='0.0'
                            value={post.rateProposal} onChange={e => setPost({...post, rateProposal: e.target.value})}/>
                <InputPanel label='Min Rate To Withdraw' placeholder='0.0'
                            value={post.rateWithdraw} onChange={e => setPost({...post, rateWithdraw: e.target.value})}/>
                <InputPanel label='Commission Rate' placeholder='0.0'
                            value={post.rateCommission} onChange={e => setPost({...post, rateCommission: e.target.value})}/>
                <InputAreaPanel label='Project Meta' placeholder='describe you project'
                            value={post.projectMeta} onChange={e => setPost({...post, projectMeta: e.target.value})}/>
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
