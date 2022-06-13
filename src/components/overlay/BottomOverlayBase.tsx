import React, {useEffect, useState} from 'react';
import styled from 'styled-components'

const Container = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    background: white;
    transition: all 0.3s ease;
    box-shadow: 3px 3px 3px grey;
    overflow: hidden;
`

interface propTypes {
    open: boolean
    
    children: any
}

const BottomOverlayBase = (props: propTypes) => {
    const {
        open,
        children
    } = props

    return (
        <Container
            style={{
                borderRadius: '15px 15px 0px 0px',
                top: open ? '25px' : '100%'
            }}
        >
            {
                children
            }

        </Container>
    )
}

export default BottomOverlayBase