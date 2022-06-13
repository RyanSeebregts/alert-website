import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { signup, authorise } from '../../api/Auth'
import { getUserInfo } from '../../api/Users'

export interface setUserInfoType {
    userToken: string
    isAuthenticated: boolean
}

export interface signInInterface {
    email: string
    password: string
}

export interface signUpInterface {
    fullName: string
    email: string
    password: string
    confirmPassword: string
    dateOfBirth: Date
}

export interface resetPasswordInterface {
    email: string
}

export interface tokenSignInType {
    user: any
}

export const signIn = createAsyncThunk(
    'auth/signIn',
    async (payload: signInInterface) => {

        if(payload.email.trim() === '' || payload.password.trim() === "") {
            throw {code: 'empty'}
        }
        const auth = getAuth();

        const response = await signInWithEmailAndPassword(auth, payload.email, payload.password)
        console.log(response)
        const authResponse = await authorise()
        if(authResponse.error) {
            await signOut(auth)
            throw authResponse.error
        }
        return
    }
)

export const signUp = createAsyncThunk(
    'auth/signUp',
    async (payload: signUpInterface) => {
        const {fullName, email, password, confirmPassword, dateOfBirth} = payload
        if(fullName.trim() === '') 
            throw {code: 'name-empty'}
        
        if( email.trim() === '')
            throw {code: 'email-empty'}

        if( password.trim() === "")
            throw {code: 'password-empty'}

        if( password !== confirmPassword) 
            throw {code: 'confirm-password'}
        
        let today = new Date()
        today.setHours(0, 0, 0, 0)

        let dob = dateOfBirth
        dob.setHours(0, 0, 0, 0)
        if(dob.getTime() == today.getTime()) 
            throw {code: 'dob-empty'}
        
        const age = today.getFullYear() - dob.getFullYear();
        console.log(age)
        if( age <= 13) 
            throw {code: 'too-young'}
        

        const data = {
            fullName,
            email, 
            password,
            dateOfBirth: dob
        }
        console.log(data)

        const response:any = await signup(data)
        
        if(response.success) {
            return true
        }
        else {
            if(response.error) 
                throw {code: response.error}
            
            else 
                throw {code: 'signup-error'}
        }
    }
)

export const signout = createAsyncThunk(
    'auth/signout',
    async () => {
        const auth = getAuth();
        const resp = await signOut(auth)

        return true
        
    }
)

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (payload: resetPasswordInterface) => {
        const auth = getAuth();

        const resp = await sendPasswordResetEmail(auth, payload.email)

        return true
        
    }
)

export const setUserInfo = createAsyncThunk(
    'auth/setUserInfo',
    async () => {
        const userInfo = await getUserInfo()
        console.log(userInfo)
        return userInfo
    }
)

export const tokenSignIn = createAsyncThunk(
    'auth/tokenSignIn',
    async (payload: tokenSignInType) => {
        const auth = getAuth();

        const authResponse = await authorise()
        if(authResponse.error) {
            await signOut(auth)
            throw authResponse.error
        }
        console.log(authResponse)
        return authResponse
    }
)

export interface AuthState {
    loginLoading: boolean
    loginError: string
    isAuthenticated: boolean;

    registerError: string
    registerSuccess: boolean

    name: string
    userToken: string
    currentStatus: string
    userId: string
    resetPasswordOpen: boolean
    resetPasswordLoading: boolean
    resetPasswordError: string
    resetSuccess: boolean

    friends: any[]
    friendRequestsSent: any[]
    friendRequestsReceived: any[]
}

const intitialState: AuthState = {
    loginLoading: true,
    loginError: "",
    isAuthenticated: false,
    currentStatus: '',

    registerError: '',

    registerSuccess: false,

    name: '',
    userToken: '',
    userId: '',
    resetPasswordOpen: false,
    resetPasswordLoading: false,
    resetPasswordError: '',

    resetSuccess: false,

    friends: [],
    friendRequestsSent: [],
    friendRequestsReceived: []
}

const auth = createSlice({
    name: 'auth',
    initialState: intitialState,
    reducers: {
        setRegisterSuccess: (state, action) => {
            state.registerSuccess = action.payload
        },
        setResetPasswordOpen: (state, action) => {
            state.resetPasswordOpen = action.payload
        },
        setResetSuccess: (state, action) => {
            state.resetSuccess = action.payload
        },
        setLoginLoading: (state, action) => {
            state.loginLoading = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.pending, (state) => {
            state.loginLoading = true;
            state.loginError = ""
        });
        builder.addCase(signIn.rejected, (state, action) => {
            state.loginLoading = false
            state.isAuthenticated = false
            console.log(action.error.code)
            state.loginError = action.error.code as string
        })
        builder.addCase(signIn.fulfilled, (state, action) => {
            //state.loginLoading = false
            //state.isAuthenticated = true
            //state.loginError = ""
            //state.name = action.payload.fullName
        })

        builder.addCase(tokenSignIn.pending, (state) => {
            state.loginLoading = true;
            state.loginError = ""
        });
        builder.addCase(tokenSignIn.rejected, (state, action) => {
            state.loginLoading = false
            state.isAuthenticated = false
            console.log(action.error.code)
            state.loginError = action.error.code as string
        })
        builder.addCase(tokenSignIn.fulfilled, (state, action) => {
            state.loginLoading = false
            state.isAuthenticated = true
            state.loginError = ""
            state.name = action.payload.user.fullName
            state.userId = action.payload.user._id
            state.currentStatus = action.payload.user.currentStatus
        })

        builder.addCase(signUp.pending, (state) => {
            state.loginLoading = true;
            state.registerError = ""
            state.registerSuccess = false
        });
        builder.addCase(signUp.rejected, (state, action) => {
            state.loginLoading = false
            state.registerError = action.error.code as string
            state.registerSuccess = false
        })
        builder.addCase(signUp.fulfilled, (state) => {
            state.loginLoading = false
            state.registerError = ""
            state.registerSuccess = true
        })


        builder.addCase(signout.pending, (state) => {
            
        });
        builder.addCase(signout.rejected, (state, action) => {
            console.log(action)
        })
        builder.addCase(signout.fulfilled, (state) => {
            state.loginLoading = false
            state.loginError = ""
            state.isAuthenticated = false

            state.registerError = ''

            state.registerSuccess = false

            state.name = ''
        })
        
        builder.addCase(resetPassword.pending, (state) => {
            state.resetPasswordLoading = true
            state.resetPasswordError = ''
            state.resetSuccess = false
        });
        builder.addCase(resetPassword.rejected, (state, action) => {
            console.log(action)
            state.resetPasswordLoading = false
            state.resetPasswordError = action.error.code as string
            state.resetSuccess = false
        })
        builder.addCase(resetPassword.fulfilled, (state) => {
            state.resetSuccess = true
            state.resetPasswordLoading = false
            state.resetPasswordError = ''
            state.resetPasswordOpen = false
        })

        builder.addCase(setUserInfo.pending, (state) => {
        });
        builder.addCase(setUserInfo.rejected, (state, action) => {
        })
        builder.addCase(setUserInfo.fulfilled, (state, action) => {
            state.friends = action.payload.friends
            state.friendRequestsSent = action.payload.sentRequests
            state.friendRequestsReceived = action.payload.receivedRequests
            state.currentStatus = action.payload.userInfo?.currentStatus
        })

        
    }
});

export default auth;
