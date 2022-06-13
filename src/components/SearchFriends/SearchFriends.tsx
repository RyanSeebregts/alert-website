import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components'
import colors, { globalStyles } from '../../constants/global.constants';
import { IoIosArrowBack } from 'react-icons/io';
import SlideInScreen from '../SlideInScreen';
import SearchInput from '../../assets/inputs/SearchInput';
import { findFriends } from '../../api/Users'
import UserSearchCard from '../UserSearchCard';
import BottomMenu from '../BottomMenu';
import { useAppSelector } from "../../redux/hooks";
import Loading from '../Loading';
import {sendFriendRequest, deleteFriendRequest, acceptFriendRequest, deleteFriend} from '../../api/Users'
const Content = styled.div`
   height: 100%;
   width: 100%;
`


interface propTypes {
    open: boolean
    close: Function
}
function SearchFriends(props: propTypes) {
    const {
        open,
        close
    } = props

    const userId = useAppSelector((state) => state.auth.userId);
    const friendRequestsSent = useAppSelector((state) => state.auth.friendRequestsSent);
    const friendRequestsReceived = useAppSelector((state) => state.auth.friendRequestsReceived);
    const friends = useAppSelector((state) => state.auth.friends);

    const [search, setSearch] = useState('')
    const [friendsFound, setFriendsFound] = useState<any[]>([])
    const [friendOptionOpen, setFriendOptionOpen] = useState<any>(-1)
    const [loading, setLoading] = useState(false)
    const [menuButtons, setMenuButtons] = useState<any[]>([])

    const handleClose = () => {
        setSearch('')
        setFriendsFound([])
        setFriendOptionOpen(-1)
        close()
    }
    const handleSearchChange = (val: string) => {
        setLoading(true)
        if(val === '')
            setLoading(false)
        setSearch(val)
    }

    const getFriendsTest = async () => {
        if(search.trim() !== '') {
            const response:any = await findFriends(search)
            if(response.users) {
                console.log(response.users)
                const usersProcessed:any[] = []
                response.users.forEach((user: any) => {
                    if(user._id !== userId) {
                        let newUser = {...user}
                        if(friendRequestsSent.findIndex((prop: any) => prop.userId === user._id) !== -1)
                            newUser.requestSent = true
                        else if(friendRequestsReceived.findIndex((prop: any) => prop.userId === user._id) !== -1)
                            newUser.requestReceived = true
                        else if(friends.findIndex((prop: any) => prop.userId === user._id) !== -1)
                            newUser.friend = true
                        
                        usersProcessed.push(newUser)
                    }
                })
                console.log(usersProcessed)
                setFriendsFound(usersProcessed)
            }
            setLoading(false)
        }
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

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          getFriendsTest()
        }, 1000)
    
        return () => clearTimeout(delayDebounceFn)
    }, [search, friendRequestsSent, friends, friendRequestsReceived])

    return (
        <SlideInScreen
            header={
                <SearchInput 
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="search people"
                    width={'calc(100% - 120px)'}
                />
            }
            open={open}
            close={handleClose}
        >
            <Content>
                {
                    !loading ?
                        search === '' ?
                            <div style={{width: '100%', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                Enter email or name to search for
                            </div>
                            :
                            friendsFound.length ?
                                friendsFound.map((prop: any, key: number) =>
                                    prop?._id !== userId &&
                                        <UserSearchCard
                                            key={key}
                                            name={prop.fullName}
                                            last={key === (friendsFound.length - 1)}
                                            openOptions={() => handleFriendsMenuOpen({id: prop._id, sent: prop.requestSent, received: prop.requestReceived, friend: prop.friend})}
                                            requestSent={prop.requestSent}
                                            requestReceived={prop.requestReceived}
                                            friend={prop.friend}
                                        />
                                )
                                :
                                'No users found'

                        :
                        <Loading />

                }

                <BottomMenu 
                    open={friendOptionOpen !== -1} 
                    close={() => setFriendOptionOpen(-1)} 
                    buttons={menuButtons}
                />
            </Content>
        </SlideInScreen>
    );
}

export default SearchFriends;
