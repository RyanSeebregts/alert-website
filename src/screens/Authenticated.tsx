import React, {useState} from 'react';
import styled from 'styled-components'
import BottomBar from '../components/BottomBar';
import useSocket from '../hooks/useSocket'
import { IoIosCube, IoIosPeople, IoIosPerson } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ScreenSwipeRender from '../components/ScreenSwipeRender';
import Devices from './Devices';
import People from './People';
import Profile from './Profile';
import { useEffect } from 'react';
import { setUserInfo } from '../redux/reducers/authReducer';

const Container = styled.div`
  position: fixed;
  height: 100%;
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  transition: all 0.1s ease;
  overflow: hidden;
`

const Cover = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: black;
  opacity: 0.4;
  top: 0px;
  z-index: 10;
`

const Content = styled.div`
  width: 100%;
  flex: 1;
  flex-grow: 1;
  display: flex;
  flex-direction: column; 
`

interface propTypes {
}
function Authenticated(props: propTypes) {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [selected, setSelected] = useState(1)
  useSocket();

  useEffect(() => {
    if(isAuthenticated)
      dispatch(setUserInfo())
  }, [isAuthenticated])
  return (
      <Container
        style={{
          borderRadius: isAuthenticated ? '0px' : '15px 15px 0px 0px',
          top: isAuthenticated ? '0px' : '10px',
          background: isAuthenticated ? 'white' : 'lightgrey',
          width: isAuthenticated ? '100%' : 'calc(100% - 50px)',
          left: isAuthenticated ? '0px' : '25px',
        }}
      >
        {
          !isAuthenticated &&
            <Cover />
        }

        <Content>
          <ScreenSwipeRender 
            selected={selected}
            screens={[
              <Devices />,
              <People />,
              <Profile />
            ]}
          />
        </Content>

        <BottomBar 
          options={[
            {name: 'devices', icon: IoIosCube},
            {name: 'people', icon: IoIosPeople},
            {name: 'profile', icon: IoIosPerson}
          ]}
          selected={selected}
          setSelected={setSelected}
        />
      
      </Container>
  );
}

export default Authenticated;
