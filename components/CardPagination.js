import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from 'react'
import { Icon, Card, Menu, Table } from 'semantic-ui-react'
import { Link } from '../routes'
import { calculatePagenation } from '../utils/index'
import { REQUEST_PAGE_SIZE } from '../constants/index'
import { fetchProjectCount, fetchProject, getProjectInfo } from '../utils/Project'

const CardPagination = () => {

  const [ activeItem, setActiveItem ] = useState(0)
  const [ projs, setProjs ] = useState([])
  const [ pages, setPages ] = useState([])
  const { library, active } = useWeb3React()

  useEffect(() => {
    const fetchData = async () => {
      try{
          // totalCount
          const totalCount = await fetchProjectCount(library);
          const { startIndex, endIndex, pages, activeItem1 } = calculatePagenation(totalCount.toString(10), activeItem, REQUEST_PAGE_SIZE)

          // fetch 
          let projList = []
          for(var i = startIndex; i < endIndex; i  ++){
            const address = await fetchProject(library, i)
            const info = await getProjectInfo(library, address)
            projList.push({projectAddress: info.address, title: info.title})
          }
          
          setProjs(projList)
          setPages(pages)
          setActiveItem(activeItem1)
      }catch (err ){
        console.log('occured error : ', err)
      }
     
    }
    
    if(active){
      fetchData()
    }
    
  }, [active, activeItem])
  
  if(projs.length === 0){
    return (
      <Table>
      <Table.Body>
        <Table.Row style={{textAlign:'center', height:'100px', fontSize:'14px'}}><p style={{background: 'white', color: 'black'}}>Not Connect Wallet</p></Table.Row>
      </Table.Body>
      <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='1'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon >
              <Icon name='chevron left'/>
            </Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
      </Table.Footer>
      </Table>
    )
  }

  return (
  <Table>
    <Table.Body>
        { projs.map((item, key) => (
          <Table.Row key={key}>
            <Link route={`/project/${item.projectAddress}`}>
              <Card style={{width:'860px', margin:'5px'}}>
                <Card.Content>
                  <Card.Header>{item.title}</Card.Header>
                  <Card.Description><a href="#">ViewProject</a></Card.Description>
                </Card.Content>
              </Card>
            </Link>
          </Table.Row>
        ))}         
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='1'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon onClick={() => setActiveItem(activeItem - 1)}>
              <Icon name='chevron left'/>
            </Menu.Item>
            {
              pages.map((item) => (
                <Menu.Item key={item} as='a' active={item === activeItem} value={item} onClick={() => setActiveItem(item)}>{item}</Menu.Item>
              ))
            }
            <Menu.Item as='a' icon onClick={() => setActiveItem(activeItem + 1)}>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
)
}

export default CardPagination