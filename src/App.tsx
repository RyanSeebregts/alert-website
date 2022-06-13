import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged} from 'firebase/auth';

import { Provider } from 'react-redux';
import './App.css'
import Authenticated from './screens/Authenticated';
import AuthenticationContainer from './components/Authentication/AuthenticationContainer';
import { signout, tokenSignIn } from './redux/reducers/authReducer';

import store from './redux/store';
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import firebaseConfig from './constants/firebase.config'

const AppWrapper = () => {

  return (
    <Provider store = { store }>
      <App />
    </Provider>
  )
}

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: black;
`

function App() {
  const dispatch = useAppDispatch();

  initializeApp(firebaseConfig);

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user: any) =>{
      if(user){
        if(!isAuthenticated)
          dispatch(tokenSignIn(user))
      }else{
        dispatch(signout())
      }
  });
  }, [dispatch, isAuthenticated])
  return (
    <Container>
      <Authenticated 
      />
      
      <AuthenticationContainer 
      
      />
    </Container>
  );
}

export default AppWrapper;
