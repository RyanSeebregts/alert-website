import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components'
import colors, { globalStyles } from '../../constants/global.constants';
import { IoIosArrowBack } from 'react-icons/io';
import SlideInScreen from '../SlideInScreen';
import SearchInput from '../../assets/inputs/SearchInput';
import MapContainer from '../map/MapContainer'
import {dateCompleteFormat} from '../../helper/date'
import Loading from '../Loading';
import {getFriendInfo} from '../../api/Users'
const Content = styled.div`
   height: 100%;
   width: 100%;
`

const FriendInfoContainer = styled.div`
    position: absolute;
    bottom: 0px;
    height: 100px;
    width: 100%;
    background: white;
    box-shadow: 0px 5px 30px rgba(0,0,0,0.2);
`
const LoadingContainer = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
`

const NameContainer = styled.div`
    height: 60px;
    width: 100%;
    display: flex;
    font-weight: bold;
    font-size: 25px;
    align-items: center;
    justify-content: flex-start;
    margin-left: 15px;
`

const LastUpdatedContainer = styled.div`
    height: 40px;
    width: 100%;
    display: flex;
    color: rgba(0,0,0,0.6);
    font-size: 18px;
    align-items: flex-start;
    justify-content: flex-start;
    margin-left: 15px;
`

interface propTypes {
    open: boolean
    close: Function
    friendOpen: string
}
function FindFriend(props: propTypes) {
    const {
        open,
        close,
        friendOpen
    } = props

    const [name, setName] = useState('')
    const [lastUpdated, setLastUpdated] = useState(new Date)
    const [lastUpdatedAvailable, setLastUpdatedAvailable] = useState(false)

    const [location, setLocation] = useState({lat: 0, lng: 0})

    const [loading, setLoading] = useState(true)
    const intervalHolder:any = useRef<any>(null);
    const getFriendInfoHelper = async () => {
        if(friendOpen === '' || friendOpen === undefined)
            return
        console.log(friendOpen)
        let friendInfo: any = await getFriendInfo(friendOpen)
        if(friendInfo && friendInfo?.friend.currentStatus !== 'idle') {
            setName(friendInfo?.friend?.fullName)
            if(friendInfo?.friend?.lastUpdate) {
                const d = new Date(friendInfo?.friend?.lastUpdate)
                setLastUpdated(d)
            }
            else {
                setLastUpdatedAvailable(false)
            }
            const lat = friendInfo?.friend?.lastLocation.coordinates[0]
            const lng = friendInfo?.friend?.lastLocation.coordinates[1]

            setLocation({lat, lng})
            setLoading(false)
        }
        else {
            close()
        }
    }

    useEffect(() => {
        if(open) {
            setName('')
            setLastUpdated(new Date())
            setLastUpdatedAvailable(false)
            setLocation({
                lat: 0,
                lng: 0
            })
            setLoading(true)
            getFriendInfoHelper()
            intervalHolder.current = setInterval(getFriendInfoHelper, 10000)            
        }
        else {
            clearInterval(intervalHolder.current)
        }
    }, [open, friendOpen])

    return (
        <SlideInScreen
            open={open}
            close={close}
        >
            <Content>
                <MapContainer
                    center={location}
                    markerLat={!loading ? location.lat : undefined}
                    markerLng={!loading ? location.lng : undefined}
                />

                <FriendInfoContainer>
                    {
                        loading &&
                            <LoadingContainer>
                                <Loading />
                            </LoadingContainer>
                    }
                    <NameContainer>
                        {name}
                    </NameContainer>
                    {
                        lastUpdatedAvailable &&
                            <LastUpdatedContainer>
                                {dateCompleteFormat(lastUpdated)}
                            </LastUpdatedContainer>
                    }
                </FriendInfoContainer>
            </Content>  
        </SlideInScreen>
    );
}

export default FindFriend;
