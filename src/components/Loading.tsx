import React from 'react';
import styled from 'styled-components'
import { ImSpinner2 } from 'react-icons/im';
import { ImCheckmark } from 'react-icons/im';

import colors from '../constants/global.constants';
import './Loading.css'

const Container = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(256,256,256, 0.7);
    z-index: 2;
`
interface propTypes {
    success?: boolean
}
const Loading = (props: propTypes) => {
    return (
        <Container>
            {
                props.success ? 
                    <ImCheckmark
                        color={colors.blue}
                        size={50}
                    />
                    :
                    <ImSpinner2 
                        color={colors.blue}
                        size={50}
                        className="loading"
                    />
            }
            
        </Container>
    ) 
}

export default Loading