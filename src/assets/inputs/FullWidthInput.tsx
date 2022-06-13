import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import colors, {globalStyles} from '../../constants/global.constants';

const Container = styled.div`
    width: 100%;
`

const ContentContainer = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
` 

const HeadingContainer = styled.div`
    margin-left: 15px;
    margin-right: 5px;
    ${globalStyles.largeParagraph}

`

const InputContainer = styled.div`
    height: 100%;
    flex: 1;
    flex-grow: 1;
    display: flex;
`
const BottomBorder = styled.div`
    width: calc(100% - 15px);
    height: 1px;
    background: ${colors.lightgrey};
    margin-left: 15px;
`

interface propTypes {
    children: any
    heading?: string
    topBorder?: boolean
}

const FullWidthInput = (props: propTypes) => {
    const {topBorder, children} = props

    return (
        <Container>
            {
                topBorder &&
                    <BottomBorder />
            }
            <ContentContainer>
                <HeadingContainer>
                    {`${props.heading}:`}
                </HeadingContainer>
                <InputContainer>
                    {
                        children
                    }
                </InputContainer>
            </ContentContainer>
            <BottomBorder />
        </Container>
    )
}

export default FullWidthInput