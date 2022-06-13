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
    width: calc(100% - 14px);
    padding-left: 5px;
    padding-right: 5px;
    &:focus {
        border-color: ${colors.blue};
    }
`

interface propTypes {
    heading?: string
    value: Date
    onChange: Function

    //styled props
    width?: string
    height?: string

}

const CalendarInput = (props: propTypes) => {

    const onChangeHandler = (e:any) => {
        const d = new Date(e.target.value)
        props.onChange(d)
    }

    const dateFormatter = (d: Date) => {
        const dayPadded = String(d.getDate()).padStart(2, '0');
        const monthPadded = String(d.getMonth()+1).padStart(2, '0');

        return `${d.getFullYear()}-${monthPadded}-${dayPadded}`
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
                type={"date"}
                value={dateFormatter(props.value)}
                onChange={onChangeHandler}
                style={{
                    height: props.height || '25px',
                }}
            >

            </InputContainer>
        </Container>
    )
}

export default CalendarInput