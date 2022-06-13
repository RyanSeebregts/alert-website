import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import colors from '../../constants/global.constants';

const Container = styled.div`
`

const HeadingContainer = styled.div`
    margin-left: 0px;
    font-weight: bold;
    font-size: 15px;
    margin-bottom: 5px;
    color: ${colors.textColor};
`

const InputContainer = styled.input`
    outline: none;
    border-radius: 10px;
    border-color: ${colors.textColor};
    border-width: 2px;
    padding: 0; 
    margin: 0;
    width: calc(100% - 14px);
    padding-left: 5px;
    padding-right: 5px;
    &:focus {
        border-color: ${colors.blue};
    }
`

interface propTypes {
    heading?: string
    placeholder: string
    type?: string
    value: string
    onChange: Function
    readOnly?: boolean

    //styled props
    width?: string
    height?: string

}

const TextInput = (props: propTypes) => {

    const onChangeHandler = (e:any) => {
        props.onChange(e.target.value)
    }
    return (
        <Container
            style={{
                width: props.width || 'auto',
            }}
        >
            {
                props.heading &&
                    <HeadingContainer
                        style={{
                            width: props.width || 'auto',
                        }}
                    >
                        {props.heading}
                    </HeadingContainer>
            }
            <InputContainer
                type={props.type || 'text'}
                value={props.value}
                onChange={onChangeHandler}
                placeholder={props.placeholder}
                readOnly={props.readOnly || false}

                style={{
                    height: props.height || '25px',
                }}
            >

            </InputContainer>
        </Container>
    )
}

export default TextInput