import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import FullWidthText from '../../assets/inputs/FullWidthText';
import colors, {globalStyles} from '../../constants/global.constants';
import AuthenticationPageBase from './AuthenticationPageBase'

const HelpingTextContainer = styled.div`
    width: calc(100% - 30px);
    margin-left: 15px;
    margin-bottom: 20px;
    text-align: center;
    ${globalStyles.largeParagraph}
`

const SignupText = styled.div`
    width: calc(100% - 15px);
    margin-left: 15px;
    margin-top: 20px;
    text-align: center;
    color: ${colors.blue};
    ${globalStyles.largeParagraph}
`
interface propTypes {
    page: string
    email: string
    setEmail: any
    createUserClick: any
}
const SignInEmail = (props: propTypes) => {
    const {page, email, setEmail, createUserClick} = props
    const open = page === 'signin-email'
    return (
        <AuthenticationPageBase
            heading="Sign in"
            position={open ? 'center' : 'left'}
        >
            <HelpingTextContainer>
                Sign in with your credentials to access your emergency broadcast profile
            </HelpingTextContainer>

            <FullWidthText
                value={email}
                onChange={setEmail}
                heading="Email"
                placeholder='email'
                topBorder
            />

            <SignupText
                onClick={createUserClick}
            >
                Dont have an account yet?
            </SignupText>
           
        </AuthenticationPageBase>
    )

    
}

export default SignInEmail