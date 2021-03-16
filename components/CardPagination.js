import React from 'react'
import { Icon, Card, Menu, Table } from 'semantic-ui-react'
import { Link } from '../routes'

const CardPagination = () => (
  <Table>
    <Table.Body>
      <Table.Row>
        {/* <Table.Cell> */}
        <Link route='/project/index'>
          <Card style={{width:'860px', margin:'5px'}}>
            <Card.Content>
              <Card.Header>Matthew Harris</Card.Header>
              <Card.Meta>Co-Worker</Card.Meta>
              <Card.Description>
                Matthew is a pianist living in Nashville.
              </Card.Description>
            </Card.Content>
          </Card>
          </Link>
        {/* </Table.Cell> */}
      </Table.Row>
      <Table.Row>
        {/* <Table.Cell> */}
        <Link route='/project/index'>
          <Card style={{width:'860px', margin:'5px'}}>
            <Card.Content>
              <Card.Header>Matthew Harris</Card.Header>
              <Card.Meta>Co-Worker</Card.Meta>
              <Card.Description>
                Matthew is a pianist living in Nashville.
              </Card.Description>
            </Card.Content>
          </Card>
          </Link>
        {/* </Table.Cell> */}
      </Table.Row>
      <Table.Row>
        {/* <Table.Cell> */}
        <Link route='/project/index'>
         <Card style={{width:'860px', margin:'5px'}}>
            <Card.Content>
              <Card.Header>Matthew Harris</Card.Header>
              <Card.Meta>Co-Worker</Card.Meta>
              <Card.Description>
                Matthew is a pianist living in Nashville.
              </Card.Description>
            </Card.Content>
          </Card>
          </Link>
        {/* </Table.Cell> */}
      </Table.Row>
      <Table.Row>
        {/* <Table.Cell> */}
        <Link route='/project/index'>
          <Card style={{width:'860px', margin:'5px'}}>
            <Card.Content>
              <Card.Header>Matthew Harris</Card.Header>
              <Card.Meta>Co-Worker</Card.Meta>
              <Card.Description>
                Matthew is a pianist living in Nashville.
              </Card.Description>
            </Card.Content>
          </Card>
        </Link>
        {/* </Table.Cell> */}
      </Table.Row>         
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='1'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a'>3</Menu.Item>
            <Menu.Item as='a'>4</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
)

export default CardPagination