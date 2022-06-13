import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import colors, {globalStyles} from '../../constants/global.constants';

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import authReducer, { signIn, signUp, resetPassword, tokenSignIn } from '../../redux/reducers/authReducer';
import BottomOverlayBase from '../overlay/BottomOverlayBase'
import SigninEmail from './SigninEmail';
import SigninPass from './SigninPass';
import Signup from './Signup';
import Loading from '../Loading';

const Content = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    flex-grow: 1;
`

const TopButtonsContainer = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
`

const TopButton = styled.div`
    display: flex;
    flex-grow: 0;
    ${globalStyles.largeParagraph}
    color: ${colors.blue};
    cursor: pointer;
`

const HeadingContainer = styled.div`
    height: 70px;
    width: 100%;
    ${globalStyles.mediumHeading}
    display: flex;
    align-items: center;
    justify-content: center;
`

const today = new Date()
today.setHours(0,0,0,0)
interface propTypes {

}
const AuthenticationContainer = (props: propTypes) => {
    const dispatch = useAppDispatch();

    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    
    const loginError = useAppSelector((state) => state.auth.loginError);
    const registerError = useAppSelector((state) => state.auth.registerError);

    const loginLoading = useAppSelector((state) => state.auth.loginLoading);

    const registerSuccess = useAppSelector((state) => state.auth.registerSuccess)
    const resetSuccess = useAppSelector((state) => state.auth.resetSuccess)

    const [page, setPage] = useState('signin-email')

    const [signinEmail, setSigninEmail] = useState('')
    const [signinPassword, setSigninPassword] = useState('')

    const [regName, setRegName] = useState('')
    const [regEmail, setRegEmail] = useState('')
    const [regPassword, setRegPassword] = useState('')
    const [regConfirmPassword, setRegConfirmPassword] = useState('')
    const [regDob, setRegDob] = useState(today)

    const getClick = (left: boolean) => {
        if(left) {
            if(page === 'signin-pass') {
                setPage('signin-email')
                return
            }
            if(page === 'signup') {
                setPage('signin-email')
                return
            }
        }

        else {
            if(page === 'signin-email') {
                setPage('signin-pass')
                return
            }
            if(page === 'signin-pass') {
                signInHandler()
                return
            }
            if(page === 'signup') {
                signUpHandler()
                return
            }
        }
    }

    const getLeft = () => {
        let text = ""
        let disabled = false
        if(page === 'signin-email') {
            text = ''
            disabled = true
        }
        if(page === 'signin-pass') {
            text = 'Cancel'
            disabled = false
        }
        if(page === 'signup') {
            text = 'Cancel'
            disabled = false
        }

        if(loginLoading)
            disabled = true
        return (
            <TopButton
                style={{
                    marginLeft: '10px',
                    cursor: disabled ? 'default' : 'cursor',
                    color: disabled ? colors.lightgrey : colors.blue
                }}
                onClick={disabled ? () => {} : () => getClick(true)}
            >
                {text}
            </TopButton>
        )
    }
    const getRight = () => {
        let text = ""
        let disabled = false
        if(page === 'signin-email') {
            text = 'Next'

            if(signinEmail.trim() === '')
                disabled = true
        }        
        if(page === 'signin-pass') {
            text = 'Sign in'

            if(signinPassword.trim() === '')
                disabled = true
        }

        if(page === 'signup') {
            text = 'Sign up'
            if(
                regName.trim() === '' ||
                regEmail.trim() === '' ||
                regPassword.trim() === '' ||
                regConfirmPassword.trim() === '' ||
                regDob.getTime() === today.getTime()
            )
                disabled = true
        }

        if(loginLoading)
            disabled = true
        return (
            <TopButton
                style={{
                    marginRight: '10px',
                    cursor: disabled ? 'default' : 'cursor',
                    color: disabled ? colors.lightgrey : colors.blue
                }}
                onClick={disabled ? () => {} : () => getClick(false)}
            >
                {text}
            </TopButton>
        )
    }

    const createUserClick = () => {
        setPage('signup')
    }

    const signInHandler = () => {
        dispatch(signIn({email: signinEmail, password: signinPassword}))
    }

    const signUpHandler = () => {
        dispatch(
            signUp({
                fullName: regName, 
                email: regEmail, 
                password: regPassword, 
                confirmPassword: regConfirmPassword,
                dateOfBirth: regDob
            })
        )
    }



    useEffect(() => {
        console.log(page)
        console.log(registerSuccess)
        if(registerSuccess && page === 'signup') {
            setPage('signin-email')
            setTimeout(() => dispatch(authReducer.actions.setRegisterSuccess(false)), 1000)
        }
    }, [registerSuccess, page, dispatch])

    return (
        <BottomOverlayBase
            open={!isAuthenticated}
        >
            <TopButtonsContainer>
                {
                    getLeft()
                }
                {
                    getRight()
                }
            </TopButtonsContainer>
            <Content>
                <SigninEmail
                    page={page}
                    email={signinEmail}
                    setEmail={setSigninEmail}
                    createUserClick={createUserClick}
                />

                <SigninPass
                    page={page}
                    password={signinPassword}
                    setPassword={setSigninPassword}
                />

                <Signup
                    page={page}
                    email={regEmail}
                    fullName={regName}
                    password={regPassword}
                    confirmPassword={regConfirmPassword}
                    dateOfBirth={regDob}

                    setEmail={setRegEmail}
                    setFullName={setRegName}
                    setPassword={setRegPassword}
                    setConfirmPassword={setRegConfirmPassword}
                    setDateOfBirth={setRegDob}
                />
                {
                    (loginLoading || registerSuccess) &&
                        <Loading 
                            success={registerSuccess}
                        />
                }
                
            </Content>


        </BottomOverlayBase>
    )

    
}

export default AuthenticationContainer