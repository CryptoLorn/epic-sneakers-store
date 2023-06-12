export interface IToken {
    access_token: string;
    refresh_token: string;
}

export interface ITokenResponse extends IToken {
    userId: number;
}