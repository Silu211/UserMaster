export interface ILoginModel {
    userEmail: string;
    password: string;
}

export interface ILoggedInUserModel {
    userId: number;
    userEmail: string;
    userName: string;
    profilePicture: string;
    accessToken: string;
}
