import React, {useState} from 'react';
import styled from 'styled-components'
import colors, { globalStyles } from '../constants/global.constants';
import { IoIosAdd } from 'react-icons/io';
import UserCard from '../components/UserCard';
import UserAlertCard from '../components/UserAlertCard';
import SearchFriends from '../components/SearchFriends/SearchFriends';
import FindFriend from '../components/FindFriend/FindFriend';
import BottomMenu from '../components/BottomMenu';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from 'react';

const Container = styled.div`
  height: 100%;
  width: 100%;
  background: white;
`

const HeadingContainer = styled.div`
  height: 80px;
  width: calc(100% - 30px);
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

const AddIconContainer = styled.div`
  width: 40px;
`

const Content = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`

const UserAlertContainer = styled.div`
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
`

const Heading = styled.div`
  ${globalStyles.mediumHeading}
`

interface propTypes {
}
function People(props: propTypes) {
  const [scrollAmount, setScrollAmount] = useState(0)
  const [addFriendsOpen, setAddFriendsOpen] = useState(false)
  const [findFriendOpen, setFindFriendOpen] = useState('')

  const [alertedFriends, setAlertedFriends] = useState<any[]>([])

  const friends = useAppSelector((state) => state.auth.friends);

  const contentScrollHandler = (e:any) => {
    setScrollAmount(e.target.scrollTop)
  }

  const addFriendsClickHandler = (e: any) => {
    console.log('hehe')
    setAddFriendsOpen(true)
  }

  useEffect(() => {
    let newAlertedFriends = []
    for(let friend of friends) {
      if(friend.currentStatus !== 'idle') {
        newAlertedFriends.push(friend)
      }
    }
    setAlertedFriends(newAlertedFriends)
  }, [friends])

  return (
      <Container>
        <HeadingContainer>
          <Heading>
            People
          </Heading>
          <AddIconContainer
            onClick={addFriendsClickHandler}
          >
            <IoIosAdd 
              size={40}
              color="black"
              style={{
                width: '100%'
              }}
            />
          </AddIconContainer>
        </HeadingContainer>
        <HeadingDivider 
          style={{
            opacity: scrollAmount > 5 ? 1 : 0
          }}
        />
        <Content
          onScroll={contentScrollHandler}
        >
          { alertedFriends.length ?
            <UserAlertContainer>
              {
                alertedFriends.map((prop:any, key:number) => 
                  <UserAlertCard
                    name={prop.fullName}
                    openFind={() => setFindFriendOpen(prop.userId)}
                  />
                )
              }
              
            </UserAlertContainer>
            : null
          }
          
          {
            friends?.map((prop: any, key: number) =>
              <UserCard 
                key={key}
                name={prop.fullName}
                lastSeen={new Date}
                last={key === (friends.length - 1)}
                openOptions={() => {}}
              />
            )
          }

          <div style={{height: '20px', flexShrink: 0}} />
        </Content>

        <SearchFriends open={addFriendsOpen} close={() => setAddFriendsOpen(false)} />
        <FindFriend open={findFriendOpen !== '' && findFriendOpen !== undefined} friendOpen={findFriendOpen} close={() => setFindFriendOpen('')} />

      </Container>
  );
}

export default People;
