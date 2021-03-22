import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from 'react'
import { Icon, Label, Menu, Table, Button } from 'semantic-ui-react'
import { getProjectContract } from '../utils/Project'
import { REQUEST_PAGE_SIZE } from '../constants'
import { calculatePagenation } from '../utils/index'

const TablePagination = (props) => {
  
  const [ data, setData ] = useState({
    proposalList:[],
    totalCount:0,
    pageIndexList:[], 
    activeItem:0
  })

  const { library, account } = useWeb3React()

  // only render once when parent rendering
  useEffect(() => {
    const fetchData = async () => {
        const contract = await getProjectContract(library, props.projectAddress, account)
        const totalCount = (await contract._num_proposals()).toString(10)
        const { startIndex, endIndex, pages, activeItem } = calculatePagenation(totalCount, data.activeItem, REQUEST_PAGE_SIZE)

        console.log('begin fetch data, start index : ', startIndex, ', endIndex: ', endIndex)
        let proList = []
        for(var i=startIndex; i<endIndex; i++){
          const proposal = contract._proposals(0)
          proList.push({amount: proposal._proposed_amount, 
                        meta: proposal._proposal_meta,
                        recipient: '0x',
                        nw: 0,
                        status: 0})
        }
        console.log('get result : ', totalCount, ', list: ', proList, ', pages: ', pages)
        setData({totalCount: totalCount, proposalList: proList, pageIndexList: pages, activeItem: activeItem})
    }
    if(props.projectAddress === undefined || props.projectAddress === '0x'){
      console.log('cant get address, exit ', props.projectAddress)
      return
    }
    console.log('get address, continue ', props.projectAddress)
    fetchData()
  }, [props.projectAddress])

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
            <Menu.Item as='a' icon onClick={() => setData({...data, activeItem: data.activeItem - 1})}>
              <Icon name='chevron left' />
            </Menu.Item>
            {data.pageIndexList.map(item => (
              <Menu.Item as='a' key={item} active={data.active === item} onClick={() => setData({...data, activeItem: item})}>{item}</Menu.Item>
            ))}
            <Menu.Item as='a' icon onClick={() => setData({...data, activeItem: data.activeItem + 1})}>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
)}

export default TablePagination