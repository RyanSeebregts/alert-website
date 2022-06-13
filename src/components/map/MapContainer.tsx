import React, { useState, useEffect } from 'react'
import GoogleMap from 'google-map-react';
import colors, {mapKey} from '../../constants/global.constants';
import Marker from './TestMarker'
import customMapOptions from './customMapOptions'

export interface mapChangeInterface {
    center: any
    zoom: number
    bounds: any
    marginBounds: any
}

function createMapOptions(maps:any) {
	return {
		panControl: false,
		mapTypeControl: false,
		zoomControl: false,
		fullscreenControl: false,
        
        clickableIcons: false,
		styles: customMapOptions
	};
}


const initialZoom = 14
const initialMarker = 10

interface propTypes {
    center?: any
    onChange?: any
    markerLat?: number
    markerLng?: number
}

const MapContainer = (props: propTypes) => {
    const {
        markerLat,
        markerLng
    } = props
    const [center, setCenter] = useState({lat: -33.921577, lng: 18.419584})
    const [activeMarker, setActiveMarker] = useState(-1)
    const [zoom, setZoom] = useState(14)

    const mapChange = ( params: mapChangeInterface) => {
        if(props.onChange)
            props.onChange(params)
        console.log(params.zoom)
        setZoom(params.zoom)
    }
    
    const markerClick = (key:number) => {
        setActiveMarker(key)
    };

    const onMapClicked = (props:any) => {
        setActiveMarker(-1)
    };        

		
    return (
        <div style={{width: '100%', height: '100%'}}>
            <GoogleMap 
            
                bootstrapURLKeys={{
                    key: mapKey,
                }}
                center={props.center || center}

                zoom={initialZoom}
                onChange ={mapChange}
                options={createMapOptions}
                onClick={onMapClicked}
            >
                {markerLat && markerLng &&
                    <Marker
                        lat={markerLat}
                        lng={markerLng}
                        size="big"
                    />
                }
                
            </GoogleMap>
        </div>
    )

}


export default MapContainer

