export interface Auth {
    "user": IAuthUser
    "jwt": string;
    "authorized": boolean
}

export interface IAuthUser {
    "id": number;
    "username": string;
    "email": string;
    "birthdate": string;
    "location": string;
    "avatar": string
}