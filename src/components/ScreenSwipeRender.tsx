import React, {useState} from 'react';
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex: 1;
`

const Screen = styled.div`
  position: absolute;
  flex-shrink: 0;
  top: 0px;
  height: 100%;
  width: 100%;
  transition: all 0.3s ease;
`

interface propTypes {
    screens: any
    selected: number
}
function ScreenSwipeRender(props: propTypes) {
    return (
        <Container>
            {
                props.screens.map((prop: any, key: number) => 
                    <Screen 
                        key={key}
                        style={{
                            left: `${(key - props.selected) * 100}%`
                        }}
                    >
                        {prop}
                    </Screen>
                )
            }
        </Container>
    );
}

export default ScreenSwipeRender;
