import React from 'react';
import { Grid, Menu, Container, Button, Image } from 'semantic-ui-react';
import { Link } from '../routes'

export default class Header extends React.Component{
  constructor(props){
    super(props)
    this.state={}
  }

  //TODO 如果已经登陆登陆右侧显示账户和余额，否则显示“连接钱包按钮”

  render() {
    const { activeItem } = this.state
    return(        
          <Menu fixed='top' inverted pointing secondary size='huge' style={{height:'90px', paddingBottom:'20px', borderBottom: '1px solid #5f5f5f'}}>
              <Menu.Item style={{marginTop:'0px', marginBottom:'0px'}}>
                <Image style={{marginTop:'0px', marginBottom:'0px'}} src='/images/bonkey_icon.jpg' width='30px' />
              </Menu.Item>

              <Link route='/BonkeyFactory' >
                <Menu.Item
                  name='Home'
                  active={activeItem === 'BonkeyFactory'}
                />
              </Link>
              <Link route='/createProject'>
                <Menu.Item
                  name='Create Project'
                  active={activeItem === 'cProject'}
                />
              </Link>
              <Link route='/project/index'>
                <Menu.Item
                  name='Project Detail'
                  active={activeItem === 'projectIndex'}
                />
              </Link>
              <Link route='/testPage' >
                <Menu.Item
                  name='Test Page'
                  active={activeItem === 'BonkeyFactory'}
                />
              </Link>
              <Link route='/doc' >
                <Menu.Item
                  name='Document'
                  active={activeItem === 'doc'}
                />
              </Link>              
              <Menu.Item position='right'>
                <Button as='a' inverted >Connect Wallet</Button>
              </Menu.Item>            
          </Menu>
      )
    }
  }
