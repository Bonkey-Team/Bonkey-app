import React, { useEffect, useState } from 'react'
import { Icon, Card, Menu, Table } from 'semantic-ui-react'
import { Link } from '../routes'

const CardPagination = (props) => {

  const [ activeItem, setActiveItem ] = useState(1)
  const pageSize = 5
  
  let totalPage = props.totalSize % pageSize === 0 ? props.totalSize / pageSize : props.totalSize / pageSize + 1
  var pages = []
  for (var i = 1; i <= totalPage; i ++ ){
    pages.push(i)
  }


  useEffect(() => {
    props.nextPage(activeItem)
  }, [activeItem])
  
  return (
  <Table>
    <Table.Body>
        { props.data.map((item, key) => (
          <Table.Row key={key}>
            <Link route='/project/index'>
              <Card style={{width:'860px', margin:'5px'}}>
                <Card.Content>
                  <Card.Header>{item.meta}</Card.Header>
                  <Card.Description>
                    <a>View Project</a>
                  </Card.Description>
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
            <Menu.Item as='a' icon >
              <Icon name='chevron left' onClick={() => setActiveItem(activeItem - 1 < 1? 1 : activeItem - 1)}/>
            </Menu.Item>
            {
              pages.map((item) => (
                <Menu.Item key={item} as='a' active={item === activeItem} value='123' onClick={() => setActiveItem(item)}>{item}</Menu.Item>
              ))
            }
            <Menu.Item as='a' icon onClick={() => setActiveItem(activeItem + 1 > totalPage? totalPage : activeItem + 1)}>
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