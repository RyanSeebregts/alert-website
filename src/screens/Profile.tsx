import React, {useState} from 'react';
import styled from 'styled-components'
import BigButton from '../assets/buttons/BigButton';
import UserSearchCard from '../components/UserSearchCard';
import colors, { globalStyles } from '../constants/global.constants';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signout } from '../redux/reducers/authReducer';
import {sendFriendRequest, deleteFriendRequest, acceptFriendRequest, deleteFriend} from '../api/Users'
import BottomMenu from '../components/BottomMenu';

import {sendAlert, disableAlert} from '../api/Users'
const Container = styled.div`
  height: 100%;
  width: 100%;
  background: white;
`

const HeadingContainer = styled.div`
  height: 80px;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const HeadingDivider = styled.div`
  width: 100%;
  height: 1px;
  background: ${colors.lightgrey};
  transition: all 0.1s ease;
`

const Content = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`

const NameContainer = styled.div`
  width: 100%;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 5px;
  font-size: 40px;
  font-weight: bold;
`

const AlertTextContainer = styled.div`
  width: 100%;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 5px;
  font-size: 30px;
  font-weight: bold;
  color: ${colors.red}
`

const UserAlertContainer = styled.div`
  width: calc(100% - 30px);
  margin-top: 10px;
  padding-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SignoutContainer = styled.div`
  width: calc(100% - 30px);
  margin-top: 10px;

  padding-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const UserCardsContainer = styled.div`
  width: 100%;
`

const UserCardsHeading = styled.div`
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 5px;
  margin-top: 5px;
  ${globalStyles.smallParagraph}
  color: ${colors.lightgreyText}
`

const Heading = styled.div`
  ${globalStyles.mediumHeading}
`

interface propTypes {
}
function Profile(props: propTypes) {
  const dispatch = useAppDispatch();
  const [scrollAmount, setScrollAmount] = useState(0)
  const [friendOptionOpen, setFriendOptionOpen] = useState<any>(-1)
  const [menuButtons, setMenuButtons] = useState<any[]>([])

  const name = useAppSelector((state) => state.auth.name);
  const currentStatus = useAppSelector((state) => state.auth.currentStatus);

  const friendRequestsSent = useAppSelector((state) => state.auth.friendRequestsSent);
  const friendRequestsReceived = useAppSelector((state) => state.auth.friendRequestsReceived);
  const friends = useAppSelector((state) => state.auth.friends);

  const signoutHandler = () => {
    dispatch(signout())
  }
  const contentScrollHandler = (e:any) => {
    setScrollAmount(e.target.scrollTop)
  }

  const sendUserRequest = (id: any) => {
    sendFriendRequest(id)
    setFriendOptionOpen(-1)
}

const deleteUserRequest = (id: any) => {
    friendRequestsReceived.forEach((prop: any) => {
        if(prop.userId === id)
            deleteFriendRequest(prop.requestId)
    })
    friendRequestsSent.forEach((prop: any) => {
        if(prop.userId === id)
            deleteFriendRequest(prop.requestId)
    })
    setFriendOptionOpen(-1)
}

const deleteFriendHandler = (id: any) => {
    
    friends.forEach((prop: any) => {
        if(prop.userId === id)
            deleteFriend(prop.friendId)
    })
    setFriendOptionOpen(-1)
}

const addFriend = (id: any) => {
    friendRequestsReceived.forEach((prop: any) => {
        if(prop.userId === id)
            acceptFriendRequest(prop.requestId)
    })
    setFriendOptionOpen(-1)
}

  interface friendsMenuOpenProps {
    id:any 
    sent: boolean
    received: boolean
    friend: boolean
  }

  const handleFriendsMenuOpen = (menuProps: friendsMenuOpenProps) => {
    console.log(menuProps.id)
    let btn = {name: 'Send Request', click: () => sendUserRequest(menuProps.id)}
    if(menuProps.sent) {
        btn = {name: 'Delete Request', click: () => deleteUserRequest(menuProps.id)}
    }
    else if(menuProps.received) {
        btn = {name: 'Add Friend', click: () => addFriend(menuProps.id)}
    }
    else if(menuProps.friend) {
        btn = {name: 'Delete Friend', click: () => deleteFriendHandler(menuProps.id)}
    }
    setMenuButtons([btn])
    setFriendOptionOpen(menuProps.id)
  }

  const handleSendAlert = async () => {
    const response = await sendAlert()
  }
  const handleDisableAlert = async () => {
    const respone = await disableAlert()
  }
  return (
      <Container>
        <HeadingContainer>
          <Heading>
            Profile
          </Heading>
        </HeadingContainer>

        <HeadingDivider 
          style={{
            opacity: scrollAmount > 5 ? 1 : 0
          }}
        />

        <Content
          onScroll={contentScrollHandler}
        >
          <UserCardsHeading>
                  Username
          </UserCardsHeading>
          <NameContainer>
            {name}
          </NameContainer>

          {
              currentStatus !== 'idle' &&
                <AlertTextContainer>
                  Your Alert is currently active!
                </AlertTextContainer>
          }

          <UserAlertContainer>
            {
              currentStatus === 'idle' ?
                <BigButton   
                  clicked={handleSendAlert}
                  title="Send Alert"
                  color={colors.green}
                  bold
                />
                :
                <BigButton   
                  clicked={handleDisableAlert}
                  title="Deactivate Alert"
                  color={colors.red}
                  bold
                />
            }
          </UserAlertContainer>
         
          
          {
            friendRequestsReceived?.length ?
              <UserCardsContainer>
                <UserCardsHeading>
                  Friend Requests
                </UserCardsHeading>
                {
                  friendRequestsReceived?.map((prop: any, key: number) => 
                    <UserSearchCard
                      key={key}
                      name={prop.fullName}
                      last={key === (friendRequestsReceived.length - 1)}
                      openOptions={() => handleFriendsMenuOpen({id: prop.userId, sent: false, received: true, friend: false})}
                      requestSent={false}
                      requestReceived={true}
                      friend={false}
                    />
                )}
              </UserCardsContainer>
              : null
          }
          {
            friendRequestsSent?.length ?
              <UserCardsContainer>
                <UserCardsHeading>
                  Friend Requests Sent
                </UserCardsHeading>
                {
                  friendRequestsSent?.map((prop: any, key: number) => 
                    <UserSearchCard
                      key={key}
                      name={prop.fullName}
                      last={key === (friendRequestsSent.length - 1)}
                      openOptions={() => handleFriendsMenuOpen({id: prop.userId, sent: true, received: false, friend: false})}
                      requestSent={true}
                      requestReceived={false}
                      friend={false}
                    />
                )}
              </UserCardsContainer>
              : null
          }
          {
            friends?.length ?
              <UserCardsContainer>
                <UserCardsHeading>
                  Friends
                </UserCardsHeading>
                {
                  friends?.map((prop: any, key: number) => 
                    <UserSearchCard
                      key={key}
                      name={prop.fullName}
                      last={key === (friends.length - 1)}
                      openOptions={() => handleFriendsMenuOpen({id: prop.userId, sent: false, received: false, friend: true})}
                      requestSent={false}
                      requestReceived={false}
                      friend={true}
                    />
                )}
              </UserCardsContainer>
              : null
          }
          
          <SignoutContainer>
            <BigButton   
              clicked={signoutHandler}
              title="Sign out"
              color='black'
              bold
            />
          </SignoutContainer>

          <BottomMenu
            open={friendOptionOpen !== -1} 
            close={() => setFriendOptionOpen(-1)} 
            buttons={menuButtons}
          />
          
        </Content>
      </Container>
  );
}

export default Profile;
