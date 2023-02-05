interface User {
    id: string;
    username: string;
    password?: string;
    roles: string[];
    sessionId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface UserGetByIdOptions {
    id: string;
}

interface UserGetByUsernameOptions {
    username: string;
}

interface UserUpdateOptions {
    id: string;
    username: string;
    password: string;
}

interface UserAddOptions {
    username: string;
    password: string;
    roles: string[];
}

interface UserLoginOptions {
    username: string;
    password: string;
}

interface ChangePasswordOptions {
    username: string;
    password: string;
    newPassword: string;
}

interface UserDeleteOptions {
    id: string;
}

interface UserModel {
    id: string;
    username: string;
    password: string;
    roles: string;
    session_id: string;
    created_at: string;
    updated_at: string;
}
