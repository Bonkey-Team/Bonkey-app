import { Button } from 'semantic-ui-react'
import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'

export const AuthButon = (props) => {
    const { active } = useWeb3React()

    useEffect(() => {
        if (active) {
            console.log("i am active")
        }else {
            console.log("i am un active")
        }
        return () => {
        }
    }, [active])

    return (
        <Button disabled={!!!active} color='orange' style={props.style} onClick={props.onClick}>{props.children}</Button>
    )
}