import React from 'react'
import { Icon, Label, Menu, Table, Button } from 'semantic-ui-react'

const TablePagination = () => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>Desc</Table.HeaderCell>
        <Table.HeaderCell>Amount</Table.HeaderCell>
        <Table.HeaderCell>Recipient</Table.HeaderCell>
        <Table.HeaderCell>NW<Icon name='help' color='grey'/></Table.HeaderCell>
        <Table.HeaderCell>WD<Icon name='help' color='grey'/></Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>0</Table.Cell>
        <Table.Cell><a>view</a></Table.Cell>
        <Table.Cell>0.3</Table.Cell>
        <Table.Cell>0xb9BC4131e643c59fde51dA2428b93313cd0aE100</Table.Cell>
        <Table.Cell><a>1</a></Table.Cell>
        <Table.Cell><Button disabled>Finalized</Button></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Label ribbon>1</Label>
        </Table.Cell>
        <Table.Cell><a>view</a></Table.Cell>
        <Table.Cell>0.5</Table.Cell>
        <Table.Cell>0xb9BC4131e643c59fde51dA2428b93313cd0aE100</Table.Cell>
        <Table.Cell><a>1</a></Table.Cell>
        <Table.Cell><Button disabled>Finalized</Button></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>2</Table.Cell>
        <Table.Cell><a>view</a></Table.Cell>
        <Table.Cell>0.2</Table.Cell>
        <Table.Cell>0xb9BC4131e643c59fde51dA2428b93313cd0aE100</Table.Cell>
        <Table.Cell><a>1</a></Table.Cell>
        <Table.Cell><Button disabled>Finalized</Button></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>2</Table.Cell>
        <Table.Cell><a>view</a></Table.Cell>
        <Table.Cell>0.2</Table.Cell>
        <Table.Cell>0xb9BC4131e643c59fde51dA2428b93313cd0aE100</Table.Cell>
        <Table.Cell><a>1</a></Table.Cell>
        <Table.Cell><Button disabled>Finalized</Button></Table.Cell>
      </Table.Row>         
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='6'>
          <label>Found 16 requests</label>
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

export default TablePagination