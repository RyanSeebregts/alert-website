import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import colors, {globalStyles} from '../constants/global.constants';
import {dateCompleteFormat} from '../helper/date'
const Container = styled.div`
    width: 100%;
`

const ContentContainer = styled.div`
    flex: 1;
    flex-grow: 1;
    cursor: pointer;
    height: 90px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: transparent;
    &:hover {
        background: #eeeeee;
    }
` 

const BottomBorder = styled.div`
    width: calc(100% - 15px);
    height: 1px;
    background: ${colors.lightgrey};
    margin-left: 15px;
`

const UserNameContainer = styled.div`
    width: calc(100% - 30px);
    margin-left: 15px;
    margin-right: 15px;
    flex: 1;
    display: flex;
    align-items: center;
    ${globalStyles.smallHeading}
`
const StatusContainer = styled.div`
    margin-left: 15px;
    margin-right: 15px;
    height: 100%;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    ${globalStyles.smallParagraph}
    color: ${colors.lightgreyText}
`

interface propTypes {
    topBorder?: boolean
    name: string
    last?: boolean
    openOptions: Function
    requestSent: boolean
    requestReceived: boolean
    friend: boolean
}

const UserSearchCard = (props: propTypes) => {
    const {topBorder, name, last, openOptions, requestSent, requestReceived, friend} = props

    const clickHandler = (e: any) => {
        openOptions()
    }
    return (
        <Container>
            {
                topBorder &&
                    <BottomBorder />
            }
            <ContentContainer
                onClick={clickHandler}
            >
                <UserNameContainer>
                    {name}
                </UserNameContainer>

                <StatusContainer>
                    {
                        requestSent ? 'request sent'
                        :
                        requestReceived ? 'accept request'
                        :
                        friend ? 'friend'
                        :
                        'send request'
                    }
                </StatusContainer>

            </ContentContainer>
            {
                !last &&
                    <BottomBorder />
            }
        </Container>
    )
}

export default UserSearchCard