export interface User {
    $id: string;
    name: string;
    registration: number;
    status: boolean;
    passwordUpdate: number;
    email: string;
    emailVerification: boolean;
}