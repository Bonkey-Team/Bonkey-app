import { Tab } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import CardPagination from '../../components/CardPagination'
import { fetchProjectCount, fetchProject, getProjectContract } from '../../utils/Project'
import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from 'react'
import { MAIN_PAGE_SIZE, TRUNCATE_PROJECT_MATE_LEN } from '../../constants'


const PollView = () => (
    <CardPagination></CardPagination>
)

// fetch project 
export default function BonkeyFactory(){

    // data contains result list and totalCount
    const [ data, setData ] = useState({currentIndex: 1})
    
    // let currentIndex = 1
    
    // get project info
    const getProjectInfoByAddress = async ( address ) => {
        return await getProjectContract(library, address)
    }

    // setData({...data, projects: projects})
    // this method return fixed project one by one 
    // reset would be set to state
    const fetchFixedProject = async ( totalCount ) => {
        // const fetchCount = totalCount > maxCount ? maxCount : totalCount
        if(totalCount < 1){
            return
        }
        // calculate start index and end index
        const curIndex = data.currentIndex === undefined ? 1 : data.currentIndex

        const totalPage = totalCount % MAIN_PAGE_SIZE === 0 ? totalCount / MAIN_PAGE_SIZE : totalCount / MAIN_PAGE_SIZE + 1

        const startIndex = curIndex > totalPage ? ( totalPage - 1 ) * MAIN_PAGE_SIZE : ( curIndex - 1 ) * MAIN_PAGE_SIZE 
        const endIndex = startIndex + MAIN_PAGE_SIZE > totalCount ?  totalCount : startIndex + MAIN_PAGE_SIZE
        const projects = []
        for( var i = startIndex; i < endIndex; i ++ ) {
            //init project list and set to data
            let pieceInfo = {}
            try{
                const projectAddress = await fetchProject(library, i)
                pieceInfo = { ...pieceInfo, projectAddress: projectAddress }

                const proj = await getProjectInfoByAddress(projectAddress)
                
                // const manager = await proj._manager()
                // info = { ...info, manager: manager }

                // const sourceToken = await proj._source_token()
                // info = { ...info, sourceToken: sourceToken }

                // const targetToken = await proj._target_token()
                // info = { ...info, targetToken: targetToken }

                // const price = await proj._price()
                // info = { ...info, price: price }

                // const rateProposal = await proj._min_rate_to_pass_proposal()
                // info = { ...info, rateProposal: rateProposal }

                // const rateCommission = await proj._commission_rate()
                // info = { ...info, rateCommission: rateCommission }

                const meta = await proj._project_meta()
                // truncate first 5 word
                if(meta.length>0){
                    const truncateMeta = meta.length > TRUNCATE_PROJECT_MATE_LEN ? `${meta.substring(0, TRUNCATE_PROJECT_MATE_LEN)}...` : meta
                    pieceInfo = { ...pieceInfo, meta: truncateMeta }
                }

                // TODO get info error, why ?
                // const rateRequest = await proj._min_rate_to_pass_request()
                // info = { ...info, rateRequest: rateRequest }

            }catch(error){
                console.log('err: ', error)
            }
            projects.push(pieceInfo)
        }
        setData({projects: projects})
        return projects
    }

    const { library, active } = useWeb3React()

    useEffect(() => {
        if(!active){
            return
        }
        // 获取总数
        try{
            fetchProjectCount(library)
            .then(num => {
                const intNum = parseInt(num)
                fetchFixedProject(intNum)
            })
            .catch(err => {
                console.log('fetch project error : ', err)
            })
        }catch(error){
            console.log("total error: ", error)
        }
    }, [active])
    

    const nextPage = ( pageIndex ) => {
        // currentIndex = pageIndex
        console.log("pageIndex: ", pageIndex)
        setData({...data, currentIndex: pageIndex})
    }

    const ProjectView = () => (
        <CardPagination data={data.projects} totalSize={MAIN_PAGE_SIZE} nextPage={() => nextPage}></CardPagination>
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
