import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import OverlayBase from '../components/overlay/OverlayBase';
import TextInput from '../assets/inputs/TextInput';
import DateInput from '../assets/inputs/DateInput';
import InputErrorMessage from '../assets/inputs/InputErrorMessage';
import ClassicButton from '../assets/buttons/ClassicButton';
import colors from '../constants/global.constants';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import authReducer, { signIn, signUp, resetPassword } from '../redux/reducers/authReducer';

import Toast from '../assets/inputs/Toast'

const Container = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease;
    box-shadow: 3px 3px 3px grey;
`

const Heading = styled.div`
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    font-weight: bold;
`

const Content = styled.div`
    width: 200px;
    display: flex;
    flex-grow: 0;
    flex-direction: column;
    align-items: center;
`

const RegisterContent = styled.div`
    width: 200px;
    display: flex;
    flex-grow: 0;
    flex-direction: column;
    align-items: center;
`

const SubText = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    cursor: default;
`

interface propTypes {

}

const Login = (props: propTypes) => {
    //redux things
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    const loginError = useAppSelector((state) => state.auth.loginError);
    const registerError = useAppSelector((state) => state.auth.registerError);

    const loginLoading = useAppSelector((state) => state.auth.loginLoading);

    const registerSuccess = useAppSelector((state) => state.auth.registerSuccess)
    const resetSuccess = useAppSelector((state) => state.auth.resetSuccess)

    const resetPasswordOpen = useAppSelector((state) => state.auth.resetPasswordOpen);

    const [registerOpen, setRegisterOpen] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [regName, setRegName] = useState('')
    const [regEmail, setRegEmail] = useState('')
    const [regPassword, setRegPassword] = useState('')
    const [regConfirmPassword, setRegConfirmPassword] = useState('')
    const [dob, setDob] = useState(new Date())
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    const signInHandler = () => {
        console.log('why tho')
        dispatch(signIn({email: email, password: password}))
    }

    const signUpHandler = () => {
        dispatch(
            signUp({
                fullName: regName, 
                email: regEmail, 
                password: regPassword, 
                confirmPassword: regConfirmPassword,
                dateOfBirth: dob
            })
        )

    }

    useEffect(() => {
        let time:any = null

        if(registerSuccess) {
            setToastMessage('succesfully signed up')
            setToastOpen(true)
            setRegisterOpen(false)
            setTimeout( () => {
                dispatch(authReducer.actions.setRegisterSuccess(false))
            }, 3000)
        }

        return () => {
            if(time)
                clearTimeout(time)
            time = null
        }
    }, [registerSuccess])

    return (
        <Container
            style={{
                borderRadius: '15px 15px 0px 0px',
                top: isAuthenticated ? '100%' : '25px'
            }}
        >
            {
                registerOpen ?

                    <RegisterContent>
                        <Heading>
                            Sign up
                        </Heading>
                        <TextInput 
                            value={regName}
                            onChange={setRegName}
                            placeholder="full name"
                            width={'100%'}
                            heading={"Full Name"}
                        />

                        <InputErrorMessage 
                            error={registerError} 
                            errors={[
                                {code: 'name-empty', message: 'please enter your business name'}
                            ]}
                        />  

                        <TextInput 
                            value={regEmail}
                            onChange={setRegEmail}
                            placeholder="email"
                            width={'100%'}
                            heading={"Email"}
                        />

                        <InputErrorMessage 
                            error={registerError} 
                            errors={[
                                {code: 'auth/invalid-email', message: 'please enter a valid email'},
                                {code: 'email-empty', message: 'please enter a valid email'},
                                {code: 'auth/email-already-in-use', message: 'email already in use'}
                            ]}
                        />  

                        <TextInput 
                            value={regPassword}
                            onChange={setRegPassword}
                            placeholder="password"
                            width={'100%'}
                            type="password"
                            heading={"Password"}
                        />

                        <InputErrorMessage 
                            error={registerError} 
                            errors={[
                                {code: 'password-empty', message: 'please enter a valid password'},
                                {code: 'auth/weak-password', message: 'please enter a stronger password'}
                            ]}
                        />

                        <TextInput 
                            value={regConfirmPassword}
                            onChange={setRegConfirmPassword}
                            placeholder="confirm password"
                            width={'100%'}
                            type="password"
                            heading={"Confirm Password"}
                        />

                        <InputErrorMessage 
                            error={registerError} 
                            errors={[
                                {code: 'confirm-password', message: 'please confirm your password'}
                            ]}
                        />

                        <DateInput 
                            value={dob}
                            onChange={setDob}
                            width="100%"
                            heading={"Date of Birth"}
                        />

                        <InputErrorMessage 
                            error={registerError} 
                            errors={[
                                {code: 'dob-empty', message: 'please enter your date of birth'},
                                {code: 'too-young', message: 'you must be 13 years or older to use this service'},
                                {code: 'auth/email-already-exists', message: 'email already in use'},
                                {code: 'auth/invalid-password', message: 'password not secure'}
                            ]}
                        />
                        <ClassicButton
                            title="sign up"
                            clicked={signUpHandler}
                        />

                        <SubText>
                            Already have an account?
                        </SubText>

                        <ClassicButton
                            title="sign in"
                            clicked={() => setRegisterOpen(false)}
                            bold={true}
                            background={'transparent'}
                            color={colors.textColor}
                        />
                    </RegisterContent>

                    :
                    <Content>
                        <Heading>
                            Sign in
                        </Heading>
                        <TextInput 
                            value={email}
                            onChange={setEmail}
                            placeholder="email"
                            width={'100%'}
                        />

                        <div style={{height: '20px',}} />

                        <TextInput 
                            value={password}
                            onChange={setPassword}
                            placeholder="password"
                            width={'100%'}
                            type="password"
                        />

                        <InputErrorMessage 
                            error={loginError} 
                            errors={[
                                {code: 'empty', message: 'please enter email and password'},
                                {code: 'auth/invalid-email', message: 'email or password incorrect'},
                                {code: 'auth/wrong-password', message: 'email or password incorrect'}
                            ]}
                        />
                        <ClassicButton
                            title="sign in"
                            clicked={signInHandler}
                        />

                        <SubText>
                            Don't have an account yet?
                        </SubText>

                        <ClassicButton
                            title="sign up"
                            clicked={() => setRegisterOpen(true)}
                            bold={true}
                            background={'transparent'}
                            color={colors.textColor}
                        />
                    </Content>
            }

            <Toast
                open={toastOpen}
                close={() => setToastOpen(false)}
                message={toastMessage}
            />

        </Container>
    )
}

export default Login