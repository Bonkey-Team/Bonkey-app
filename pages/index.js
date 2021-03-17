import React, { Component } from 'react';
import { Segment, Grid, Input, Header, Image, Form, Button, Message } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';
import InputPanel  from '../components/InputPanel'
import InputAreaPanel  from '../components/InputAreaPanel'

class CampaignIndex extends Component {

  render() {
        return (
          
             <Grid textAlign='center' style={{ height: '100' }}>
                <Grid.Column style={{ maxWidth: 450 }}>
                  <Form size='large'>
                    <Segment stacked style={{width: '500px', align: 'center'}}>
                      <Header as='h2' color='orange' textAlign='left'>
                      Create Project 
                      </Header>
                      <InputPanel label='Source Token' placeholder='0x'/>
                      <InputPanel label='Target Token' placeholder='0x'/>
                      <InputPanel label='Price' placeholder='0.0'/>
                      <InputPanel label='Min Rate To Pass Proposal' placeholder='0.0'/>
                      <InputPanel label='Min Rate To Withdraw' placeholder='0.0'/>
                      <InputPanel label='Commission Rate' placeholder='0.0'/>
                      <InputAreaPanel label='Project Meta' placeholder='describe you project'/>
                      <Button color='orange' fluid size='large'>
                       Create 
                      </Button>
                    </Segment>
                  </Form>
                </Grid.Column>
              </Grid>
          
        )
  }
}

export default CampaignIndex;
