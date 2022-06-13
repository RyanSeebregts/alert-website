import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import colors, {globalStyles} from '../constants/global.constants';
import {dateCompleteFormat} from '../helper/date'
const Container = styled.div`
    width: 100%;
`

const ContentContainer = styled.div`
    width: 100%;
    cursor: pointer;
    height: 90px;
    display: flex;
    flex-direction: column;
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
const InfoContainer = styled.div`
    width: calc(100% - 30px);
    margin-left: 15px;
    margin-right: 15px;
    height: 30px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    ${globalStyles.smallParagraph}
    color: ${colors.lightgreyText}
`

interface propTypes {
    topBorder?: boolean
    name: string
    lastSeen: Date
    last?: boolean
    openOptions: Function
}

const UserCard = (props: propTypes) => {
    const {topBorder, name, lastSeen, last, openOptions} = props

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

                <InfoContainer>
                    <div>Last contact</div>

                    {
                        dateCompleteFormat(lastSeen)
                    }
                </InfoContainer>
            </ContentContainer>
            {
                !last &&
                    <BottomBorder />
            }
        </Container>
    )
}

export default UserCard