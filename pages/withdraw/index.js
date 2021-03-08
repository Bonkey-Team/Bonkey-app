import React, { Component } from 'react';
import { Segment, Grid, Input, Header, Image, Form, Button, Message } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

class WithdrawIndex extends Component {

  render() {
        
        return (
          <Layout>
             <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                  <Header as='h2' color='orange' textAlign='center'>
                    创建项目
                  </Header>
                  <Form size='large'>
                    <Segment stacked style={{width: '500px', align: 'center'}}>
                      <Form.Input fluid placeholder='请输入代币合约地址' />
                      <Form.Input fluid placeholder='请输入兑换合约地址' />
                      <Form.Input fluid placeholder='请输入兑换价格' />
                      <Form.Input fluid placeholder='请输入提案通过阀值' />
                      <Form.Input fluid placeholder='请输入提现共识阀值' />
                      <Form.Input fluid placeholder='请输入佣金' />
                      <Form.Input fluid placeholder='请输入项目描述' />
                      <Button color='orange' fluid size='large'>
                        创建
                      </Button>
                    </Segment>
                  </Form>
                </Grid.Column>
              </Grid>
          </Layout>
        )
  }
}

export default WithdrawIndex;
