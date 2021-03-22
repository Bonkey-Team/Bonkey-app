import React from 'react'
import { Tab } from 'semantic-ui-react'
import CardPagination from '../components/CardPagination'

// fetch project 
export default function BonkeyFactory(){

    const ProjectView = () => (
        <CardPagination></CardPagination>
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
