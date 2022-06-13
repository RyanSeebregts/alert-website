import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import colors, {globalStyles} from '../../constants/global.constants';
import AuthenticationPageBase from './AuthenticationPageBase'
import FullWidthText from '../../assets/inputs/FullWidthText'
import InputErrorMessage from '../../assets/inputs/InputErrorMessage';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

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
    password: string
    setPassword: any
}
const SignInPass = (props: propTypes) => {
    const {page, password, setPassword} = props
    const open = page === 'signin-pass'
    const loginError = useAppSelector((state) => state.auth.loginError);

    return (
        <AuthenticationPageBase
            heading="Password"
            position={open ? 'center' : 'right'}
        >
            <HelpingTextContainer>
                Please enter your password needed to access your account
            </HelpingTextContainer>
            <FullWidthText 
                value={password}
                onChange={setPassword}
                heading="Password"
                placeholder='password'
                topBorder
                type={'password'}
            />
            <InputErrorMessage
                error={loginError} 
                errors={[
                    {code: 'empty', message: 'please enter email and password'},
                    {code: 'auth/invalid-email', message: 'email or password incorrect'},
                    {code: 'auth/wrong-password', message: 'email or password incorrect'}
                ]}
            />
            <SignupText>
                Forgot your password?
            </SignupText>
        </AuthenticationPageBase>
    )

    
}

export default SignInPass