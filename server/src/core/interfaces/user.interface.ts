export interface IUserResponse {
    user: IUser;
    access_token: string;
    refresh_token: string;
}

export interface IUser {
    id: number;
    email: string;
    password: string;
    role: string;
    status: string;
    is_activated: boolean;
    activation_link: string;
}

export interface IToken {
    access_token: string;
    refresh_token: string;
}

export interface ITokenResponse extends IToken {
    userId: number;
}