import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import colors, {globalStyles} from '../constants/global.constants';
import ClassicButton from '../assets/buttons/ClassicButton';
import { IoIosMap} from 'react-icons/io';

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const ContentContainer = styled.div`
    width: calc(100% - 10px);
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 15px;
    background: ${colors.darkGrey};
` 

const UserNameContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    ${globalStyles.smallHeading}
    color: white;
`
const InfoContainer = styled.div`
    height: 30px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    ${globalStyles.smallParagraph}
    color: white;
`

const UserDetailsContainer = styled.div`
    margin-left: 10px;
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
`

const TrackButtonContainer = styled.div`
    height: 100%;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`

interface propTypes {
    name: string
    openFind?: Function
}

const UserAlertCard = (props: propTypes) => {
    const { name, openFind } = props

    const openFindHandler = () => {
        if(openFind)
            openFind()
    }
    return (
        <Container>
            <ContentContainer
                onClick={openFindHandler}
            >
                <UserDetailsContainer>
                    <UserNameContainer>
                        {name}
                    </UserNameContainer>

                    <InfoContainer>
                        EMERGENCY
                    </InfoContainer>
                </UserDetailsContainer>

                <TrackButtonContainer>
                    <ClassicButton 
                        title="Find"
                        icon={IoIosMap}
                        color="white"
                        background={colors.green}
                        clicked={() => {}}
                        radius="15px"
                        bold
                    />
                </TrackButtonContainer>
            </ContentContainer>

        </Container>
    )
}

export default UserAlertCard