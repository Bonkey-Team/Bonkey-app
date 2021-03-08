import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class InputRow extends Component {
  constructor(props){
    super(props)
  }

  render(){
    console.log(this.props)
    return(
      <div style={{marginBottom: '10px'}}>
      <label><b>{this.props.children}</b></label>
      <Input
        label = {this.props.label}
        labelPosition="right"
        value = {this.props.value1}
        onChange={event => this.props.handleInput(event.target.value)}
      />
    </div>
    )
  }
}

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createProject(this.state.minimumContribution, 'fefe', 100)
        .send({
          from: accounts[0]
        });

      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Project</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <InputRow value={this.state.minimumContribution} label='wei' 
              handleInput={(minimumContribution) => this.setState({minimumContribution: minimumContribution})}>Minimum Contribution</InputRow>
            <InputRow value={this.state.description} label='limit 500 words'
              handleInput={(description) => this.setState({description: description})}>Project Description</InputRow>
            <InputRow value={this.state.pollThreshold} label='0 to 1'
              handleInput={(thr) => this.setState({pollThreshold: thr})}>Poll threshold</InputRow>
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button type="submit" loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
