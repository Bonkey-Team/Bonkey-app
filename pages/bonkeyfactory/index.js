import { Tab } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import CardPagination from '../../components/CardPagination'
import { fetchProjectCount } from '../../utils/domain/project'
import { useWeb3React } from '@web3-react/core'
import React, { useEffect } from 'react'


const PollView = () => (
    <CardPagination></CardPagination>
)

export default function BonkeyFactory(){
    
    let data = [{
        address: 'projectAddress',
        meta: 'dddfef'
    },
    {
        address: 'projectAddress',
        meta: 'dddfef'
    },
    {
        address: 'projectAddress',
        meta: 'dddfef'
    }]

    const { library, active } = useWeb3React()
    useEffect(() => {
        if(active){
            fetchProjectCount(library).then(n => console.log('get total count : ', b.toString(10))).catch(err => console.log('get length error, ', err))
        }
    }, [active, data])
    

    const nextPage = (pageIndex) => {
        console.log('i will render next page: ', pageIndex)
        data = []
        data.push({
            address: '11',
            meta: '11'
        })
    }

    const ProjectView = () => (
        <CardPagination data={data} totalSize={10} nextPage={nextPage}></CardPagination>
    )

    const panes = [
        { menuItem: 'Projects', render: () => <Tab.Pane><ProjectView></ProjectView></Tab.Pane> },
      ]

    return (
        <>
            <div inverted='true' style={{width:'900px', color:'red', margin: '10px auto', background:'#aee2b1'}}>
                <Tab panes={panes} />
            </div>
        </>
    )
}
