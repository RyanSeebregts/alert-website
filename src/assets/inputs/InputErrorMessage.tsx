import React from 'react'
import styled from 'styled-components'

import colors, {globalStyles} from '../../constants/global.constants'

const Container = styled.div`
    height: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`
const Text = styled.div`
    ${globalStyles.smallParagraph}
    color: ${colors.red};
`

interface error {
    code: string
    message: string
}

interface propTypes {
    errors: error[]
    error: string
}

const InputErrorMessage = (props: propTypes) => {

    return (
        <Container>
            
            {props.errors.map((prop, key) => 
                prop.code === props.error &&
                    <Text 
                        key={key}
                        style={{
                            fontSize: prop.message.length > 26 ? '13px' : '18px'
                        }}
                    >
                        {prop.message}
                    </Text>
            )}
            
        </Container>
    )
}



export default InputErrorMessage 