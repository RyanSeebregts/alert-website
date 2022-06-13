import React from 'react'
import styled from 'styled-components'

import colors from '../../constants/global.constants'

const Container = styled.button`
    cursor: pointer;
    border: none;
    outline: inherit;
    border-radius: 7px;
    height: 35px;
    display: flex;
    align-items: center;
    flex-grow: 0;
    flex-shrink: 0;
    line-height: 35px;
`
const Text = styled.div`
    font-size: 15px;
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
        <Container
            style={{
                paddingLeft: props.paddingHorizontal || '10px',
                paddingRight: props.paddingHorizontal || '10px',

                borderRadius: props.radius || '7px',
                background: props.background || colors.blue
            }}
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

        </Container>
    )
}



export default ClassicButton 