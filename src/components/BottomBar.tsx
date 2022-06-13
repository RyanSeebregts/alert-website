import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import colors from '../constants/global.constants';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import authReducer, { signIn, signUp, resetPassword } from '../redux/reducers/authReducer';

const Container = styled.div`
    position: relative;
    background: ${colors.greyBackground};
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-shrink: 0;
    border-top: 1px solid lightgrey;
`

const MenuOption = styled.div`
    height: 100%;
    flex: 1;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const MenuOptionIcon = styled.div`
    width: 100%;
    flex: 1;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    transition: all 0.15s ease;
    align-items: flex-end;

`

const MenuOptionName = styled.div`
    width: 100%;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    transition: all 0.15s ease;
    overflow: hidden;
`

type optionType = {
    name: string
    icon: any
}

interface propTypes {
    options: optionType[]
    selected: number
    setSelected: any
}

const BottomBar = (props: propTypes) => {
    const {
        options,
        selected,
        setSelected
    } = props

    const changeHandler = (key: number) => {
        setSelected(key)
    }
    return (
        <Container>
            {
                options.map((prop: optionType, key: number ) => 
                    <MenuOption 
                        key={key}
                        onClick={() => changeHandler(key)}
                    >
                        <MenuOptionIcon>
                            <prop.icon size={25} color={selected === key ? colors.blue : 'black'} />
                        </MenuOptionIcon>
                        <MenuOptionName
                            style={{
                                height: selected === key ? '50%' : '50%',
                                color: selected === key ? colors.blue : 'black',
                            }}
                        >
                            {prop.name}
                        </MenuOptionName>
                    </MenuOption>
                )
            }
            
        </Container>
    )
}

export default BottomBar