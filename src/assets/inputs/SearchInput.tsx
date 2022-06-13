import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import colors from '../../constants/global.constants';
import { IoIosSearch, IoIosCloseCircle } from 'react-icons/io';

const Container = styled.div`
    border-radius: 10px;
    border: 1px solid lightgrey;
    height: 40px;
    background: lightgrey;
    display: flex;
    flex-direction: row;
    padding-right: 5px;
    align-items: center;
    &:focus {
        border-color: grey;
    }
`

const InputContainer = styled.input`
    outline: none;
    height: 100%;
    flex: 1;
    border: 0px;
    padding: 0; 
    margin: 0;
    background: transparent;
`

const CancelContainer = styled.div`
    height: 100%;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`

interface propTypes {
    placeholder: string
    value: string
    onChange: Function
    //styled props
    width?: string
}

const SearchInput = (props: propTypes) => {

    const onChangeHandler = (e:any) => {
        props.onChange(e.target.value)
    }

    const clearText = () => {
        props.onChange('')
    }
    return (
        <Container
            style={{
                width: props.width || 'auto',
            }}
        >
            <IoIosSearch 
                size={20}
                color="black"
                style={{
                    marginLeft: '10px',
                    marginRight: '10px',
                }}
            />
            <InputContainer
                type={'text'}
                value={props.value}
                onChange={onChangeHandler}
                placeholder={props.placeholder}
            >

            </InputContainer>

            <CancelContainer
                style={{
                    opacity: props.value === '' ? 0 : 1,
                    cursor: props.value === '' ? 'default' : 'pointer',
                }}
                onClick={clearText}
            >
                <IoIosCloseCircle
                    size={30}
                    color={'grey'}
                />
            </CancelContainer>
        </Container>
    )
}

export default SearchInput