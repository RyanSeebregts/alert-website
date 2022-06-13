import React, {useState} from 'react';
import styled from 'styled-components'
import DeviceCard from '../components/DeviceCard';
import colors, { globalStyles } from '../constants/global.constants';

const Container = styled.div`
  height: 100%;
  width: 100%;
  background: white;
`

const HeadingContainer = styled.div`
  height: 80px;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const HeadingDivider = styled.div`
  width: 100%;
  height: 1px;
  background: ${colors.lightgrey};
  transition: all 0.1s ease;
`

const Heading = styled.div`
  ${globalStyles.mediumHeading}
`

const Content = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`

const fakeDevices = [
  {name: 'Keychain button', battery: 100, usingBattery: true, status: 'idle', },
  {name: 'Keychain button', battery: 100, usingBattery: true, status: 'idle', },
  {name: 'Keychain button', battery: 100, usingBattery: true, status: 'idle', },
  {name: 'Keychain button', battery: 100, usingBattery: true, status: 'idle', },

  {name: 'Keychain button', battery: 100, usingBattery: true, status: 'idle', },
  {name: 'Keychain button', battery: 100, usingBattery: true, status: 'idle', },
  {name: 'Keychain button', battery: 100, usingBattery: true, status: 'idle', },
  {name: 'Keychain button', battery: 100, usingBattery: true, status: 'idle', },
  {name: 'Keychain button', battery: 100, usingBattery: true, status: 'idle', },
  {name: 'Keychain button', battery: 100, usingBattery: true, status: 'idle', },
  {name: 'Keychain button', battery: 100, usingBattery: true, status: 'idle', },
  {name: 'Keychain button', battery: 100, usingBattery: true, status: 'idle', },


]
interface propTypes {
}
function Devices(props: propTypes) {
  const [scrollAmount, setScrollAmount] = useState(0)

  const contentScrollHandler = (e:any) => {
    setScrollAmount(e.target.scrollTop)
  }
  return (
      <Container>
        <HeadingContainer>
          <Heading>
            Devices
          </Heading>
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
            fakeDevices.map((prop: any, key: number) => 
              <DeviceCard
                key={key}
              />
            )
          }
        </Content>
      
      </Container>
  );
}

export default Devices;
