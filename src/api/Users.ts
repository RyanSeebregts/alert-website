import FetchBase from './FetchBase'

export const findFriends = async (search: string, token?:string) => {
    const response = await FetchBase({
        method: "GET",
        endpoint: 'user/find-friends',
        token: token,
        data: {
            search
        }
    })
    
    return response
}

export const getUserInfo = async () => {
    const response = await FetchBase({
        method: "GET",
        endpoint: 'user/get-user-info',
    })
    
    return response
}

export const sendFriendRequest = async (friendId: any) => {
    const response = await FetchBase({
        method: "POST",
        endpoint: 'user/send-friend-request',
        data: {
            friendId
        }
    })
    
    return response
}

export const deleteFriendRequest = async (requestId: any) => {
    const response = await FetchBase({
        method: "POST",
        endpoint: 'user/delete-friend-request',
        data: {
            requestId
        }
    })
    
    return response
}

export const acceptFriendRequest = async (requestId: any) => {
    const response = await FetchBase({
        method: "POST",
        endpoint: 'user/accept-friend',
        data: {
            requestId
        }
    })
    
    return response
}

export const deleteFriend = async (friendId: any) => {
    const response = await FetchBase({
        method: "POST",
        endpoint: 'user/delete-friend',
        data: {
            friendId
        }
    })
    
    return response
}

export const sendAlert = async () => {
    const response = await FetchBase({
        method: "POST",
        endpoint: 'user/send-alert-app',
        data: {
        }
    })
    
    return response
}

export const disableAlert = async () => {
    const response = await FetchBase({
        method: "POST",
        endpoint: 'user/disable-alert',
        data: {
        }
    })
    
    return response
}

export const getFriendInfo = async (userId: string) => {
    const response = await FetchBase({
        method: "GET",
        endpoint: 'user/get-friend-info',
        data: {
            userId
        }
    })
    
    return response
}