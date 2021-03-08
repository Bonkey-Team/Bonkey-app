import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import { Link, Router } from '../../routes';
import Layout from '../../components/Layout';

const InputRow = (props) => (
  <div style={{marginBottom: '10px'}}>
    <label><b>{props.children}</b></label>
    <Input
      label = {props.label}
      labelPosition="right"
      value = {props.value}
      onChange={event => props.handleInput(event.target.value)}
    />
  </div>
)

class WithDraw extends Component {
  state = {
    description: '',
    recipient: '',
    loading: false,
    errorMessage: ''
  };

  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }

  onSubmit = async event => {
    event.preventDefault();
    console.log(this.state)
    const campaign = Campaign(this.props.address);
    const { description, recipient } = this.state;

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: accounts[0] });

      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Proof of work</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>            
            <InputRow value={this.state.description} label='description'
                      handleInput={(description) => this.setState({description: description})}></InputRow>
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default WithDraw;
