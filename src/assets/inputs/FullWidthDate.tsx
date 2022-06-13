import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import colors, {globalStyles} from '../../constants/global.constants';
import FullWidthInput from './FullWidthInput';


const InputContainer = styled.input`
    outline: none;
    height: 100%;
    padding: 0; 
    border: 0px;
    background: transparent;
    margin: 0;
    flex: 1;
    font-size: 18px;
`

interface propTypes {
    type?: string
    heading?: string
    placeholder: string
    value: Date
    onChange: Function
    readOnly?: boolean
    topBorder?: boolean
}

const FullWidthText = (props: propTypes) => {
    const {topBorder, type} = props

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
        <FullWidthInput
            topBorder={topBorder}
            heading={props.heading}
        >
            <InputContainer
                type={"date"}
                value={dateFormatter(props.value)}
                onChange={onChangeHandler}
                placeholder={props.placeholder}
                readOnly={props.readOnly || false}
            />
        </FullWidthInput>
    )
}

export default FullWidthText