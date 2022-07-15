export interface IAppState {
    authenticated?: IAuthenticationState,
    extras: {
        loading: boolean,
    }
}

export interface IAuthenticationState {
    jwt: string,
    user?:{
        username: string,
        email: string
    }
}