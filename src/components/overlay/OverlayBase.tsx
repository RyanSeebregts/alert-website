import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import colors from '../../constants/global.constants';

import { MdCheck, MdClose } from 'react-icons/md';
import { TailSpin } from 'react-loader-spinner';

const headingHeight = 80

const Container = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    &:before {
        position: absolute;
        content: " ";
        height: 100%;
        top: 0;
        left: 0;
        width: 100%;
        background: black;
        opacity: 0.7;
        z-index: -1;

    }
`

const Card = styled.div`
    position: relative;
    max-width: 100%;
    border-radius: 25px;
    background: white;
    min-width: 300px;
    overflow: hidden;
    flex-shrink: 0;
`

const HeadingContainer = styled.div`
    width: 100%;
    height: ${headingHeight}px;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
`

const HeadingText = styled.div`
    flex-grow: 1;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: ${colors.textColor};
`

const HeadingButtons = styled.div`
    display: flex;
    height: 100%;
    width: 80px;
    align-items: center;
    justify-content: center;
    color: ${colors.textColor};
`

const ContentContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-grow: 0;
    overflow: hidden;
    overflow-y: auto;
    flex-shrink: 0;
`

const LoadingCover = styled.div`
    position: absolute;
    top: 0px;
    height: 100%;
    width: 100%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;

    &:before {
        position: absolute;
        content: " ";
        height: 100%;
        top: 0;
        left: 0;
        width: 100%;
        background: black;
        opacity: 0.7;
        z-index: -1;
    }
`

const SuccessCover = styled.div`
    position: absolute;
    top: 0px;
    height: 100%;
    width: 100%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
`
interface propTypes {
    children?: any
    heading: string
    loading?: boolean
    success?: boolean
    close?: Function
}

const windowHeightInitial = window.innerHeight;

const OverlayBase = (props: propTypes) => {
    const [height, setHeight] = useState(windowHeightInitial)

    const closeHandler = (e:any) => {
        if(props.close)
            props.close()
    }  
    
    useEffect(() => {
        window.addEventListener('resize', adjustHeight);
    }, [])

    const adjustHeight = (e:any) => {
        setHeight(window.innerHeight)
    }
    return (
        <Container
        >
            <Card>
                <HeadingContainer>
                    <HeadingButtons></HeadingButtons>
                    <HeadingText>{props.heading}</HeadingText>
                    <HeadingButtons
                        style={{
                            cursor: props.close ? 'pointer' : 'default'
                        }}
                        onClick={closeHandler}
                    >
                        {
                            props.close &&
                                <MdClose />
                        }
                    </HeadingButtons>
                </HeadingContainer>

                <ContentContainer
                    style={{
                        maxHeight: `${height - headingHeight - 20}px`
                    }}
                >
                    {
                        props.children
                    }
                    <div style={{height: '20px', flexShrink: 0}} />
                </ContentContainer>

                
                {
                    props.loading &&
                        <LoadingCover 
                        
                        >
                            <TailSpin ariaLabel="loading-indicator" />
                        </LoadingCover>

                }

                {
                    props.success &&
                        <SuccessCover 
                        
                        >
                            <MdCheck size={50} color="blue" />
                        </SuccessCover>
                }
            </Card>
        </Container>
    )
}

export default OverlayBase