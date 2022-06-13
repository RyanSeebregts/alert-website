import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import colors, {globalStyles} from '../constants/global.constants';
import { IoIosMap} from 'react-icons/io';

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`

const ContentContainer = styled.div`
    width: calc(100% - 10px);
    height: 130px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 15px;
    background: ${colors.greyBackground};
` 


interface propTypes {
}

const DeviceCard = (props: propTypes) => {
    const {  } = props

    return (
        <Container>

            <ContentContainer>
                
            </ContentContainer>

        </Container>
    )
}

export default DeviceCard