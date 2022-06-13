import React from 'react'
import styled from 'styled-components'

import colors from '../../constants/global.constants'

const Button = styled.div`
    width: 100%;
    pointer-events: auto;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    border-radius: 10px;
    background: lightgrey;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
`
const Text = styled.div`
    font-size: 20px;
`


interface propTypes {
    title?: string
    clicked: Function
    icon?: any
    paddingHorizontal?: string
    paddingVertical?: string
    bold?: boolean
    background?: string
    color?: string
    htmlFor?: string
    radius?: string
}

const ClassicButton = (props: propTypes) => {

    const onClickHandler = (e: any) => {
        props.clicked()
    }
    return (
        <Button
           
            onClick={onClickHandler}
        >
            {
                props.icon &&
                    <div style={{marginTop: '0px', flexShrink: 0, verticalAlign: 'middle', display: 'flex', alignItems: 'center'}}>
                        <props.icon 
                            color={props.color || 'white'}
                            size={20}
                        />
                    </div>
            }
            <Text 
                style={{
                    marginLeft: props.icon && props.title ? '5px' : '0px',
                    fontWeight: props.bold ? 'bold' : 'normal',
                    color: props.color || 'white'
                }}
            >
                {props.title}
            </Text>

        </Button>
    )
}



export default ClassicButton 