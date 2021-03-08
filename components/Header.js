import { Router } from 'next/router';
import React from 'react';
import { Segment, Menu, Container, Button } from 'semantic-ui-react';

class CombineSearchBar extends React.Component{
  constructor(props){
    super(props)
    this.state={}
  }

  state = { activeItem: 'cProject' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    if (name == 'cProject') {
      Router.pushRoute("/index")
    }
    if (name == 'deposit') {
      Router.pushRoute("/deposit/index")
    }
    if (name == 'proposal') {
      Router.pushRoute("/proposal/index")
    }
    if (name == 'findProject') {
      Router.pushRoute("/index")
    }
    
  }


  render() {
    const { activeItem } = this.state
    return(
        <Segment
          textAlign='center'
          style={{minHeight: 50, padding: '1em 0em'}}
          vertical
        >
          <Menu fixed='top' inverted pointing secondary size='huge' >
            <Container>
              <Menu.Item
                name='创建项目'
                active={activeItem === 'cProject'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='质押'
                active={activeItem === 'deposit'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='发起提案'
                active={activeItem === 'proposal'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='项目接单'
                active={activeItem === 'findProject'}
                onClick={this.handleItemClick}
              />

              <Menu.Item position='right' >
                <Button as='a' inverted >连接钱包</Button>
              </Menu.Item>
            </Container>
          </Menu>
        </Segment>
      )
    }
  }

export default () => {
  return (
    <CombineSearchBar />
  );
};
