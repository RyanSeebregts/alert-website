import React, {useState} from 'react';
import styled from 'styled-components'
import colors, { globalStyles } from '../constants/global.constants';
import { IoIosArrowBack } from 'react-icons/io';

const Container = styled.div`
    position: fixed;
    top: 0px;
    height: 100%;
    width: 100%;
    background: white;
    transition: all 0.3s ease;
    z-index: 10;
`

const HeadingContainer = styled.div`
  height: 70px;
  width: calc(100% - 30px);
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px -5px 30px rgba(0,0,0,0.2);
`

const HeadingDivider = styled.div`
  width: 100%;
  height: 1px;
  background: ${colors.lightgrey};
  transition: all 0.1s ease;
`

const BackIconContainer = styled.div`
  width: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
`

const Content = styled.div`
  width: 100%;
  height: calc(100% - 71px);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`

interface propTypes {
    open: boolean
    close: Function
    header?: any
    children?: any
}
function SlideInScreen(props: propTypes) {
    const {
        open,
        close,
        header,
        children
    } = props
    const [scrollAmount, setScrollAmount] = useState(0)

    const contentScrollHandler = (e:any) => {
        setScrollAmount(e.target.scrollTop)
    }
    const closeHandler = (e: any) => {
        close()
    }
    return (
        <Container
            style={{
                left: open ? '0%' : '100%'
            }}
        >
            <HeadingContainer>
                <BackIconContainer
                    onClick={closeHandler}
                >
                    <IoIosArrowBack 
                        size={30}
                        color="black"
                        style={{
                            width: '100%',
                        }}
                    />
                </BackIconContainer>
                {
                    header
                }

                <div style={{width: '40px'}} />
            </HeadingContainer>

            <HeadingDivider 
                style={{
                    opacity: scrollAmount > 5 ? 1 : 0
                }}
            />

            <Content
                onScroll={contentScrollHandler}
            >
                {
                    children
                }
            
            </Content>
        </Container>
    );
}

export default SlideInScreen;
