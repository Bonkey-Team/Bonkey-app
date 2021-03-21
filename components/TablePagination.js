import React, { useEffect, useState } from 'react'
import { Icon, Label, Menu, Table, Button } from 'semantic-ui-react'

const TablePagination = (props) => {
  
  const [ data, setData ] = useState({
    proposalList:[],
    totalCount:0,
    pageIndexList:[], 
    activeItem:0
  })

  useEffect(() => {
    console.log("i will get contract, projectAddress is : ", props.projectAddress)

  }, [props])

  return (
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
      {data.proposalList.length < 1 ? (
        <Table.Row>
          <Table.Cell colSpan='6'>
            <div style={{width:'100%', textAlign:'center'}}>No Proposal</div>
          </Table.Cell>
        </Table.Row>
      ) : data.proposalList.map((item, index) => {
        return (
        <Table.Row key={index}>
          <Table.Cell>{index}</Table.Cell>
          <Table.Cell><a>view</a></Table.Cell>
          <Table.Cell>{item.amount}</Table.Cell>
          <Table.Cell>{item.recipient}</Table.Cell>
          <Table.Cell><a>{item.nw}</a></Table.Cell>
          <Table.Cell><Button color='orange' disabled={item.status === 2}>{item.status === 0 ? 'Request Money': item.status === 1 ? 'Approve' : 'Finalized'}</Button></Table.Cell>
        </Table.Row>
        )
      })}   
    </Table.Body> 

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='6'>
          <label>Found {data.totalCount} requests</label>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon onClick={() => setData({activeItem: activeItem - 1 < 1? 1 : activeItem - 1})}>
              <Icon name='chevron left' />
            </Menu.Item>
            {data.pageIndexList.map(item => (
              <Menu.Item as='a' key={item}>{item}</Menu.Item>
            ))}
            <Menu.Item as='a' icon onClick={() => setData({activeItem: activeItem + 1 > totalPage? totalPage : activeItem + 1})}>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
)}

export default TablePagination