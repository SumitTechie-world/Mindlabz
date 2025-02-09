export interface LoginResponse {
    code: string;
    data?: LoginUserResponse;
    message: string;
    statusCode: number;
    success: boolean;
    type:string;
}

export interface LoginUserResponse {
    type: any;
    email?: string;
    id?: string;
    token?: string;
    roles: any[],
    user: string
}
