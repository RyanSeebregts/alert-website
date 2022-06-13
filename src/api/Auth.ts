import FetchBase from './FetchBase'

interface checkSignupProps {
    email: string
    fullName: string
    password: string
    dateOfBirth: Date
}

export const signup = async (props: checkSignupProps) => {
    const { email, fullName, password, dateOfBirth } = props
    const data = {
        email, 
        fullName, 
        password,
        dateOfBirth: dateOfBirth.getTime()
    }
    const response = await FetchBase({
        method: "POST",
        data: data,
        endpoint: 'user/sign-up',
    })
    
    console.log(response)
    return response

}

export const authorise = async (token?:string) => {
    const response = await FetchBase({
        method: "GET",
        endpoint: 'user/authorise',
        token: token
    })
    
    return response
}
