import React, { useState, useEffect } from 'react'
import colors, {mapKey} from '../../constants/global.constants';
import {MdLocationPin} from 'react-icons/md'


interface propTypes {
    lat?: any
    lng?: any
    size?: string
}

const TestMarker = (props: propTypes) => {

		
    return (
        <div 
            style={{
                position: 'relative',
                width: props.size === 'big' ? '40px' : '10px', 
                height: props.size === 'big' ? '40px' : '10px', 
                display: 'flex', 
                flex: 0, 
                justifyContent: 'center', 
                alignItems: 'center', 
                overflow: 'visible', 
            }}
        >
            <MdLocationPin
                color="red"
                size={
                    props.size === 'big' ? 60 : 30
                }
                style={{
                    position: 'absolute',
                    right: '50%',
                    bottom: '100%',
                }}
            />
        </div>
        
    )

}


export default TestMarker

