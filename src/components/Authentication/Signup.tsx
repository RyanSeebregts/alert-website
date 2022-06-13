import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import colors, {globalStyles} from '../../constants/global.constants';
import AuthenticationPageBase from './AuthenticationPageBase'
import FullWidthText from '../../assets/inputs/FullWidthText';
import FullWidthDate from '../../assets/inputs/FullWidthDate'

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
    password: string
    confirmPassword: string
    fullName: string
    dateOfBirth: Date

    setEmail: any
    setPassword: any
    setConfirmPassword: any
    setFullName: any
    setDateOfBirth: any
}
const Signup = (props: propTypes) => {
    const {
        page, 
        email, 
        fullName,
        password,
        confirmPassword,
        dateOfBirth,

        setEmail,
        setFullName,
        setPassword,
        setConfirmPassword,
        setDateOfBirth
    } = props
    const open = page === 'signup'
    return (
        <AuthenticationPageBase
            heading="Sign up"
            position={open ? 'center' : 'right'}
        >
            <HelpingTextContainer>
                Create an account to begin using the emergency broadcast service
            </HelpingTextContainer>

            <FullWidthText
                value={fullName}
                onChange={setFullName}
                heading="Full name"
                placeholder='full name'
                topBorder
            />

            <FullWidthText 
                value={email}
                onChange={setEmail}
                heading="Email"
                placeholder='email'
            />

            <FullWidthText 
                type="password"
                value={password}
                onChange={setPassword}
                heading="Password"
                placeholder='password'
            />

            <FullWidthText 
                type="password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                heading="Confirm"
                placeholder='confirm password'
            /> 
            <FullWidthDate
                value={dateOfBirth}
                onChange={setDateOfBirth}
                heading="Date of Birth"
                placeholder='date of birth'
            />  
           
        </AuthenticationPageBase>
    )

    
}

export default Signup