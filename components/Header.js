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
                  name='首页'
                  active={activeItem === 'BonkeyFactory'}
                />
              </Link>
              <Link route='/createProject'>
                <Menu.Item
                  name='创建项目'
                  active={activeItem === 'cProject'}
                />
              </Link>
              <Link route='/project/index'>
                <Menu.Item
                  name='项目详情'
                  active={activeItem === 'projectIndex'}
                />
              </Link>
              <Link route='/testPage' >
                <Menu.Item
                  name='测试页'
                  active={activeItem === 'BonkeyFactory'}
                />
              </Link>
              <Link route='/doc' >
                <Menu.Item
                  name='文档'
                  active={activeItem === 'doc'}
                />
              </Link>              
              <Menu.Item position='right'>
                <Button as='a' inverted >连接钱包</Button>
              </Menu.Item>            
          </Menu>
      )
    }
  }
