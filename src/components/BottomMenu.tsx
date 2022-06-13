import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import colors, { globalStyles } from '../constants/global.constants';

const Container = styled.div`
    position: fixed;
    top: 0px;
    height: 100%;
    width: 100%;
    background: transparent;
    transition: all 0.3s ease;
    z-index: 10;
`

const Background = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    background: black;
    opacity: 0.6;
    transition: all 0.3s ease;
`

const Content = styled.div`
    position: absolute;
    pointer-events: none;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    transition: all 0.3s ease;
`

const ButtonContainer = styled.div`
    position: relative;
    pointer-events: none;
    width: calc(100% - 40px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
`

const Button = styled.div`
    width: 100%;
    pointer-events: auto;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    border-radius: 10px;
    background: white;
    font-size: 24px;
    font-weight: bold;
`

type ButtonObject = {
    name: string
    click: Function
}

interface propTypes {
    open: boolean
    close: Function
    buttons?: ButtonObject[]
}
function BottomMenu(props: propTypes) {
    const {
        open,
        close,
        buttons
    } = props
    const [menuOpen, setMenuOpen] = useState(false)
    const [backgroundOpacity, setBackgroundOpacity] = useState(false)

    const closeHandler = (e: any) => {
        setMenuOpen(false)
        setBackgroundOpacity(false)
        setTimeout(() => close(), 300)
    }

    const buttonClickHandler = (e: any, buttonObj: ButtonObject) => {
        if(buttonObj.click) 
            buttonObj.click()
    }

    useEffect(() => {
        if(open) {
            setBackgroundOpacity(true)
            setTimeout(() => setMenuOpen(true), 100)
        }
        else {
            setBackgroundOpacity(false)
            setMenuOpen(false)
        }
    }, [open])


    return (
        <Container
            style={{
                display: open ? 'inherit' : 'none'
            }}
        >
            <Background 
                onClick={closeHandler}
                style={{
                    opacity: backgroundOpacity ? 0.6 : 0,
                }}
            />
            <Content
                style={{
                    top: backgroundOpacity ? '0%' : '100%'
                }}
            >
                <ButtonContainer>
                    {
                        buttons && buttons.map((prop, key) => 
                            <Button
                                onClick={(e) => buttonClickHandler(e, prop)}
                            >
                                {prop.name}
                            </Button>
                        )
                    }

                    <Button
                        onClick={closeHandler}
                    >
                        Cancel
                    </Button>
                </ButtonContainer>
            </Content>
        </Container>
    );
}

export default BottomMenu;
