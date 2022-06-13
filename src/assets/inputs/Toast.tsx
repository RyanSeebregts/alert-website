import React, {useEffect} from 'react'
import styled from 'styled-components'

import colors from '../../constants/global.constants'

const Container = styled.div`
    position: fixed;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    transition: all 0.3s ease;
`
const ToastContainer = styled.div`
    pointer-events: default;
    border-radius: 10px;
    z-index: 100;
    background: white;
    color: ${colors.textColor};
    padding: 0px 10px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`

interface propTypes {
    message: string
    open: boolean
    close: Function
}

const Toast = (props: propTypes) => {

    useEffect(() => {
        let time:any = null
        if(props.open) {
            setTimeout( () => {
                props.close()
            }, 3000)
        }

        return () => {
            if(time)
                clearTimeout(time)
            time = null
        }
    }, [props.open])
    return (
        <Container
            style={{
                top: props.open ? '10px' : '-30px'
            }}
        >
            
            <ToastContainer
                style={{
                }}
            >
                {
                    props.message
                }
            </ToastContainer>
            
        </Container>
    )
}



export default Toast 