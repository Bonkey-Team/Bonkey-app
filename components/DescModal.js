import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'semantic-ui-react'

export function DescModal(props) {
    const [ open, setOpen ] = useState()

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={<a href="#">View</a>}
        >
            <Modal.Content>
                {props.content}
            </Modal.Content>

            <Modal.Actions>
                <Button
                    color='orange'
                    content='Okay!'
                    labelPosition='right'
                    onClick={() => setOpen(false)}
                    positive
                ></Button>
            </Modal.Actions>
        </Modal>
    )
}