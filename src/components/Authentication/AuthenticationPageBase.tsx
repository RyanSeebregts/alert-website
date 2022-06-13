import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import colors, {globalStyles} from '../../constants/global.constants';

const Container = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    transition: all 0.3s ease;
    overflow-y: auto;
    overflow-x: hidden;
    top: 0px;
`

const HeadingContainer = styled.div`
    height: 70px;
    width: 100%;
    ${globalStyles.mediumHeading}
    display: flex;
    align-items: center;
    justify-content: center;
`

const Content = styled.div`
    width: 100%;
    flex: 1;
`


interface propTypes {
    heading: string
    children: any
    position: string
}
const AuthenticationPageBase = (props: propTypes) => {
    const {position, heading, children} = props
    return (
        <Container
            style={{
                left: position === 'left' ? '-100%' : position === 'center' ? '0%' : '100%'
            }}
        >
            <HeadingContainer>
                {heading}
            </HeadingContainer>
            
            <Content>
                {children}
            </Content>
        </Container>
    )

    
}

export default AuthenticationPageBase