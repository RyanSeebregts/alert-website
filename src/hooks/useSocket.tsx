import { useState, useEffect, useRef } from 'react';
import { apiUrl } from '../constants/global.constants'
import socketIOClient, {Socket} from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUserInfo } from '../redux/reducers/authReducer';

function useSocket() {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.auth.userId);
    const [currentUserId, setCurrentUserId] = useState('')
    const socket = useRef<Socket>();

    useEffect(() => {
        setCurrentUserId(userId)
        if(userId && userId !== '' ) {
            if(userId !== currentUserId) {
                setCurrentUserId(userId)
                socket.current = socketIOClient(apiUrl, {
                    query: {
                    "userId": userId
                    }
                });
                socket.current?.on('connection', (socket) => {
                    console.log('hello')
                });
                socket.current?.on("all users", data => {
                    console.log(data);
                });
                socket.current?.on("refresh user info", () => {
                    dispatch(setUserInfo())
                });
            }
            
        }
        else {
            socket.current?.disconnect()
        }
        
    }, [userId, currentUserId]);
}

export default useSocket