import { Tab } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import CardPagination from '../../components/CardPagination'

const ProjectView = () => (
    <CardPagination></CardPagination>
)

const PollView = () => (
    <CardPagination></CardPagination>
)

const panes = [
    { menuItem: 'Projects', render: () => <Tab.Pane><ProjectView></ProjectView></Tab.Pane> },
  ]

export default function BonkeyFactory(){
    return (
        <Layout>
            <div inverted='true' style={{width:'900px', color:'red', margin: '10px auto', background:'#aee2b1'}}>
                <Tab panes={panes} />
            </div>
        </Layout>
    )
}
